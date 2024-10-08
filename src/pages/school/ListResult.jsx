import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { MARK_API_END_POINT } from '../../url.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { setResult } from '../../store/resultSlice.js';

function ListResult() {
    const dispatch = useDispatch()

    const { allReslute } = useSelector(store => store.result)
    console.log(allReslute);
    const { admin } = useSelector(store => store.admin)
    const [results, setResults] = useState(true)
    const { id } = useParams()

    const allResult = async () => {
        try {
            const res = await axios.post(`${MARK_API_END_POINT}/getAllMarks`, { schoolId: id }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            console.log(res.data);
            dispatch(setResult(res.data.resultAll))
            toast.success("Here your result");
        } catch (error) {
            console.log(error);
            toast.error("Error while result featch!");
        } finally {
            setLoading(false)
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
                    {results ? (<div onClick={() => {
                        allResult()
                        setResults(false)
                    }} className='border-2 py-3 px-5 flex justify-center cursor-pointer'>See All Results</div>) : (<div>
                        < div onClick={() => setResults(true)} className='border-2 py-3 px-5 flex justify-center cursor-pointer' > Hide All Results</div >
                        <div className='w-full py-3 px-5 border-2 border-black flex justify-between'><span className='border-2 bg-orange-400 py-1 px-2 rounded-md cursor-pointer'>SNo.</span><span className='border-2 bg-orange-400 py-1 px-2 rounded-md cursor-pointer'>Name</span><span className='border-2 bg-orange-400 py-1 px-2 rounded-md cursor-pointer' >Update</span><span className='border-2 bg-red-400 py-1 px-2 rounded-md cursor-pointer'>Delete</span></div>
                    </div>)}
                </div>
            </div >

        </>
    )
}

export default ListResult