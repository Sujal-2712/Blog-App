import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Pagination = () => {
  const { page, handlePageChange, totalPages, isLogin } = useContext(AppContext);
  return (
    <div className='w-full border-t bg-gray-50 shadow-lg py-4 fixed bottom-0'>
      <div className='flex flex-col items-center md:flex-row md:justify-between max-w-4xl mx-auto px-4 md:px-6'>
        <div className='flex gap-4 mb-3 md:mb-0'>
          {page !== 1 && (
            <button
              className='bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition duration-300'
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              className='bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold transition duration-300'
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          )}
        </div>
        <div className='flex items-center gap-4'>
          {isLogin && (
            <Link to="/addblog">
              <button className='bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition duration-300'>
                Upload Blog
              </button>
            </Link>
          )}
          <p className='font-bold text-gray-700 italic uppercase text-center md:text-left'>
            Page {page} of {totalPages ?? 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
