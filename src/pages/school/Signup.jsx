import { User } from 'lucide-react'
import React, { useState } from 'react'
import ModalBox from '../../components/ModalBox.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setAdmin } from '../../store/adminSlice.js'
import { ADMIN_API_END_POINT } from '../../url.js'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [sign, setSign] = useState(false)
    const [input, setInput] = useState({
        schoolName: "",
        schoolEmail: '',
        schoolPhone: '',
        logo: '',
        schoolAdd: '',
    })

    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const inputHandleFile = (e) => {
        setInput({ ...input, logo: e.target.files?.[0] })
    }
    const submitLogin = async (e) => {
        e.preventDefault()
        try {
            const schoolEmail = { schoolEmail: input.schoolEmail }
            setLoading(true)
            const res = await axios.post(`${ADMIN_API_END_POINT}/school/login`, schoolEmail, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            dispatch(setAdmin(res.data.school))
            setSign(false)
            navigate('/')
            toast.success("School Account Login Successfully")
        } catch (error) {
            console.log(error);
            toast.error("Error while Login school account!")
        } finally {
            setLoading(false)
        }
    }
    const submitSignup = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("schoolName", input.schoolName);
        formData.append("schoolEmail", input.schoolEmail);
        formData.append("schoolPhone", input.schoolPhone);
        formData.append("schoolAdd", input.schoolAdd);
        if (input.logo) {
            formData.append("logo", input.logo);
        }
        try {
            setLoading(true)
            const res = await axios.post(`${ADMIN_API_END_POINT}/school`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            })
            toast.success("School Account created Successfully")

        } catch (error) {
            console.log(error);
            toast.error("Error while creating school account!")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='bg-gradient-to-r from-slate-50 via-slate-100 to-orange-50 w-full h-full pt-20'>
                <div className='w-[800px] h-[600px] border-2 border-blue-600 rounded-3xl  mx-auto'>
                    <div className=' mx-auto w-[400px] mt-8'>
                        <h1 className='text-4xl font-semibold flex justify-center m-5 p-2'><span className='mt-2 mr-2'><User size={32} /></span>School Signup</h1>
                        <form onSubmit={submitSignup}>
                            <div className="relative z-0 w-full mb-4 group">
                                <input type="text" name='schoolName'
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required onChange={inputHandle} />
                                <label htmlFor="schoolName"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    School Name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-4 group">
                                <input type="text" name='schoolEmail'
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required onChange={inputHandle} />
                                <label htmlFor="schoolEmail"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    School Email
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-4 group">
                                <input type="text" name='schoolPhone'
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required onChange={inputHandle} />
                                <label htmlFor="schoolPhone"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    School Phone
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-4 group">
                                <input type="text" name='schoolAdd'
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required onChange={inputHandle} />
                                <label htmlFor="schoolAdd"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    School Address
                                </label>
                            </div>
                            <div className='w-full border-2 p-2 mt-3 mb-2'>
                                <label htmlFor="logo"><span className='mr-3'>Logo</span>
                                    <input className='' type="file" name='logo' onChange={inputHandleFile} />
                                </label>
                            </div>
                            {
                                loading ? (<button className='border w-full p-1 rounded-md text-2xl cursor-wait'>wait a sec</button>) : (<button type='submit' className='border w-full p-1 rounded-md text-2xl'>Signup</button>)
                            }
                            <div className='mt-3'>Not have account? <span onClick={() => setSign(true)} className='text-blue-600 cursor-pointer'>Login</span></div>
                        </form>
                    </div>
                </div>
            </div>
            {
                sign && <ModalBox onClose={() => setSign(false)}>
                    <div className=' mx-auto w-[400px] mt-8'>
                        <h1 className='text-4xl font-semibold flex justify-center m-5 p-2'><span className='mt-2 mr-2'><User size={32} /></span>School Login</h1>
                        <form onSubmit={submitLogin}>
                            <div className="relative z-0 w-full mb-4 group">
                                <input type="text" name='schoolEmail'
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" " required onChange={inputHandle} />
                                <label htmlFor="schoolEmail"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    School Email
                                </label>
                            </div>
                            {
                                loading ? (<button className='border w-full p-1 rounded-md text-2xl cursor-wait'>wait a sec</button>) : (<button type='submit' className='border w-full p-1 rounded-md text-2xl'>Login</button>)
                            }
                        </form>
                    </div>
                </ModalBox>
            }
        </>
    )
}

export default Signup