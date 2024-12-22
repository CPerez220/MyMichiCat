import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <img src="/assets/logo.png" alt="MyMichiCat" className="w-24 mb-4" />
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to MyMichiCat</h1>
            <p className="text-lg text-gray-700 mb-6">
                Your Cat’s Safety, Just a Scan Away.
            </p>
            <div className="flex space-x-4">
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Sign Up
                </Link>
                <Link to="/login" className="px-4 py-2 bg-gray-300 text-black rounded-md">
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default HomePage;