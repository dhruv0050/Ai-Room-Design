import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
} from "../../../../components/ui/alert-dialog"
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
function CustomLoading({loading}) {
    const {user} = useUser()
    return (
 
            <AlertDialog open={loading}>
                <AlertDialogContent>
                    <div className='bg-white flex flex-col items-center my-10 justify-center'>
                        <Image src = {'/loader.gif'} alt='laoding' width={100} height={100}/>
                        <div className='flex flex-col items-center'>
                        <h2>Hold On {user?.firstName} !!</h2>
                        <h2>We are desigining your room</h2>
                        </div>

                    </div>
                </AlertDialogContent>
            </AlertDialog>

    )
}

export default CustomLoading
