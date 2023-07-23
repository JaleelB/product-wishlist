import Link from 'next/link';
import React from 'react';
import { Icons } from './icons';

export default  function FullNav({children}: {children: React.ReactNode}) {

  return (
    <header className='w-screen'> 
      <div className='container max-w-7xl flex justify-between items-center h-16 py-6'>
        <Link href="/">
          <Icons.logo className="h-5 w-24"/>
        </Link>
        <nav className='font-normal'>
          {children}
        </nav>
      </div>
    </header>
  );
}
