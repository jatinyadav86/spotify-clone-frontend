import React, { useContext } from 'react'
import songContext from '../context/context'

const Loading = () => {

  const { loading } = useContext(songContext)

  return (
    <div className={`w-full h-full ${loading ? "flex" : "hidden"} absolute top-0 z-50 bg-[#121212] justify-center items-center`}>
      <div className="loader flex space-x-3">
        <div style={{ animationDelay: '0s' }} className="size-5 rounded-full animate-movingDot" ></div>
        <div style={{ animationDelay: '0.2s' }} className="size-5 rounded-full animate-movingDot "></div>
        <div style={{ animationDelay: '0.4s' }} className="size-5 rounded-full animate-movingDot "></div>
        <div style={{ animationDelay: '0.6s' }} className="size-5 rounded-full animate-movingDot "></div>
        <div style={{ animationDelay: '0.8s' }} className="size-5 rounded-full animate-movingDot "></div>
        <div style={{ animationDelay: '1s' }} className="size-5 rounded-full animate-movingDot" ></div>
      </div>
    </div>
  )
}

export default Loading