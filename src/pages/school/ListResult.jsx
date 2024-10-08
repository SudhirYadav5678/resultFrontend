import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { MARK_API_END_POINT } from '../../url.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import { setResult } from '../../store/resultSlice.js';


function ListResult() {
    const dispatch = useDispatch()
    const { result } = useSelector(store => store.result)
    const { admin } = useSelector(store => store.admin)
    const [allresults, setAllResults] = useState(true)
    const { id } = useParams()
    const allResult = async () => {
        try {
            const res = await axios.post(`${MARK_API_END_POINT}/getAllMarks`, { schoolId: id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            dispatch(setResult(res.data.resultAll))
            toast.success("Here your result");
        } catch (error) {
            console.log(error);
            toast.error("Error while result featch!");
        }
    }

    const deleteResult = async (resultId, i) => {
        console.log(resultId, i);
        try {
            const res = await axios.post(`${MARK_API_END_POINT}/deleteMarks`, { resultId: resultId }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            toast.success("User deleted successfully Refresh Now")
        } catch (error) {
            console.log(error);
            toast.error("Error while result deleting!");
        }

    }
    return (
        <>
            <div className='w-[900px] h-[600px] border-2 mx-auto mt-20 overflow-scroll rounded-3xl shadow-xl'>
                <div className='flex justify-center mt-5'>
                    <img className='w-36 h-36 rounded-full ring-4 ring-orange-400' src={admin.logo} alt="logo" />
                    <div className='flex flex-col ml-5 mt-5'><h1>{admin.schoolName}</h1>
                        <h1>{admin.schoolEmail}</h1>
                        <h1>{admin.schoolPhone}</h1>
                        <h1>{admin.schoolAdd}</h1>
                    </div>
                </div>
                <hr className='border border-orange-400 mt-5' />
                <div className='mt-5'>
                    {allresults ? (<div onClick={() => {
                        allResult()
                        setAllResults(false)
                    }} className='border-2 py-3 px-5 flex justify-center cursor-pointer'>See All Results</div>) : (<div>
                        < div className='border-2 py-3 px-5 flex justify-center ' ><span className='border-2 py-2 px-3 cursor-pointer' onClick={() => setAllResults(true)}>Hide All Results</span></div>
                        <div className='w-full py-3 px-5 border-2 border-black flex justify-between'><span className='border-2 bg-orange-400 py-1 px-2 rounded-md cursor-pointer'>Student Id</span><span className='border-2 bg-orange-400 py-1 px-2 rounded-md cursor-pointer' >Name</span><span className='border-2 bg-red-400 py-1 px-2 rounded-md cursor-pointer'>Email</span><Link to={`/updateResult/${admin._id}`}><span className='border-2 bg-red-400 py-1 px-2 rounded-md cursor-pointer'>Update</span></Link></div>
                        {
                            result.map((c, i) => (
                                <div key={i} className='w-full py-3 px-5 border-2 border-black flex justify-around'><span className='border-2 bg-red-400 py-1 px-2 rounded-md cursor-pointer'>{c.studentId}</span><span className='border-2 bg-orange-400 py-1 px-2 rounded-md cursor-pointer'>{c.studentName}</span><span className='border-2 bg-orange-400 py-1 px-2 rounded-md cursor-pointer' >{c.studentEmail}</span>
                                    <span onClick={() => deleteResult(c._id, i)} className='border-2 bg-orange-400 py-1 px-1 rounded-md cursor-pointer'>Delete</span>
                                </div>
                            ))
                        }
                    </div>)}
                </div>
            </div >
        </>
    )
}

export default ListResult