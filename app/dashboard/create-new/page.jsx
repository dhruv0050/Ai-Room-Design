"use client"
import React from 'react'
import ImageSelection from './_components/imageSelection'
import RoomType from './_components/RoomType'

function CreateNew() {

  const onHandleInputChange = (value,fieldName)=>{

  }
  return (
    <div>
      <h2 className='font-bold text-4xl text-violet-500 text-center'>Let AI Bring Your Space to Life</h2>
      <p className='mt-3 text-center text text-gray-500'>Visualize and customize your dream room effortlessly with AI-powered design tool.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center mt-10'>
        {/* Image upload */}
        <ImageSelection selectedImage = {(value)=> onHandleInputChange(value,'image')}/>
        {/* Form input */}
        <div>
          {/* Room Type */}
          <RoomType/>
          {/* Design type */}

          {/* Additional requirement */}

          {/* Generate Button */}
        </div>
      </div>
    </div>
  )
}

export default CreateNew
