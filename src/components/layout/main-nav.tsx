import Link from 'next/link';
import React from 'react';
import { Icons } from '../icons';

export default  function MainNav({children}: {children: React.ReactNode}) {

  return (
    <header className='w-screen border-b'> 
      <div className='container max-w-[1400px] flex justify-between items-center h-16 py-6'>
        <Link href="/">
          <Icons.logo className="h-5 w-24"/>
        </Link>
        {children}
      </div>
    </header>
  );
}
