import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import songContext from '../context/context'
import { Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";

export const Header = () => {

    const { login, currUser, logout } = useContext(songContext)
    const navigate = useNavigate()
    const location = useLocation();

    return (
        <>
            {/* top portion if login */}
            {login ? (
                <>
                    {/* for large devices */}
                    <div className="topPortion hidden w-full h-14 lg:h-16 bg-black lg:bg-[#00000080] lg:px-5 absolute top-0 right-0 z-10 rounded-t-lg lg:flex items-center justify-between">
                        <div className="hidden lg:flex gap-2">
                            <div onClick={() => navigate(-1)} className="size-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
                                <img className='size-4' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664277/previousPage_oqfeiy.svg" alt="" />
                            </div>
                            <div onClick={() => navigate(1)} className="size-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
                                <img className='size-4' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664323/nextPage_sndk68.svg" alt="" />
                            </div>
                        </div>
                        <div className="gap-4 h-full flex items-center justify-end px-2">                    
                            <Link to={"https://www.spotify.com/in-en/purchase/offer/2024-q2globalcampaign-intro/?country=IN&ref=webplayer_app_native_pdp"} target="_blank"><div className="h-8 w-36 bg-white text-black rounded-2xl flex items-center justify-center font-semibold text-sm">Explore Premium</div></Link>
                            <Link to={"https://www.spotify.com/in-en/download/windows/"} target="_blank">
                                <div className="h-8 w-32 bg-black rounded-2xl flex items-center justify-center text-sm gap-2">
                                    <img className='size-5' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664379/download_rlvucf.png" alt="" />
                                    <span>Install App</span>
                                </div>
                            </Link>
                            {/* popover for logout */}
                            <Popover placement="bottom-start">
                                <PopoverHandler>
                                    <div className="size-8 bg-black rounded-[50%] flex justify-center items-center cursor-pointer">
                                        <div className="size-6 bg-[#19e68c] text-black rounded-[50%] flex items-center justify-center font-bold text-sm">{currUser.name?.charAt(0)}</div>
                                    </div>
                                </PopoverHandler>
                                <PopoverContent>
                                    <div className="w-24 h-16 flex flex-col justify-center items-center">
                                        <div className="text-sm font-bold mt-3">{currUser.name}</div>
                                        <button onClick={logout} className='w-[80px] h-8 text-white text-base bg-[#19e68c] font-bold rounded-full mt-3 hover:scale-[1.05]'>Log out</button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {/* Note -> top portion for small device when login is available in content.jsx */}
                </>
            ) : (
                <>
                    {/*top portion if not login */}
                    {/* for both small and large devices */}
                    <div className={`topPortion w-full h-14 lg:h-16 ${location.pathname.split("/").includes("album") ? "bg-[#00000080]" : "bg-black"} lg:bg-[#00000080]  lg:px-5 absolute top-0 right-0 z-30 lg:z-10 lg:rounded-t-lg`}>
                        <div className="gap-4 w-full h-full flex items-center justify-between px-2">
                            <div className="logo lg:hidden">
                                <img className='invert w-24 lg:w-[105px]' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664463/logo_tseut2.svg" alt="" />
                            </div>
                            <div className="hidden lg:flex gap-2">
                                <div onClick={() => navigate(-1)} className="size-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
                                    <img className='size-4' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664277/previousPage_oqfeiy.svg" alt="" />
                                </div>
                                <div onClick={() => navigate(1)} className="size-8 bg-black rounded-full flex justify-center items-center cursor-pointer">
                                    <img className='size-4' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664323/nextPage_sndk68.svg" alt="" />
                                </div>
                            </div>
                            <div className="login flex gap-6 lg:mx-3 items-center">
                                <Link to={'/signup'}>
                                    <div className="signup text-base font-bold text-[#b3b3b3] cursor-pointer hover:text-white hover:scale-[1.03]">Sign up</div>
                                </Link>
                                <Link to={'/login'}>
                                    <div className="login h-8 lg:h-12 w-20 lg:w-[109px] bg-white text-black rounded-full flex items-center justify-center font-bold cursor-pointer hover:scale-[1.03] hover:bg-[#f6f6f6]">Log in</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
