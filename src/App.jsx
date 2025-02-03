import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { Navbar } from './components/Navbar';
import { NotFound } from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider >
        <BrowserRouter>
          <Navbar />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            bodyClassName="text-xl"
          />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
