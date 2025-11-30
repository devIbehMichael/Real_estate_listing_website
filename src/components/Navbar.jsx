import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Home className="h-6 w-6 text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900">EstatePlatform</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>
                            <Link to="/properties" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Properties
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link to="/admin/login" className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                            <span className="sr-only">Admin Login</span>
                            <User className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
