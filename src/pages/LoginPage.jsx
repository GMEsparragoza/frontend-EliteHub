import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

const LoginPage = () => {
    const [toggleForm, setToggleForm] = useState(false);

    return (
        <>
            <div className='min-h-screen bg-background text-textPrimary flex flex-col justify-center items-center gap-4'>
                <div className='h-[700px] w-full max-w-[600px] bg-cardBackground px-8 pt-10 pb-20 rounded-lg shadow-lg flex flex-col items-center'>
                    <div className="w-full h-full bg-background rounded-lg shadow-lg p-4">
                        <div className="flex justify-center mb-8">
                            <Link to=""
                                className={`py-2 px-4 text-sm font-medium border rounded-l cursor-pointer text-textPrimary ${!toggleForm ? "bg-primary border-textSecondary" : "bg-secondary border-border"}`}
                                onClick={() => setToggleForm(false)}>
                                Login
                            </Link>
                            <Link to=""
                                className={`py-2 px-4 text-sm font-medium border rounded-r cursor-pointer text-textPrimary ${toggleForm ? "bg-primary border-textSecondary" : "bg-secondary border-border"}`}
                                onClick={() => setToggleForm(true)}>
                                Register
                            </Link>
                        </div>
                        {!toggleForm && <LoginForm />}
                        {toggleForm && <RegisterForm />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage