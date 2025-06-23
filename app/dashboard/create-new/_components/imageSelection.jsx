"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function ImageSelection() {

    const [file, setFile] = useState(null);

    const onFileSelected = (event)=>{
        console.log(event.target.files[0])
        setFile(event.target.files[0]);
        selectedImage(event.target.files[0]);

    }

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
        Select Image of your Room
      </label>
      <div className='mt-3'>
        <label htmlFor='upload-image'>
          <div className={`
            p-16 sm:p-20 md:p-24 lg:p-28 
            border rounded-xl border-dotted 
            flex justify-center items-center
            border-violet-500 bg-slate-200 
            cursor-pointer hover:shadow-lg 
            transition-all duration-300
            min-h-[200px] sm:min-h-[250px] md:min-h-[300px]
            ${file && 'p-0 bg-white'}
          `}>
            {!file ? (
              <div className="flex flex-col items-center space-y-2">
                <Image 
                  src='/upload.png'
                  alt='upload image' 
                  width={50} 
                  height={50}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <span className="text-xs sm:text-sm text-gray-500 text-center">
                  Click to upload image
                </span>
              </div>
            ) : (
              <Image 
                src={URL.createObjectURL(file)} 
                width={300} 
                height={300}
                alt="Selected room image"
                className='w-full h-full object-cover rounded-xl'
              />
            )}
          </div>
        </label>
        <input 
          type='file' 
          accept='image/*' 
          id='upload-image'
          style={{ display: 'none' }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  )
}

export default ImageSelection