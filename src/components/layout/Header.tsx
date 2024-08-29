import Link from 'next/link';
import DropdownCategory from '../dropdown/DropdownCategory';
import { MenuHeader } from '@/utils/constant';
export default function Header() {
  return (
    <header className='w-full'>
      <div className='container py-5 flex items-center justify-between'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className='size-7 stroke-blue-600'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
          <span className='ml-2 font-bold text-xl inline-block'>Logo</span>
        </div>
        <div className='flex item-center gap-x-5'>
          <DropdownCategory></DropdownCategory>
          <ul className='flex items-center gap-x-5 '>
            {MenuHeader.map((item, index) => (
              <li key={index} className='hover:text-blue-600 hover:bg-blue-400/40 px-2 py-1.5 rounded-md'>
                <Link href={item.path} className='font-medium'>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-x-5">
            <button className=''>
                <Link href="/auth/sign-in" className='font-medium'>Đăng nhập</Link>
            </button>
            <button className='px-3 py-2 bg-blue-600 rounded-lg'>
                <Link href="/auth/sign-up" className='font-medium text-white'>Đăng ký</Link>
            </button>
        </div>
      </div>
    </header>
  );
}
