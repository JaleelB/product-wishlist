"use client"
import Link from 'next/link';
import { Icons } from '../icons';
import { useUser } from '@clerk/nextjs';

export default  function MainNav({children}: {children: React.ReactNode}) {

  const { isSignedIn } = useUser()

  return (
    <header className='w-screen border-b'> 
      <div className='container max-w-[1400px] flex justify-between items-center h-16 py-6'>
        <Link href={isSignedIn ? "/home" : "/"}>
          <Icons.logo className="h-5 w-24"/>
        </Link>
        {children}
      </div>
    </header>
  );
}
