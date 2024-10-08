import React, { useState } from 'react'
import { MARK_API_END_POINT } from '../../url.js'
import { FilePlus } from 'lucide-react'

function UpdateResult() {
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
        {
            name: 'Attendance Mark',
            path: 'attendanceMarks'
        },
        {
            name: 'Project Review Marks',
            path: 'projectReviewMarks'
        },
        {
            name: 'Assessment Marks',
            path: 'assessmentMarks'
        },
        {
            name: 'Project Submission Mark',
            path: 'projectSubmissionMarks'
        },
        {
            name: 'LinkedIn Post Mark',
            path: 'LinkedInPostMarks'
        },

    ]
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        studentId: "", studentName: "", studentEmail: "", attendanceMarks: "", projectReviewMarks: "", assessmentMarks: "", projectSubmissionMarks: "", LinkedInPostMarks: "",
    })
    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitMark = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${MARK_API_END_POINT}/singleUpdateMarks`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            toast.success("Successfully marks added")
        } catch (error) {
            console.log(error);
            toast.error("Error while adding adding marks!")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className='h-screen flex justify-center pt-20'>
                <div className='border-2 w-[700px] h-full'>
                    <div className=' mx-auto w-[400px] mt-3'>
                        <h1 className='text-4xl font-semibold flex justify-center m-3 p-2'><span className='mt-2 mr-2'><FilePlus size={32} /></span>Update Marks</h1>
                        <p>Provide field which you want to update. Student Id, Name and Email are required for update</p>
                        <form onSubmit={submitMark}>
                            {
                                formFiels.map((c, i) => (
                                    <div key={i} className="relative z-0 w-full mb-3 group">
                                        <input type="text" name={c.path}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" " onChange={inputHandle} />
                                        <label htmlFor={c.path}
                                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            {c.name}
                                        </label>
                                    </div>
                                ))
                            }
                            {loading ? (<button className='border-2 border-black w-full p-1 rounded-md text-2xl cursor-wait'>wait a sec</button>) : (<button type='submit' className='border-2 border-black w-full p-1 rounded-md text-2xl'>Update Marks</button>)}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateResult