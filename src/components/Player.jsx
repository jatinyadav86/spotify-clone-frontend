import React, { useContext } from 'react'
import songContext from '../context/context'

export const Player = () => {

    const { playerRef, songPlaying, currUser, liked, time, audio, seekbarSmall, seekbarPlayerSmall, addLikedSong, previousClick, nextClick, handleReplayState, currSongs } = useContext(songContext)

    const onToggleSong = (e) => {
        audio.current.currentTime = audio.current.duration * e.target.value / 100
    }

    return (
        // song player for small devices
        <div ref={playerRef} className='h-screen w-screen fixed z-40 top-0 hidden overflow-auto'>
            <div style={{ backgroundColor: songPlaying.song?.color }} className="h-full w-full relative">
                <div className="w-full h-full absolute top-0 right-0  bg-gradient-to-b from-transparent to-[#121212c2]"></div>
                <div className="h-full w-full  text-white p-3 flex flex-col justify-between absolute top-0 right-0">
                    <div className="w-full h-[8%] flex items-center justify-between">
                        <img onClick={() => playerRef.current.style.display = "none"} className='size-6 m-3' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670701/downArroy_jquxjb.svg" alt="" />
                        <span className='text-[13px] font-semibold'>{currSongs.name}</span>
                        <img className='size-6 m-3 rotate-90' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670838/options2_imchmc.svg" alt="" />
                    </div>
                    <div className="w-full h-[49%] flex justify-center items-center">
                        <img className='h-[80%]' src={songPlaying.song?.image} alt="" />
                    </div>
                    <div className="w-full h-[23%] flex justify-between items-center px-4">
                        <div className="name h-full flex flex-col justify-center">
                            <span className='font-bold text-2xl'>{songPlaying.song?.songName}</span>
                            <span className='text-base text-[#b3b3b3] font-bold'>{songPlaying.song?.desc}</span>
                        </div>
                        {liked.filter(value => value.songName == songPlaying.song?.songName).length > 0 ?
                            <img onClick={() => addLikedSong(songPlaying.song)} className='size-8' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669526/heart-green_a4rwbz.png" alt="" />
                            :
                            <img onClick={() => addLikedSong(songPlaying.song)} className='size-8' src="https://res.cloudinary.com/doswveiik/image/upload/v1729149943/icons8-heart-48_g3stvm.png" alt="" />
                        }
                    </div>
                    <div className="w-full h-[5%] seekbar flex flex-col items-center gap-2">
                        <div className="w-[93%] relative flex items-center group">
                            <div className="w-full h-1 absolute top-0 bg-[#4d4d4d] rounded-md" ></div>
                            <input ref={seekbarSmall} onChange={onToggleSong} className='range w-full h-1 group absolute  top-0 z-50' type="range" name="progress" id="" />
                            <div ref={seekbarPlayerSmall} className="h-1 bg-[#19e68c] lg:bg-white lg:group-hover:bg-[#19e68c] absolute  top-0 left-0 rounded-md flex items-center justify-end"></div>
                        </div>
                        <div className="w-[93%] text-[#b3b3b3] text-sm flex justify-between">
                            <span>{time.currentTime.min}:{time.currentTime.sec}</span>
                            <span>{time.totalTime.min || 0}:{time.totalTime.sec || 0}</span>
                        </div>
                    </div>
                    <div className="flex h-[10%] items-center justify-between px-4">
                        <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670939/shuffle_ngpoz0.svg" alt="" />
                        <img onClick={previousClick} className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726671022/previous-white_axk5zl.png" alt="" />
                        {audio.current && audio.current.paused ?
                            <img onClick={() => audio.current.play()} className='size-14 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670496/play-button_ravslf.png" alt="" />
                            :
                            <img onClick={() => audio.current.pause()} className='size-14 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670538/pause-button_thpchm.png" alt="" />
                        }
                        <img onClick={nextClick} className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726671065/next-white_vfvjx5.png" alt="" />
                        <div onClick={handleReplayState} className="cursor-pointer ">
                            {currUser.isReplay ?
                                <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670254/replay-green_i4p4pc.png" alt="" />
                                :
                                <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670193/replay_qyx9xf.png" alt="" />
                            }
                        </div>
                    </div>
                    <div className="w-full h-[5%] flex items-center justify-between px-4">
                        <img className='h-full' src="https://res.cloudinary.com/doswveiik/image/upload/v1726671398/connect_sdvgs5.svg" alt="" />
                        <img className='h-full' src="https://res.cloudinary.com/doswveiik/image/upload/v1726671471/share_ojb1ke.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
