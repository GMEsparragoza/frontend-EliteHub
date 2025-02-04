import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Global.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Se crea la instancia de QueryClient

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
