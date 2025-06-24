import React from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
function RoomDesignCard({ room }) {
  return (
    <div className='shadow-md rounded-md cursor-pointer'>
      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: room?.orgImage
        }}
        secondImage={{
          imageUrl: room?.aiImage
        }}
      />
      <div className='p-4'>
        <h2>Room Type : {room.roomType}</h2>
        <h2>Design Type : {room.designType}</h2>
      </div>
    </div>
  )
}

export default RoomDesignCard


