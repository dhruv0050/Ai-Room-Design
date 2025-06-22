import { Button } from '../../../components/ui/button'
import Image from 'next/image'
import React from 'react'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-6 md:mt-10 flex-col px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm sm:max-w-md lg:max-w-lg'>
        <Image 
          src={'/emptyState.png'} 
          width={300} 
          height={300} 
          alt='empty'
          className='w-full h-auto max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto'
        />
      </div>
      <h2 className='font-medium text-base sm:text-lg md:text-xl text-gray-500 text-center mt-4 sm:mt-6 max-w-xs sm:max-w-md'>
        Create New AI Design for Your Room
      </h2>
      <Button className='mt-4 sm:mt-5 bg-violet-500 hover:bg-violet-400 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto max-w-xs'>
        + Design Your Room
      </Button>
    </div>
  )
}

export default EmptyState