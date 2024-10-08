import { FileText, House, Key, SearchX, LogIn, User, UserCheck, LogOut, CircleUser, School, Trash2, FilePlus, FileSearch2, Eye } from 'lucide-react'
import React, { useState } from 'react'
import ModalBox from './ModalBox.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../url.js';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../store/authSlice.js';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAdmin } from '../store/adminSlice.js';


function Navbar() {
    const dispatch = useDispatch()

    const { user, loading } = useSelector(store => store.auth);
    const { admin } = useSelector(store => store.admin);
    const [log, setLog] = useState(false);
    const [login, setLogin] = useState(false)
    const showModal = (type) => {
        setLogin(prev => !prev)
        if (type === 'login') {
            setLog(true)
        } else {
            setLog(false)
        }
    }
    const [profile, setProfile] = useState(false)
    const [adminModal, setAdminModal] = useState(false)

    const [input, setInput] = useState({
        userName: "",
        email: "",
        password: "",
        avatar: "",
        role: ""
    })

    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const inputHandleFile = (e) => {
        setInput({ ...input, avatar: e.target.files?.[0] })
    }

    const submitLogin = async (e) => {
        e.preventDefault()
        const inputLog = {}
        inputLog.userNmae = input.userName
        inputLog.email = input.email
        inputLog.password = input.password
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, inputLog, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            dispatch(setUser(res.data.user))
            setLogin(false)
            toast.success(`🦄 Login Success `, res.data.message);
        } catch (error) {
            setLogin(true)
            toast.error('🦄 Try again Please!');
        } finally {
            dispatch(setLoading(false))
        }
    }

    const submitSignup = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("userName", input.userName);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.avatar) {
            formData.append("avatar", input.avatar);
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            })
            toast.success(`🦄 Account created`);
            setLogin(true)
            setLog(true)
        } catch (error) {
            setLogin(true)
            toast.error(`🦄 Please try again`);
        } finally {
            dispatch(setLoading(false))
        }
    }

    const submitLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(setUser(''))
            setProfile(false)
            dispatch(setAdmin(''))
            toast.success('Logout Success Fully')
        } catch (error) {
            setProfile(true)
            toast.error('Logout Failed!')
        }
    }

    const deleteUser = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/delete`)
            setProfile(false)
            toast.success("Account Deleted 😔")
        } catch (error) {
            setProfile(true)
            toast.error("Error while account deleting 😔")
        }
    }

    return (
        <>
            <div className='flex justify-center pt-5'>
                <div className='fixed flex justify-between w-[1000px] h-16 shadow-md rounded-3xl bg-orange-100'>
                    <div className='flex ml-4 mt-5 font-semibold'><FileText /><span className='ml-2'>Result</span></div>
                    <div>
                        <ul className='flex justify-evenly mt-1'>
                            <Link to='/'><li className='flex m-2 px-4 py-2 rounded-lg font-semibold hover:underline underline-offset-8'><House size={24} /><span className='ml-1'>Home</span></li></Link>
                            <Link to='/about'><li className='flex m-2 px-4 py-2 rounded-lg font-semibold hover:underline underline-offset-8'><SearchX size={24} /><span className='ml-1'> About</span></li></Link>
                        </ul>
                    </div>
                    {user ? (<div><ul className='flex justify-evenly mt-1 mr-3'>{user?.role === "Teacher" && <div>
                        {admin ? (<li onClick={() => setAdminModal(true)} className='flex border bg-[#fa8231] m-2 px-4 py-2 rounded-lg cursor-pointer'><CircleUser /><span className='ml-1'>Admin</span></li>) : (<Link to='/schoolSignup'><li className='flex border bg-[#fa8231] m-2 px-4 py-2 rounded-lg cursor-pointer'><School /><span className='ml-1'>School Signup/Login</span></li></Link>)}
                    </div>}
                        <li className='borderm-2 px-1 py-2 cursor-pointer'>
                            <div onClick={() => setProfile(true)}>
                                <img className='w-10 h-10 rounded-full ring-4 ring-orange-500' src={user?.avatar} alt="profile" />
                            </div>
                        </li>
                    </ul></div >)
                        :
                        (<div><ul className='flex justify-evenly mt-1'><li onClick={() => showModal("login")} className='border bg-[#fa8231] m-2 px-4 py-2 rounded-lg flex cursor-pointer'><Key /><span className='ml-1'>Login</span></li><li onClick={() => showModal("signup")} className='border bg-[#fa8231] flex m-2 px-4 py-2 rounded-lg cursor-pointer'><UserCheck /><span className='ml-1'>Signup</span></li></ul></div >)
                    }
                </div>
            </div>
            {
                login && <ModalBox width='600' height='500' onClose={() => setLogin(false)}>
                    {
                        log ? (<div className='w-[400px] mx-auto  mt-7'>
                            <h1 className='text-4xl font-semibold flex justify-center m-5 p-2'><span className='mt-2 mr-2'><LogIn size={32} /></span>Login</h1>
                            <form onSubmit={submitLogin}>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name='userName'
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required onChange={inputHandle} />
                                    <label htmlFor="userName"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Name
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" name='email'
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required onChange={inputHandle} />
                                    <label htmlFor="email"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Email
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="password" name='password'
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required onChange={inputHandle} />
                                    <label htmlFor="email"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Password
                                    </label>
                                </div>
                                {
                                    loading ? (<button className='border w-full p-2 rounded-md text-2xl cursor-wait'>Wait a sec...</button>) : (<button type='submit' className='border w-full p-2 rounded-md text-2xl'>Login</button>)
                                }
                                <div className='mt-3'>Not have account? <span onClick={() => setLog(false)} className='text-blue-600 cursor-pointer'>Signup</span></div>
                            </form>
                        </div>) : (<div className=' mx-auto w-[400px] mt-8'>
                            <h1 className='text-4xl font-semibold flex justify-center m-5 p-2'><span className='mt-2 mr-2'><User size={32} /></span>Sign up</h1>
                            <form onSubmit={submitSignup}>
                                <div className="relative z-0 w-full mb-4 group">
                                    <input type="text" name='userName'
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required onChange={inputHandle} />
                                    <label htmlFor="userName"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Name
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-4 group">
                                    <input type="text" name='email'
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required onChange={inputHandle} />
                                    <label htmlFor="email"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Email
                                    </label>
                                </div>
                                <div className="relative z-0 w-full mb-4 group">
                                    <input type="password" name='password'
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required onChange={inputHandle} />
                                    <label htmlFor="email"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Password
                                    </label>
                                </div>
                                <div className='w-full border-2 p-2'>
                                    <label className='ml-5' htmlFor="role">Role:-
                                        <input className='ml-2' type="radio" name="role" value='Student' onChange={inputHandle} /> <span className='mr-3'>Student</span>
                                        <input className='ml-2' type="radio" name="role" value='Teacher' onChange={inputHandle} />Teacher</label>
                                </div>

                                <div className='w-full border-2 p-2 mt-3 mb-2'>
                                    <label htmlFor="avatar"><span className='mr-3'>Avatar</span>
                                        <input className='' type="file" name='avatar' onChange={inputHandleFile} />
                                    </label>
                                </div>
                                {loading ? (<button className='border w-full p-1 rounded-md text-2xl cursor-wait'>Wait a sec ...</button>) : (<button type='submit' className='border w-full p-1 rounded-md text-2xl'>Signup</button>)}
                                <div className='mt-3'>Not have account? <span onClick={() => setLog(true)} className='text-blue-600 cursor-pointer'>Login</span></div>
                            </form>
                        </div>)
                    }
                </ModalBox>
            }
            {
                profile && <ModalBox className=' w-[500px] h-[400px]' onClose={() => setProfile(false)}>
                    <div className='m-8 flex'><img className='w-32 h-32 rounded-full ring-4 ring-orange-500' src={user.avatar} alt="profile" />
                        <div className='ml-5 mt-7 flex flex-col'><span className='text-5xl'>{user.userName}</span> <span className='mt-2 text-2xl'>User Account</span></div>
                    </div>
                    <div className=' mt-4'>
                        <Link to='/result'><div onClick={() => setProfile(false)} className='border rounded-lg px-4 py-2 m-2 hover:bg-gradient-to-t from-orange-50 to-orange-300 flex'><FileSearch2 size={28} /><span className='ml-3'>Result</span></div></Link>
                        <div onClick={submitLogout} className='border flex rounded-lg px-4 py-2 m-2 hover:bg-gradient-to-t from-gray-50 to-gray-300'><LogOut size={28} /><span className='ml-3'>Logout</span></div>
                        <div onClick={deleteUser} className='border flex rounded-lg px-4 py-2 m-2 hover:bg-gradient-to-t from-red-50 to-red-300'><Trash2 size={28} /><span className='ml-3'>Delete Account</span></div>
                    </div>
                </ModalBox>
            }

            {
                adminModal && <ModalBox className='w-[500px] h-[500px]' onClose={() => setAdminModal(false)}>
                    <div className='m-8 flex'><img className='w-32 h-32 rounded-full ring-4 ring-orange-500' src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" alt="profile" />
                        <div className='ml-5 mt-7 flex flex-col'><span className='text-5xl'>{admin?.schoolName}</span> <span className='mt-2 text-2xl'>Admin Account</span></div>
                    </div>
                    <div className=' mt-4'>
                        <Link to='/addResult'><div onClick={() => setAdminModal(false)} className='border rounded-lg px-4 py-2 m-2 hover:bg-gradient-to-t from-orange-50 to-orange-300 flex'><FilePlus size={28} /><span className='ml-3'>Add Result</span></div></Link>
                        <Link to={`/listResult/${admin?._id}`}><div onClick={() => setAdminModal(false)} className='flex border rounded-lg px-4 py-2 m-2 hover:bg-gradient-to-t from-orange-50 to-orange-300'><Eye size={28} /><span className='ml-3'>See Results</span></div></Link>
                        <Link to={`/updateResult/${admin?._id}`}><div onClick={() => setAdminModal(false)} className='border flex rounded-lg px-4 py-2 m-2 hover:bg-gradient-to-t from-gray-50 to-gray-300'><LogOut size={28} /><span className='ml-3'>Update Marks</span></div></Link>
                        <Link to={`/listResult/${admin?._id}`}><div onClick={() => setAdminModal(false)} className='flex border rounded-lg px-4 py-2 m-2 hover:bg-gradient-to-t from-red-50 to-red-300'><Trash2 size={28} /><span className='ml-3'>Delete Marks</span></div></Link>
                    </div>
                </ModalBox>
            }
        </>
    )
}
export default Navbar