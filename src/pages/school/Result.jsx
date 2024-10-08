import { FilePlus } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import ModalBox from '../../components/ModalBox'
import axios from 'axios'
import { MARK_API_END_POINT } from '../../url'
import { useDispatch, useSelector } from 'react-redux'
import { setMarks } from '../../store/marksSlice'
import { toast } from 'react-toastify'

function Result() {
    const { marks } = useSelector(store => store.marks)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const formFiels = [
        {
            name: "Stduent Id",
            path: 'studentId'
        },
        {
            name: "Stduent Name",
            path: 'studentName'
        },
        {
            name: "Stduent Email",
            path: 'studentEmail'
        },

    ]
    const [result, setResult] = useState(false)
    // const marks = useCallback(() => { })
    const [input, setInput] = useState({
        studentId: "", studentName: "", studentEmail: ""
    })
    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitMark = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${MARK_API_END_POINT}/getMarks`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            dispatch(setMarks(res.data.verifiyStudent))
            setResult(true)
            toast.success("Marks")
        } catch (error) {
            console.log(error);
            toast.error("Error while fetch Marks!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='h-screen flex justify-center pt-20'>
                <div className='border-2 w-[700px] h-[600px]'>
                    <div className=' mx-auto w-[400px] mt-3'>
                        <h1 className='text-4xl font-semibold flex justify-center m-3 p-2'><span className='mt-2 mr-2'><FilePlus size={32} /></span>Marks</h1>
                        <form onSubmit={submitMark}>
                            {
                                formFiels.map((c, i) => (
                                    <div key={i} className="relative z-0 w-full mb-3 group">
                                        <input type="text" name={c.path}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" " required onChange={inputHandle} />
                                        <label htmlFor={c.path}
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            {c.name}
                                        </label>
                                    </div>
                                ))
                            }
                            {
                                loading ? (<button className='border-2 border-black w-full p-1 rounded-md text-2xl cursor-wait'>wait a sec</button>) : (<button type='submit' className='border-2 border-black w-full p-1 rounded-md text-2xl'>See Marks</button>)
                            }
                        </form>
                    </div>
                </div>
                {
                    result && <ModalBox onClose={() => setResult(false)}>
                        <div className='w-[300px] mx-auto'>
                            <h1 className='text-center text-4xl mt-3 font-semibold'>Here Your Result {marks.studentName} </h1>
                            <div className='w-[300px]'>
                                <p className='border-2 py-2 px-4'>Student Id:- {marks.studentId}</p>
                                <p className='border-2 py-2 px-4'>Student Name:- {marks.studentName}</p>
                                <p className='border-2 py-2 px-4'>Student Email:- {marks.studentEmail}</p>
                                <p className='border-2 py-2 px-4'>Attendance Marks:- {marks.attendanceMarks}</p>
                                <p className='border-2 py-2 px-4'> Project Review Marks:- {marks.projectReviewMarks}</p>
                                <p className='border-2 py-2 px-4'>Assessment Marks:- {marks.assessmentMarks}</p>
                                <p className='border-2 py-2 px-4'>Project Submission Marks:- {marks.projectSubmissionMarks}</p>
                                <p className='border-2 py-2 px-4'>LinkedIn Post Marks:- {marks.LinkedInPostMarks}</p>
                            </div>
                        </div>
                    </ModalBox>
                }
            </div>
        </>
    )
}

export default Result