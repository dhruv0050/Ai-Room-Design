import Image from 'next/image'
import React from 'react'

function DesignType() {
    const Designs = [
        {
            name: 'Modern',
            image: ''
        },
        {
            name: 'Minimalist',
            image: ''
        },
        {
            name: 'Industrial',
            image: ''
        },
        {
            name: 'Bohemian',
            image: ''
        },
        {
            name: 'Traditional',
            image: ''
        },
        {
            name: 'Rustic',
            image: ''
        }
    ]
  return (
    <div>
      <label className='text-gray-500'>Interior Design Type</label>
      <div>
        {Designs.map((design, index) => (
            <div key = {index}>
                <Image src = {design.image} width={100} height={100}/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default DesignType
