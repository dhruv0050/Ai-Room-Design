"use client"
import React, { useContext, useState } from 'react'
import ImageSelection from './_components/imageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '../../../components/ui/button'
import axios from 'axios'
import supabase from '../../../config/supabase'
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_components/CustomLoading'
import AiOutputDialog from '../_components/AiOutputDialog'
import { UserDetailContext } from '../../../app/_context/UserDetailContext'
import { Users } from '../../../config/schema'
import { db } from '../../../config/db'

function CreateNew() {

  const [formData, setFormData] = useState([])
  const onHandleInputChange = (value, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }
  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const [openOutputDialog, setOpenOutputDialog] = useState(false)
  const [aiOutputImage, setAiOutputImage] = useState()
  const [orgImage, setOrgImage] = useState()
  const { userDetail, setUserDetail } = useContext(UserDetailContext)


  const updateUserCredits = async () => {
    const result = await db.update(Users).set({
      credits: userDetail.credits - 1
    }).returning({ id: Users.id })

    if (result) {
      setUserDetail(prev => ({
        ...prev,
        credits: userDetail?.credits - 1
      }))
    }
  }
  const GenerateAIImage = async () => {
    setLoading(true)
    const rawImageUrl = await SaveRawImageToSupabase()
    const result = await axios.post('/api/design-room',
      {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        additionalReq: formData?.additionalReq,
        userEmail: user?.primaryEmailAddress?.emailAddress
      });
    console.log(result)
    await updateUserCredits()
    setAiOutputImage(result.data.result) //Output image's url
    setOpenOutputDialog(true)
    setLoading(false)

  }
  const SaveRawImageToSupabase = async () => {
    const fileName = `${Date.now()}_raw.png`;

    // Upload the file
    const { data, error } = await supabase.storage
      .from('room-design')
      .upload(`designs/${fileName}`, formData.image);

    if (error) {
      console.error('Upload error:', error.message);
      return null;
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from('room-design')
      .getPublicUrl(`designs/${fileName}`);

    setOrgImage(publicData.publicUrl);

    return publicData.publicUrl;
  };

  return (
    <div>
      <h2 className='font-bold text-4xl text-violet-500 text-center'>Let AI Bring Your Space to Life</h2>
      <p className='mt-3 text-center text text-gray-500'>Visualize and customize your dream room effortlessly with AI-powered design tool.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        {/* Image upload */}
        <ImageSelection selectedImage={(value) => onHandleInputChange(value, 'image')} />
        {/* Form input */}
        <div>
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />

          <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />

          {/* Additional requirement */}
          <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, 'additionalReq')} />
          {/* Generate Button */}
          <Button className='w-full mt-5 bg-violet-500 mb-30 hover:bg-violet-400' onClick={GenerateAIImage}>Generate Image<span className='text-sm text-gray-300'>(1 credit)</span></Button>
        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog openDialog={openOutputDialog} closeDialog={() => setOpenOutputDialog(false)} orgImage={orgImage} aiImage={aiOutputImage} />
    </div>
  )
}

export default CreateNew
