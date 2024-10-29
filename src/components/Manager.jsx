import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast.success('Copied to Clipboard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray,{ ...form, id:uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray,{ ...form, id:uuidv4()}]))
        setForm({site: "", username: "", password: ""})
    }

    const deletePassword =(id)=>{
        let c = confirm("Do you really want to Delete this Password?")
        if (c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
        
       
    }

    const editPassword =(id)=>{
        setForm(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div class="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-3 pt-3 md:mycontainer ">

                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>  &lt;</span>

                    Pass
                    <span className='text-green-500'>OP/&gt;</span>

                </h1>
                <p className='text-green-700 text-lg text-center'>Your Own Password Manager</p>
                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full bg-gray-50 border border-green-500 py-1 p-4 w-full' type='text ' name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username ' className='rounded-full bg-gray-50 border border-green-500 py-1 p-4 w-full' type='text ' name='username' id='username' />
                        <div className="relative ">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full bg-gray-50 w-full border border-green-500 py-1 p-4 ' type='password' name='password' id='password' />
                            <span className='absolute right-0 cursor-pointer ' onClick={showPassword} >
                                <img ref={ref} className='p-2' width={36} src='icons/eye.png' alt='eye' />

                            </span>
                        </div>
                    </div>

                    <button disabled={form.password.length===0} onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 border border-green-900 py-2 w-fit hover:bg-green-300 ' >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'> Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md mb-20">
                            <thead className='bg-green-800 text-white '>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>username</th>
                                    <th className='py-2'>password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>
                                        <td className=' py-2 border-2 border-white text-center'>
                                            <div className='flex justify-center items-center'>
                                                <a target='_black' href={item.site}>{item.site}</a>

                                                <div className='lordiconCopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "23px", "height": "23px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='  py-2 border-2 border-white text-center '>
                                            <div className='flex justify-center items-center'>
                                                {item.username}
                                                <div className='lordiconCopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "23px", "height": "23px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border-2 border-white text-center '>
                                            <div className='flex justify-center items-center'>
                                                {"*".repeat(item.password.length)}
                                                <div className='lordiconCopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "23px", "height": "23px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border-2 border-white text-center '>
                                            <span className='cursor-pointer mx=2 ' onClick={()=>{editPassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/qnpnzlkk.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon></span>
                                            <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}}><lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon></span>
                                        </td>
                                    </tr>

                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
