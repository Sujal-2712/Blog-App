import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='w-full flex justify-center'>
      <header className='py-2 px-6 flex justify-between items-center w-full bg-slate-800 text-white fixed top-0 z-10'>
        <div className="flex items-center">
          <img
            className='w-32 md:w-40 h-10'
            src="https://www.codehelp.in/_next/image?url=%2Fassets%2FCommon%2FWhitelogoGIF.gif&w=256&q=70"
            alt="CodeHelp Logo"
          />
        </div>
        <div className="flex sm:hidden mx-4">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:justify-end">
          <SearchBar />
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="sm:hidden w-full bg-slate-800 mt-14 py-2">
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default Header;
