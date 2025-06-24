"use client"
import { Button } from '../../../components/ui/button'
import { UserDetailContext } from '../../_context/UserDetailContext'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function Header() {
    const {userDetail, setUserDetail} = useContext(UserDetailContext);
    return (
        <div className='p-3 sm:p-5 shadow-sm flex justify-between items-center'>
        <Link href={'/'}>

            <div className='flex gap-2 items-center'>
                <Image src={'/logo.svg'} width={40} height={40} alt='logo' />
                <h2 className='font-bold text-sm sm:text-lg'>AI Room Design</h2>
            </div>
        </Link>
            <Link href={'/dashboard/buy-credits'}>

            <Button variant="ghost" className="rounded-full text-violet-500 hidden sm:block">Buy More Credits</Button>
            </Link>
            <Link href={'/dashboard'}>

            <Button variant="ghost" className="rounded-full text-violet-500 hidden sm:block">Your Dashboard</Button>
            </Link>
            <div className='flex gap-2 sm:gap-7 items-center'>
                <div className='flex gap-2 p-1 items-center bg-slate-200 px-2 sm:px-3 rounded-full'>
                    <Image src ={'/star.png'} width={20} height={20} alt='star'/>
                    <h2 className='text-sm sm:text-base'>{userDetail?.credits}</h2>
                </div>
                <UserButton/>
            </div>
        </div>
    )
}

export default Header
