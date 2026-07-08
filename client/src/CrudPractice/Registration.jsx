import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Registration() {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phno,setPhno] = useState();
    const [password,setPassword] = useState();
    const [cpassword,setConfirmpassword] = useState();
    const [err,setErr]=useState({});
    const navigate = useNavigate();
    const validate=()=>{
        const e={}
        if(!name) e.name='Please Enter Name';
        if(!email) e.email='Please Enter Email';
        if(!phno) e.phone='Please Enter Phone Number';
        if(!password) e.password='Please Enter Password';
        else if(password.length<=6) e.password='Password Lenght Must be > 6';
        if(!cpassword) e.cpassword='Please Enter Confirm Password';
        if(password!==cpassword) e.cpassword='The Two Password Do not Match!';
        return e;
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const err = validate();
        setErr(err);

         if (Object.keys(e).length === 0) {
            try{
                await axios.post('http://localhost:8000/api/auth/cregister',{
                    name,phno,email,password
                }).then(res=>{alert(res)})
                .catch(e=>{alert("Faild To Register")})
            }
            catch(e){
                console.log("Error in Registration :",e);
                alert("Faild To Register");
            }
            navigate("/crud");
        }

    }
    return (
    

    <div className='min-h-screen flex justify-center items-center bg-white'>
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
                <h1 className='text-center text-2xl font-bold p-2'>Create Account</h1>
                <p className='text-sm text-gray-500 mb-6'>Already Have Account? <Link to='/crud/' className=' text-[#ffa411]'>Login</Link></p>
                <form method='post' onSubmit={handleSubmit}>
                    <div className='block mb-3'>
                        <span className="text-sm text-gray-700">Name</span>
                        <input type="text" 
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-gray-400 ${err.name ? 'border-red-400' : 'border-gray-200'
                                }`} 
                        placeholder='Enter Fullname' 
                        onChange={(e)=>setName(e.target.value)}/>
                        {err.name && <p className="text-xs text-red-500 mt-1">{err.name}</p>}

                    </div>
                    <div className='block mb-3'>
                        <span className="text-sm text-gray-700">Phno</span>
                        <input type="tel" maxLength={10} minLength={10}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-gray-400 ${err.phone ? 'border-red-400' : 'border-gray-200'
                                }`} 
                        placeholder='Enter Phno'
                        onChange={(e)=>setPhno(e.target.value)} />
                        {err.phone && <p className="text-xs text-red-500 mt-1">{err.phone}</p>}

                    </div>
                    <div className='block mb-3'>
                        <span className="text-sm text-gray-700">Email</span>
                        <input type="text" 
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-gray-400 ${err.email ? 'border-red-400' : 'border-gray-200'
                                }`}
                        placeholder='Enter Email' 
                        onChange={(e)=>setEmail(e.target.value)}/>
                        {err.email && <p className="text-xs text-red-500 mt-1">{err.email}</p>}

                    </div>
                    <div className='block mb-3'>
                        <span className="text-sm text-gray-700">Create Password</span>
                        <input type="password" className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-gray-400 ${err.password ? 'border-red-400' : 'border-gray-200'
                                }`} 
                        placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} />
                        {err.password && <p className="text-xs text-red-500 mt-1">{err.password}</p>}

                    </div>
                    <div className='block mb-3'>
                        <span className="text-sm text-gray-700">Confirm Password</span>
                        <input type="password" 
                        className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-gray-400 ${err.cpassword ? 'border-red-400' : 'border-gray-200'
                                }`}  
                        placeholder='Enter Password' onChange={(e)=>setConfirmpassword(e.target.value)} />
                        {err.cpassword && <p className="text-xs text-red-500 mt-1">{err.cpassword}</p>}

                    </div>
                    
                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#02032b] text-white font-semibold hover:opacity-95 cursor-pointer"
                    >
                       Create Account
                    </button>
                </form>
            </div>
        </div>
  )
}
