import Link from 'next/link';
import React from 'react';
import DropdownCategory from '../dropdown/DropdownCategory';
import { MenuHeader } from '@/utils/constant';
import CheckAuthHeader from '@/module/auth/CheckAuthHeader';
import HeaderMd from './HeaderMd';
const Header = () => {
  return (
    <header className='header'>
      <div className='main-header'>
        <div className='header-logo'>
          <Link href={'/'}>
            <span className='text-3xl font-bold'>Logo</span>
          </Link>
        </div>
        <div className='header-search'>
          <input type='text' className='header-search-input' />
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </span>
        </div>

        <div className='header-nav'>
          <div className='header-nav-item'>
            <Link href={'/'}>Trang chủ</Link>
          </div>
          <CheckAuthHeader/>
        </div>
        <HeaderMd />
      </div>
    </header>
  );
};

export default Header;
