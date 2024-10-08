import { Link } from 'react-router-dom'
import React from 'react'
import { FilePlus, FileSearch2 } from 'lucide-react';
import { useSelector } from 'react-redux';

function HeroSection() {
    const { user } = useSelector(store => store.auth)
    return (
        <>
            <div className=''>
                <div className=' bg-gradient-to-br from-blue-50 via-sky-50 to-slate-100 h-screen pt-40'>
                    <span className='flex justify-center bg-gradient-to-r from-yellow-100 to-white ring-2 ring-yellow-200 px-4 py-2 rounded-[50px] h-[40px] w-fit mx-auto hover:-translate-y-3'>Eaily Mark Update V1.0.0</span>
                    <div className='flex justify-center mt-12'>
                        <div className=' w-1/2 h-[400px] ml-20'>
                            <h1 className='mt-5 text-center font-serif font-bold text-5xl'>Make in Min</h1>
                            <p className='mt-2 text-center font-serif font-semibold text-2xl'>Here you can add all your result with Excel</p>
                            {
                                user?.role === "Teacher" ? (<Link to='/addResult'><div className='w-[200px] cursor-pointer px-2 py-4 border-2  text-center mx-auto mt-20 rounded-2xl bg-orange-500 flex'><FilePlus size={28} /><span className='ml-3 font-semibold'>Add Result</span></div></Link>) : (<Link to='/result'><div className='w-[200px] cursor-pointer px-2 py-4 border-2  text-center mx-auto mt-20 rounded-2xl bg-orange-500 flex'><FileSearch2 size={28} /><span className='ml-3 font-semibold'>Result</span></div></Link>)
                            }
                        </div>
                        <div className='w-[800px] h-[400px] '><img className='w-[500px] h-[400px] object-fill rounded-3xl shadow-2xl ' src="https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg?auto=compress&cs=tinysrgb&w=600" alt="imgsae" /></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HeroSection