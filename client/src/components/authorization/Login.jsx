import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API/api';
export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [errors, setErrors] = useState({});

    function validate() {
        const e = {};
        if (!form.email) e.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 6) e.password = 'Password must be >= 6 characters';
        return e;
    }

    const handleSubmit = async (ev)=> {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length === 0) {
            const {email,password,remember}=form
            try {
                const res = await API.post("/auth/login", {
                    email,
                    password,
                },{withCredentials:true});
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert(res.data.msg);
                navigate('/');
            } catch (err) {
                console.log("Error In Login: ", err);
                alert(err.response?.data?.msg || "Login failed!");
            }
            
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-[#0B2545] mb-2">Sign in to your account</h2>
                <p className="text-sm text-gray-500 mb-6">
                    New here? <Link to="/signup" className="text-[#FF6A00] font-medium">Create an account</Link>
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <label className="block mb-3">
                        <span className="text-sm text-gray-700">Email</span>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.email ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </label>

                    <label className="block mb-3">
                        <span className="text-sm text-gray-700">Password</span>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${errors.password ? 'border-red-400' : 'border-gray-200'
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </label>

                    <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={form.remember}
                                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            Remember me
                        </label>
                        <button
                            type="button"
                            onClick={() => alert('Forgot password flow — implement password reset')}
                            className="text-sm text-[#0B2545] hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#FF6A00] text-white font-semibold hover:opacity-95"
                    >
                        Sign in
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Or continue with
                </div>

                <div className="mt-4 flex gap-3">
                    <button className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:bg-[#FF6A00]  hover:text-white">Continue with Google</button>
                    <button className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm cursor-pointer hover:bg-[#FF6A00]  hover:text-white">Continue with Apple</button>
                </div>
            </div>
        </div>
    );
}
