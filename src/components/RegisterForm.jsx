import React, { useState } from 'react'

export const RegisterForm = () => {
    const [formRegister, setFormRegister] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <form className="w-full max-w-[500px] mx-auto">
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
                    <input type="email"
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
            </form>
        </>
    )
}
