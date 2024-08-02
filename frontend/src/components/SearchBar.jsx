import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from './../context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

import { CgProfile } from "react-icons/cg";


const SearchBar = () => {
    const location = useLocation();
    const [query, setQuery] = useState("");
    const { handleSearch, isLogin, setIsLogin, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        handleSearch(newQuery);
    };

    const handleLogout = () => {
        Cookies.remove('jwt');
        setIsLogin(false);
        setUser(null);
        toast.success('Successfully Logged Out!!')
        navigate('/login');
    };

    const [showSearch, setShowSearch] = useState(true);
    const [showProfile, setShowProfile] = useState(true);

    useEffect(() => {
        if (location.pathname.includes('addblog') || location.pathname.includes('blog') || location.pathname.includes('tag') || location.pathname.includes('categories')) {
            setShowSearch(false);
        } else {
            setShowSearch(true);
        }

        if (location.pathname.includes('profile')) {
            setShowProfile(false);
        } else {
            setShowProfile(true);
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-col md:flex-row gap-2 mt-16 md:mt-0 mx-5 my-5 md:mx-5 md:my-0">
            {(showSearch && showProfile) && (
                <div className='flex flex-row gap-2'>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search posts..."
                        className="px-4 py-1 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="px-4 py-1 bg-blue-600 flex items-center gap-1 text-white rounded-md hover:bg-blue-700">
                        <FaSearch className='text-xl' />
                    </button>
                </div>
            )}

            <div className="flex flex-col  justify-center md:flex-row gap-2">
                {!isLogin && (
                    <>
                        <Link to="/login">
                            <button className="px-4 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}

                {isLogin && showProfile && (
                    <Link to="/profile">
                        <button className="px-4 py-1 bg-green-500 flex gap-1 text-white rounded-md hover:bg-green-600">
                            <CgProfile className='text-2xl' /> 
                        </button>
                    </Link>
                )}

                {isLogin && (
                    <button onClick={handleLogout} className="px-4 py-1 flex w-14    gap-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                        <IoIosLogOut className='text-2xl'/>
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
