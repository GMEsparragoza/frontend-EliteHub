import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-textPrimary">
            <h1 className="text-6xl font-bold text-accent">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page not found</h2>
            <p className="text-textSecondary mt-2 text-center px-4">
                We are sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-primary font-semibold rounded-xl text-white hover:bg-secondary transition duration-300"
            >
                Back to top
            </Link>
        </div>
    );
};