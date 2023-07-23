import Link from 'next/link';
import React from 'react';

export default function SiteFooter (){

    const d = new Date();
    const year = d.getFullYear();

    return (
        <footer className='pb-8 pt-8 w-screen px-4 mt-auto bottom-0'>
            <div className='
                  container max-w-[1400px] text-neutral-500
                  flex flex-col sm:flex-row justify-between md:items-center
                  font-normal gap-4 sm:gap-0
                '
            >
                <p className="flex md:justify-center text-xs leading-5 text-neutral-500">
                    &copy; {`${year}`} Built by{" "}
                    <Link
                        href="https://twitter.com/jal_eelll"
                        className="underline hover:text-neutral-600"
                    >
                        &nbsp;Jaleel Bennett
                    </Link>
                    {". "}
                    All rights reserved.
                </p>
            </div>
        </footer>
    )
}

