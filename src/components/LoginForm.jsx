import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <form className="w-full max-w-[500px] mx-auto">
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
                <button type='button' onClick={() => navigate('/reset-password')} className='w-full text-primary py-2 font-medium rounded mt-6 transition-colors'>Forgot your password?</button>
                <button type='submit' className='w-full buttons transition-colors'>Sign In</button>
            </form>
        </>
    )
}
