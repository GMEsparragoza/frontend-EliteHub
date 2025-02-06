import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND_API_URL } from '../config/variables';
import { useQuery } from "@tanstack/react-query";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

const fetchUserData = async () => {
    try {
        const res = await axios.post(`${REACT_APP_BACKEND_API_URL}/auth/verify-auth`, {}, { withCredentials: true });
        return res.data.user || null; // Evita undefined
    } catch (error) {
        return null; // Devolvemos null en caso de error
    }
};

export const AuthProvider = ({ children }) => {
    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            if (user) return user; // Si ya tenemos datos, no hacemos otra petición
            return fetchUserData();
        },
        staleTime: 1000 * 60 * 60, // 1 hora antes de que se vuelva "stale"
        cacheTime: 1000 * 60 * 60 * 2, // Guardar en caché por 2 horas
        refetchOnWindowFocus: false, // No volver a pedir datos si el usuario cambia de pestaña
        refetchOnMount: false,
        refetchOnReconnect: false, // No vuelve a hacer la petición al recuperar conexión
        refetchInterval: false, // No hacer refetch automáticamente
    });

    return (
        <AuthContext.Provider value={{ user: user, isLoading, error, refetchUser: refetch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);