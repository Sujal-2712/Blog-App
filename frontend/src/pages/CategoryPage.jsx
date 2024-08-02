import React from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';
import { IoMdArrowRoundBack } from "react-icons/io";


const CategoryPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.pathname.split("/").at(-1);
    return (
        <div>
            <Header />
            <div className='mt-16'>
                <div className='max-w-4xl flex my-2 gap-2 mx-auto'>
                    <button onClick={() => {
                        navigate(-1);
                    }} className='border-gray-500 border-2 py-1 text-gray-800 flex justify-center items-center gap-1 rounded-md px-4'><IoMdArrowRoundBack/>
                        Back
                    </button>
                    <h2 className='font-bold text-2xl'>Blogs Tagged <span className='text-blue-600'>#{category}</span></h2>
                </div>
            </div>
            <Blogs />
            <Pagination />

        </div>
    )
}

export default CategoryPage
