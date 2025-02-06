import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const [toggleForm, setToggleForm] = useState(false);
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <div className='min-h-screen bg-background text-textPrimary flex flex-col justify-center items-center gap-4'>
                <div className='h-[720px] w-full max-w-[600px] bg-cardBackground px-8 pt-10 pb-20 rounded-lg shadow-lg flex flex-col items-center'>
                    <div className="w-full h-full bg-background rounded-lg shadow-lg p-4">
                        <div className="flex justify-center mb-8">
                            <Link to=""
                                className={`py-2 px-4 text-sm font-medium border-2 rounded-l cursor-pointer text-textPrimary ${!toggleForm ? "bg-secondary border-border" : "bg-primary border-primary"}`}
                                onClick={() => setToggleForm(false)}>
                                Login
                            </Link>
                            <Link to=""
                                className={`py-2 px-4 text-sm font-medium border-2 rounded-r cursor-pointer text-textPrimary ${toggleForm ? "bg-secondary border-border" : "bg-primary border-primary"}`}
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