"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/types'


interface HeaderProps {
    currentUser?: SafeUser | null
}


const Header = ({ currentUser }: HeaderProps) => {

    return (
        <header className='p-4 flex justify-between items-center'>
            <Link href="/" className='font-bold'>Property</Link>
            {currentUser && <div className=' font-semibold'>{currentUser?.role} : <span>{currentUser.name}</span></div>}
            {currentUser ?
                <Button onClick={() => signOut()} className=''>Logout</Button>
                :
                <Link href="/login">
                    <Button className=''>Login</Button>
                </Link>
            }
        </header>
    )
}

export default Header