import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Add API call for login
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Log In</h1>
            <form onSubmit={handleLogin} className="bg-white shadow-md p-8 rounded-lg">
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md">
                    Log In
                </button>
                <p className="mt-4 text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;