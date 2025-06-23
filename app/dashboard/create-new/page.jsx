"use client"
import React, { useState } from 'react'
import ImageSelection from './_components/imageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '../../../components/ui/button'

function CreateNew() {

  const [formData,setFormData] = useState([])
  const onHandleInputChange = (value,fieldName)=>{
    setFormData(prev=>({
      ...prev,
      [fieldName]: value
    }))
  }
  return (
    <div>
      <h2 className='font-bold text-4xl text-violet-500 text-center'>Let AI Bring Your Space to Life</h2>
      <p className='mt-3 text-center text text-gray-500'>Visualize and customize your dream room effortlessly with AI-powered design tool.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        {/* Image upload */}
        <ImageSelection selectedImage = {(value)=> onHandleInputChange(value,'image')}/>
        {/* Form input */}
        <div>
            <RoomType selectedRoomType={(value)=>onHandleInputChange(value,'roomType')}/>

            <DesignType selectedDesignType={(value)=>onHandleInputChange(value,'designType')}/>

          {/* Additional requirement */}
          <AdditionalReq additionalRequirementInput={(value)=> onHandleInputChange(value,'additionalReq')}/>
          {/* Generate Button */}
          <Button className='w-full mt-5 bg-violet-500 mb-30 hover:bg-violet-400'>Generate Image<span className='text-sm text-gray-300'>(1 credit)</span></Button>
        </div>
      </div>
    </div>
  )
}

export default CreateNew
