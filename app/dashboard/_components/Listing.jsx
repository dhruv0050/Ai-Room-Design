"use client"
import { Button } from '../../../components/ui/button'
import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import EmptyState from './EmptyState';

function Listing() {
    const {user} = useUser();
    const [userRoomList, setUserRoomList] = useState([]);
  return (
    <div>
    <div className='flex items-center justify-between'>
      <h2 className='font-bold text-3xl'>Hey there! {user?.firstName}</h2>
      <Button className="bg-violet-500 hover:bg-violet-400">+ Design Your Room</Button>
    </div>
    {userRoomList?.length == 0?
    <EmptyState/>
        : 
        <div>
            {/*Listings */}
        </div>
    }
    </div>
  )
}

export default Listing
