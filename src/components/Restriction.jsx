import React, { useContext } from 'react'
import songContext from '../context/context'
import { Link, useNavigate } from 'react-router-dom'

export const Restriction = () => {

    const { restriction,childRef, restrictionColor } = useContext(songContext)

    const handleClick = () => {
        restriction.current.style.display = "none"
    }

    const navigate = useNavigate()

    return (
        <div ref={restriction} className="fixed top-0 z-50 w-screen h-screen bg-[#000000cf] lg:flex-col items-center justify-center opacity-0 transition-opacity duration-1000 ease-in-out hidden">
            <div ref={restrictionColor} className="w-full h-full lg:w-[60%] lg:h-[67%] bg-[#366e6e] bg-gradient-to-b from-[#00000066] to-[#282828] text-white p-6 lg:p-16 flex flex-col lg:flex-row items-center justify-center lg:rounded-lg">
                <div className="size-40 lg:size-[300px] lg:mr-16 ">
                    <img ref={childRef} className=' h-full rounded-lg' src="https://i.scdn.co/image/ab67616d00001e026404721c1943d5069f0805f3" alt="" />
                </div>
                <div className="w-full lg:w-[304px] lg:h-[300px] detail flex flex-col items-center lg:justify-between gap-6 lg:py-3">
                    <p className='text-2xl lg:text-[30px] font-bold text-center mt-8 lg:mt-0 lg:leading-10'>Start listening with a free Spotify account</p>
                    <div onClick={() => navigate("/signup")} className="w-[138px] lg:w-[153px] h-12 bg-[#1ed760] flex items-center justify-center rounded-full">
                        <span className='text-black text-base font-semibold cursor-pointer'>Sign up free</span>
                    </div>
                    <Link to="https://www.spotify.com/in-en/download/windows/" target='_blank'>
                        <div className="w-[155px] lg:w-[171px] h-12 border border-[#878787] flex items-center justify-center rounded-full">
                            <span className='text-base font-bold cursor-pointer'>Download app</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <p className='text-[#FFFFFFB2] text-[13px]'>Already have an account? </p>
                        <p onClick={() => navigate("/login")} className='cursor-pointer hover:text-[#1ed760] font-medium text-sm'>Log in</p>
                    </div>
                    <div onClick={handleClick} className='text-base text-[#A7A7A7] font-semibold lg:hidden'>Close</div>
                </div>
            </div>
            <div onClick={handleClick} className="hidden lg:block text-[#A7A7A7] text-base font-bold mt-3 cursor-pointer">Close</div>
        </div>
    )
}
