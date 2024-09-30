import React, { useContext } from 'react'
import songContext from '../context/context'
import { Link } from 'react-router-dom'

export const GetApp = () => {

    const { getApp } = useContext(songContext)

    return (
        <div ref={getApp} className="w-screen h-screen bg-gradient-to-tr from-[#509bf5] to-[#af2896] fixed z-20 top-0 hidden">
            <div className="h-full w-full overflow-auto scrollbar bg-gradient-to-b from-transparent to-[#121212e7]">
                <div className="w-full h-14 px-4 flex items-center justify-start fixed top-0">
                    <img onClick={() => getApp.current.style.display = "none"} className='' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664093/backward_nzvsoa.svg" alt="" />
                </div>
                <div className="w-auto h-[230px] mx-4 mt-16 p-4 bg-[#ffffff4d] rounded-lg flex flex-col items-center justify-between">
                    <img className='size-12' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664162/green-logo_wtrtmh.svg" alt="" />
                    <span className='text-lg font-bold'>Spotify Mobile App</span>
                    <p className="text-base font-bold text-center">Build your library · Listen to podcasts · Use less data · Try Spotify Premium</p>
                    <Link to={"https://www.spotify.com/download"} target='_blank'>
                        <div className="w-36 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">Get the app</div>
                    </Link>
                </div>
                <div className="w-auto h-[250px] m-4 p-4 bg-[#ffffff4d] rounded-lg flex flex-col items-center justify-between mb-48">
                    <img className='size-12' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664162/green-logo_wtrtmh.svg" alt="" />
                    <span className='text-lg font-bold'>Spotify on Home Screen</span>
                    <p className="text-base font-semibold text-center">Open Spotify in one tap · Listen in your browser · No download required · Save space on your phone</p>
                    <div className="w-36 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">Add now</div>
                </div>
            </div>
        </div>
    )
}
