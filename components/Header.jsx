import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { PenBox } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import UserMenu from './UserMenu';
import { checkUser } from '@/lib/checkUser';

const Header = async() => {

    await checkUser();

    return (
        <nav className='mx-auto py-2 px-4 flex justify-between'>

            <Link href={'/'} >
            <Image 
                src="/logo.png" 
                width="150"
                height="70"
                alt='Schedulrr logo'
                className='h-16 w-auto'
            />
            </Link>

            <div className='flex items-center space-x-4'>

                <Link href='/events?create=true'>
                    <Button className="flex items-center gap-2">
                        <PenBox size={18}/> Create Event
                    </Button>
                </Link>
                
                <SignedOut>
                    <SignInButton forceRedirectUrl='/dashboard'>
                        <Button variant='outline' className='font-bold'> Login </Button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserMenu />
                </SignedIn>
            </div>

        </nav>
    )
}

export default Header;