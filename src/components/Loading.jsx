import React, { useContext } from 'react'
import songContext from '../context/context'

const Loading = () => {

    const { loading } = useContext(songContext)

  return (
    <div className={`w-full h-full ${loading ? "flex" : "hidden"} absolute top-0 z-50 bg-[#121212] justify-center items-center`}>
        <video src="https://res.cloudinary.com/doswveiik/video/upload/v1726664764/animation_d6wvcm.webm" autoPlay loop></video>
    </div>
  )
}

export default Loading