import { FileText, House, Key, SearchX } from 'lucide-react'
import React, { useState } from 'react'
import ModalBox from './ModalBox.jsx';

function Navbar() {
    const user = false;
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

    return (
        <>
            <div className='flex justify-center pt-5'>
                <div className='fixed flex justify-between w-[1000px] h-16 shadow-md rounded-3xl bg-transparent'>
                    <div className='flex ml-4 mt-5'><FileText className='mr-1' />Result</div>
                    <div>
                        <ul className='flex justify-evenly mt-1'><li className='flex m-2 px-4 py-2 rounded-lg'><House size={28} /><span className='ml-1'>Home</span></li>
                            <li className='flex m-2 px-4 py-2 rounded-lg'><SearchX size={28} /><span className='ml-1'>
                                About</span></li></ul>
                    </div>
                    {user ? (<div><ul className='flex justify-evenly mt-1 mr-3'><li className='border bg-orange-500 m-2 px-4 py-2 rounded-lg'>Profile</li>
                        <li className='border bg-orange-500 m-2 px-4 py-2 rounded-lg'>Admin</li></ul></div >) :
                        (<div><ul className='flex justify-evenly mt-1'><li onClick={() => showModal("login")} className='border bg-orange-500 m-2 px-4 py-2 rounded-lg flex'><Key /><span className='ml-1'>Login</span></li>
                            <li className='border bg-orange-500 m-2 px-4 py-2 rounded-lg'>Signup</li></ul></div >)}
                </div>
            </div>
            {
                login && <ModalBox onClose={setLogin(false)}>

                </ModalBox>
            }
        </>
    )
}

export default Navbar