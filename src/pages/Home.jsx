import React from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
import { REACT_APP_BACKEND_API_URL } from '../config/variables'
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Home = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient();


    // Logica de cerrar sesion. Se debe mover a Perfil/Dashboard mas adelante
    const handleLogout = () => {
        axios.post(`${REACT_APP_BACKEND_API_URL}/auth/logout`)
            .then(() => {
                console.log("Sesion cerrada")
                queryClient.invalidateQueries(["user"]);
                toast.success('session closed successfully', {
                    className: "bg-success text-textPrimary font-bold p-4 rounded-lg shadow-lg",
                    progressClassName: "bg-highlight",
                    iconClassName: "text-highlight",
                });
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            })
            .catch(error => {
                console.log("error")
            });
    };

    return (
        <>
            <div className='min-h-screen bg-background text-textPrimary flex flex-col justify-center items-center gap-4'>
                <h1 className='text-3xl font-semibold text-lightBlue'>Home</h1>
                <p className='text-xl'>Nashe</p>
                {user && (
                    <div>
                        <p className='text-center text-3xl text-primary'>{user.username}</p>
                        <p className='text-center text-xl text-tertiary'>{user.email}</p>
                        <button onClick={handleLogout} className='buttons w-full'>Cerrar Sesion</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home