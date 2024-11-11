import Link from 'next/link';

export default function NewProductSmall() {
  return (
    <div className='w-full relative rounded-lg'>
      <div className='absolute top-10 left-6'>
        <Link
          className='text-green-500 bg-green-300/40 rounded-lg px-2.5 py-1.5'
          href='/'
        >
          Sách
        </Link>
        <h3 className='text-3xl font-bold mt-7 text-slate-400'>
          Cách xử lý khi gặp elsu
        </h3>
      </div>
      <img
        src='https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        alt=''
        className='w-full h-full object-cover object-center'
      />
    </div>
  );
}
