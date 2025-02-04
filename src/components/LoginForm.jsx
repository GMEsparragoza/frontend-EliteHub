import React, { useState } from 'react'
import axios from 'axios'
import { REACT_APP_BACKEND_API_URL } from '../config/variables'
import { toast } from 'react-toastify';
import { useQueryClient } from "@tanstack/react-query";

export const LoginForm = () => {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState({ loading: false, error: null })
    const [twoFAMenu, setTwoFAMenu] = useState(false);
    const [twoFACode, setTwoFACode] = useState(null)
    const queryClient = useQueryClient();

    const handleLogin = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null })
        try {
            const result = await axios.post(`${REACT_APP_BACKEND_API_URL}/auth/signin`, {
                email: formLogin.email,
                password: formLogin.password
            }, { withCredentials: true })
            if (result.data.twoFARequired) {
                setStatus({ loading: false, error: null });
                setTwoFAMenu(true);
                toast.info(`${result.data.message}! Please enter it below`, {
                    className: "bg-warning text-textPrimary font-bold p-4 rounded-lg shadow-lg",
                    progressClassName: "bg-accent",
                    iconClassName: "text-accent",
                });
            } else {
                toast.success(`${result.data.message}! Going to Dashboard`, {
                    className: "bg-success text-textPrimary font-bold p-4 rounded-lg shadow-lg",
                    progressClassName: "bg-highlight",
                    iconClassName: "text-highlight",
                });
                setStatus({ loading: false, error: null });
                queryClient.invalidateQueries(["user"]);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            toast.error("There was an error logging in. Please try again.", {
                className: "bg-detailsError text-textPrimary font-semibold p-4 rounded-lg shadow-lg",
                progressClassName: "bg-error",
                iconClassName: "text-error",
            });
            setStatus({
                loading: false,
                error: error.response?.data?.message || error.response?.data?.errors?.[0]?.msg
            });
            console.error(error)
        }
    }

    const verifyTwoFACode = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null });
        try {
            const response = await axios.post(`${REACT_APP_BACKEND_API_URL}/auth/verify-2fa`, {
                code: twoFACode,
                email: formLogin.email
            }, { withCredentials: true })
            setStatus({ loading: false, error: null });
            toast.success(`${response.data.message}!`, {
                className: "bg-success text-textPrimary font-bold p-4 rounded-lg shadow-lg",
                progressClassName: "bg-highlight",
                iconClassName: "text-highlight",
            });
            queryClient.invalidateQueries(["user"]);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            toast.error("There was an error verifying the user. Please try again.", {
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
            <form onSubmit={(e) => handleLogin(e)} className="w-full max-w-[500px] mx-auto">
                <h2 className='text-2xl font-medium text-textPrimary mb-5 text-center'>Sign In</h2>
                <div className='my-4'>
                    <label className="block text-textSecondary text-sm font-medium mb-1">E-mail</label>
                    <input type="email"
                        value={formLogin.email}
                        onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
                        className="w-full border-b-2 border-border bg-cardBackground outline-none px-3 py-2 text-textPrimary placeholder-tertiary focus:border-transparent"
                        placeholder="Enter your email" />
                </div>
                <div className='my-4 relative'>
                    <label className="block text-textSecondary text-sm font-medium mb-1">Password</label>
                    <input type={showPassword ? 'text' : 'password'}
                        value={formLogin.password}
                        onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                        className="w-full border-b-2 border-border bg-cardBackground outline-none px-3 py-2 text-textPrimary placeholder-tertiary focus:border-transparent"
                        placeholder="Enter your password" />
                    <i className={`${showPassword ? 'bx bx-show' : 'bx bx-hide'} absolute right-3 top-10 cursor-pointer text-textPrimary`}
                        onClick={() => setShowPassword(!showPassword)}></i>
                </div>
                <button type='button' className='w-full text-primary py-2 font-medium rounded mt-6 transition-colors'>Forgot your password?</button>
                <button type='submit' className='w-full buttons transition-colors'>Sign In</button>
                {status.error && !twoFAMenu && <p className='text-error text-lg font-medium text-center my-2'>{status.error}</p>}
                {status.loading && !twoFAMenu && <p className='text-textPrimary text-lg font-medium text-center my-2'>Logging in...</p>}
            </form>
            {twoFAMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <form onSubmit={(e) => verifyTwoFACode(e)} className="w-full max-w-[500px] mx-auto bg-cardBackground p-6 rounded-lg relative z-40">
                        <h2 className='text-2xl font-medium text-textPrimary mb-5 text-center'>Verify 2FA</h2>
                        <div className='my-4'>
                            <label className="block text-textSecondary text-sm font-medium mb-1">Verification Code</label>
                            <input
                                type="number"
                                value={twoFACode}
                                onChange={(e) => setTwoFACode(e.target.value)}
                                className="w-full rounded-lg border-b-2 border-border bg-background outline-none px-3 py-2 text-textPrimary placeholder-tertiary focus:border-transparent"
                                placeholder="Enter the Verification Code"
                            />
                        </div>
                        <div className="flex justify-between items-center w-11/12 mx-auto space-x-4">
                            <button
                                type='button'
                                onClick={() => {
                                    setTwoFAMenu(false)
                                    setStatus({ loading: false, error: null })
                                    setFormLogin({ email: "", password: "" })
                                }}
                                className='w-1/2 buttons transition-colors duration-300'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='w-1/2 buttons transition-colors duration-300'
                            >
                                Confirm
                            </button>
                        </div>
                        {status.error && <p className='text-red mt-2 text-center'>{status.error}</p>}
                        {status.loading && <p className='text-white mt-2 text-center'>Loggin in...</p>}
                    </form>
                </div>
            )}
        </>
    )
}
