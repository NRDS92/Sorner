import React from 'react'

import video1 from "../assets/video1.mp4"
import video2 from "../assets/video2.mp4"
import video3 from "../assets/video3.mp4"
import video4 from "../assets/video4.mp4"
import Tape1 from "../assets/TapeImg1.png"
import Tape2 from "../assets/TapeImg2.png"

export default function Banner() {
  return (
    <div className=' relative grid grid-cols-2  bg-black p-3 w-screen '>
        <img className='absolute h-[40%] left-[2px]  bottom-[-40px]' src={Tape1} alt='Tape' ></img>
        <video className='' autoPlay loop>
            <source src={video1} type="video/mp4"/>
        </video>
        <div className='grid grid-cols-2 grid-rows-2'>
            <video width="320" autoPlay loop>
                <source src={video2} type="video/mp4"/>
            </video>
            <video width="320" autoPlay loop>
                <source src={video3} type="video/mp4"/>
            </video>
            <div className=' relative col-span-2 '>
                <video autoPlay loop className=' absolute h-full w-screen object-cover '  >
                    <source src={video4}  type="video/mp4"/>
                </video>
            </div>
            
        </div>
        <img className='absolute h-[40%] right-[10px] ' src={Tape2} alt='Tape' ></img>
      

    </div>
  )
}
