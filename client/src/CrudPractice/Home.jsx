import axios from 'axios';
import React, { useState } from 'react'

export default function Home() {
    const [fname, setFname] = useState();
    const [email, setEmail] = useState();
    const [city, setCity] = useState();
    const [phone, setPhone] = useState();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            axios.post("http://localhost:8000/api/adduser",{
                fname,email,city,phone
            }).then(res=>{
                alert("MMMM",res);
            }).catch(err=>{
                console.log("Error:",err);
                alert("Something Wents Wrong");

            })
        }
        catch(err){
            alert("Something Wents Wrong catch");

            console.log("Error in Creating",err);
        }
    }
    return (
        <div className='min-h-screen flex justify-center items-center bg-white'>
            <div className='w-full max-w-md shadow-xl p-3'>
                <h1>Create User</h1>
                <form method='POST' onSubmit={handleSubmit}>
                    <div className='block mb-3'>
                        <span>Name</span>
                        <input type="text" className='bolck w-full border rounded border-gray-200 p-1 mt-1' id="name"
                            onChange={(e) => setFname(e.target.value)} />
                    </div>
                    <div className='block mb-3'>
                        <span>Email</span>
                        <input type="email" className='bolck w-full border rounded border-gray-200 p-1 mt-1' id="name"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='block mb-3'>
                        <span>phone</span>
                        <input type="tel" className='bolck w-full border rounded border-gray-200 p-1 mt-1' id="name"
                            onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='block mb-3'>
                        <span>City</span>
                        <input type="text" className='bolck w-full border rounded border-gray-200 p-1 mt-1' id="name"
                            onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className='block mb-3'>
                        <button type='submit' className='border border-amber-500 bg-amber-500 p-2 rounded'>Submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
