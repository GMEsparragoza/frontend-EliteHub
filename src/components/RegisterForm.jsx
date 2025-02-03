import React, { useState } from 'react'
import axios from 'axios'
import { REACT_APP_BACKEND_API_URL } from '../config/variables'
import { sendCreateAccountEmail } from '../services/sendEmail'
import { toast } from 'react-toastify';

export const RegisterForm = () => {
    const [formRegister, setFormRegister] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState({ error: null, loading: false })

    const handleRegister = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null });
        try {
            if (formRegister.password !== formRegister.confirmPassword) {
                setStatus({ loading: false, error: 'The passwords do not match' })
                return;
            }
            const result = await axios.post(`${REACT_APP_BACKEND_API_URL}/auth/signup`, {
                username: formRegister.username,
                email: formRegister.email,
                password: formRegister.password
            })
            await sendCreateAccountEmail(result.data.user.email, result.data.user.username)
            setStatus({ loading: false, error: null })
            setFormRegister({ username: '', email: '', password: '', confirmPassword: '' })
            toast.success(`${result.data.message}! Please log in.`, {
                className: "bg-success text-textPrimary font-bold p-4 rounded-lg shadow-lg",
                progressClassName: "bg-highlight",
                iconClassName: "text-highlight",
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            toast.error("There was an error in registration. Please try again.", {
                className: "bg-detailsError text-textPrimary font-semibold p-4 rounded-lg shadow-lg",
                progressClassName: "bg-error",
                iconClassName: "text-error",
            });
            setStatus({
                loading: false,
                error: error.response?.data?.message || error.response?.data?.errors?.[0]?.msg
            });
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleRegister(e)} className="w-full max-w-[500px] mx-auto">
                <h2 className='text-2xl font-medium text-textPrimary mb-5 text-center'>Sign Up</h2>
                <div className='my-4'>
                    <label className="block text-textSecondary text-sm font-medium mb-1">Username</label>
                    <input type="text"
                        value={formRegister.username}
                        onChange={(e) => setFormRegister({ ...formRegister, username: e.target.value })}
                        className="w-full border-b-2 border-border bg-cardBackground outline-none px-3 py-2 text-textPrimary placeholder-tertiary focus:border-transparent"
                        placeholder="Enter your username" />
                </div>
                <div className='my-4'>
                    <label className="block text-textSecondary text-sm font-medium mb-1">E-mail</label>
                    <input type="text"
                        value={formRegister.email}
                        onChange={(e) => setFormRegister({ ...formRegister, email: e.target.value })}
                        className="w-full border-b-2 border-border bg-cardBackground outline-none px-3 py-2 text-textPrimary placeholder-tertiary focus:border-transparent"
                        placeholder="Enter your email" />
                </div>
                <div className='my-4 relative'>
                    <label className="block text-textSecondary text-sm font-medium mb-1">Password</label>
                    <input type={showPassword ? "text" : "password"}
                        value={formRegister.password}
                        onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
                        className="w-full border-b-2 border-border bg-cardBackground outline-none px-3 py-2 text-textPrimary placeholder-tertiary focus:border-transparent"
                        placeholder="Enter your password" />
                    <i className={`${showPassword ? 'bx bx-show' : 'bx bx-hide'} absolute right-3 top-10 cursor-pointer text-white`}
                        onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <div className='my-4 relative'>
                    <label className="block text-textSecondary text-sm font-medium mb-1">Confirm Password</label>
                    <input type={showConfirmPassword ? "text" : "password"}
                        value={formRegister.confirmPassword}
                        onChange={(e) => setFormRegister({ ...formRegister, confirmPassword: e.target.value })}
                        className="w-full border-b-2 border-border bg-cardBackground outline-none px-3 py-2 text-textPrimary placeholder-tertiary focus:border-transparent"
                        placeholder="Confirm your password" />
                    <i className={`${showConfirmPassword ? 'bx bx-show' : 'bx bx-hide'} absolute right-3 top-10 cursor-pointer text-textPrimary`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                </div>
                <button type='submit' className='w-full buttons transition-colors'>Sign Up</button>
                {status.error && <p className='text-error text-lg font-medium text-center my-2'>{status.error}</p>}
                {status.loading && <p className='text-textPrimary text-lg font-medium text-center my-2'>Registering...</p>}
            </form>
        </>
    )
}
