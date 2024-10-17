import React, { useContext, useEffect, useRef } from 'react'
import songContext from '../context/context';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";

const Playbar = () => {

    const volumeRef = useRef()
    const volumeShow = useRef()
    const volumeImg = useRef()
    const seekbar = useRef()
    const seekbarPlayer = useRef()
    const seekbarPlayerSmall2 = useRef()

    const navigate = useNavigate()

    const { login, setShouldPlay, currUser, audio, songPlaying, setSongPlaying, time, getApp, playerRef, playlistRef, setTime, currSongs, addLikedSong, liked, history, previousClick, nextClick, handleReplayState, seekbarSmall, seekbarPlayerSmall, } = useContext(songContext)

    useEffect(() => {
        if (login) {
            setInterval(()=>{
                audio.current.ontimeupdate = () => {
                    seekbar.current.value = Math.floor((audio.current.currentTime / audio.current.duration) * 100)
                    seekbarSmall.current.value = Math.floor((audio.current.currentTime / audio.current.duration) * 100)
                    // if (!audio.current.paused) {
                    seekbarPlayer.current.style.width = `calc(${seekbar.current.value}% + 5px)`
                    seekbarPlayerSmall.current.style.width = `calc(${seekbar.current.value}% + 5px)`
                    seekbarPlayerSmall2.current.style.width = `calc(${seekbar.current.value}% + 5px)`
                    // }
                    setTime({
                        currentTime: {
                            sec: Math.floor(audio.current.currentTime % 60),
                            min: Math.floor(audio.current.currentTime / 60)
                        },
                        totalTime: {
                            sec: Math.floor(audio.current.duration % 60),
                            min: Math.floor(audio.current.duration / 60)
                        }
                    })
                    if (Math.abs(audio.current.currentTime - audio.current.duration) < 0.1) {
                        if (currUser.isReplay) {
                            audio.current.play()
                        } else {
                            if (currSongs.songs.length > songPlaying.index + 1) {
                                setSongPlaying({
                                    song: currSongs.songs[songPlaying.index + 1],
                                    index: songPlaying.index + 1
                                })
                                setShouldPlay(true)
                            } else {
                                setSongPlaying({
                                    song: currSongs.songs[0],
                                    index: 0
                                })
                                setShouldPlay(true)
                            }
                        }
                    }
                }
            },1000)
        }

    }, [audio, currSongs, songPlaying, currUser,login])

    const onToggleSong = (e) => {
        audio.current.currentTime = audio.current.duration * e.target.value / 100
    }

    const volumeChange = (e) => {
        audio.current.volume = parseInt(e.target.value) / 100
        volumeShow.current.style.width = (+volumeRef.current.value + 2.5) + "%";
        if (audio.current.volume == 0) {
            volumeImg.current.src = "https://res.cloudinary.com/doswveiik/image/upload/v1726669362/volume-mute_qysppv.png"
        } else {
            volumeImg.current.src = "https://res.cloudinary.com/doswveiik/image/upload/v1726669326/volume_e2xi1b.png"
        }
    }

    const changeVolumeIcon = () => {
        if (audio.current.volume > 0) {
            audio.current.volume = 0
            volumeImg.current.src = "https://res.cloudinary.com/doswveiik/image/upload/v1726669362/volume-mute_qysppv.png"
            volumeRef.current.value = 0
            volumeShow.current.style.width = volumeRef.current.value + "%";
        } else {
            audio.current.volume = 1
            volumeImg.current.src = "https://res.cloudinary.com/doswveiik/image/upload/v1726669326/volume_e2xi1b.png"
            volumeRef.current.value = 100
            volumeShow.current.style.width = volumeRef.current.value + "%";
        }
    }

    const handleHomeClick = () => {
        playlistRef.current.style.top = "-100%"
        getApp.current.style.display = "none"
        navigate('/')
    }

    return (
        <>
            {/* player  bar for small devices */}
            {login &&
                <div className="player w-full flex flex-col items-center justify-center fixed bottom-0 z-30 lg:hidden">
                    {history.length > 0 &&
                        <div onClick={() => playerRef.current.style.display = "block"} style={{ backgroundColor: songPlaying.song.color }} className="w-[97%] h-14 rounded-lg relative flex justify-between">
                            <div className="song h-full flex items-center">
                                <img className='size-10 rounded-[4px] mx-2' src={songPlaying.song.image} alt="" />
                                <div className="mx-1">{songPlaying.song.songName}</div>
                            </div>
                            <div className="h-full flex items-center px-3">
                                {liked.filter(value => value.songName == songPlaying.song.songName).length > 0 ?
                                    <img onClick={(e) => { e.stopPropagation(); addLikedSong(songPlaying.song) }} className='size-7 mx-5' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669526/heart-green_a4rwbz.png" alt="" />
                                    :
                                    <img onClick={(e) => { e.stopPropagation(); addLikedSong(songPlaying.song) }} className='size-7 mx-5' src="https://res.cloudinary.com/doswveiik/image/upload/v1729149943/icons8-heart-48_g3stvm.png" alt="" />
                                }
                                {audio.current && audio.current.paused ?
                                    <img onClick={(e) => { e.stopPropagation(); audio.current.play() }} className='size-7' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669854/play_zptvam.png" alt="" />
                                    :
                                    <img onClick={(e) => { e.stopPropagation(); audio.current.pause() }} className='size-7' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669883/pause_kxcoqo.png" alt="" />
                                }
                            </div>
                            <div className="w-full flex justify-center items-center absolute bottom-0">
                                <div className="w-[98%]">
                                    <div ref={seekbarPlayerSmall2} className="h-[1.5px] w-0 bg-[#19e68c]"></div>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="w-full h-[70px] bg-black flex items-center justify-between px-5">
                        <div onClick={handleHomeClick} className="home flex flex-col items-center gap-1">
                            <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669971/home_ynsin8.svg" alt="" />
                            <span className='text-xs font-semibold text-[#B3B3B3]'>Home</span>
                        </div>
                        <div className="search flex flex-col items-center gap-1">
                            <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670029/search_eiricm.svg" alt="" />
                            <span className='text-xs font-semibold text-[#B3B3B3]'>Search</span>
                        </div>
                        <div onClick={() => { getApp.current.style.display = "none"; playlistRef.current.style.top = "0px" }} className="library flex flex-col items-center gap-1">
                            <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670083/playlist_co3iu8.svg" alt="" />
                            <span className='text-xs font-semibold text-[#B3B3B3]'>Your Library</span>
                        </div>
                        <div onClick={() => { playlistRef.current.style.top = "-100%"; getApp.current.style.display = "block" }} className="logo flex flex-col items-center gap-1">
                            <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669213/small-logo_tewiiv.svg" alt="" />
                            <span className='text-xs font-semibold text-[#B3B3B3]'>Get App</span>
                        </div>
                    </div>
                </div>
            }
            {/* player bar for large devices */}
            <div className={`player w-full h-14 lg:h-[66px] z-30 ${login && "hidden lg:flex"} flex items-center justify-center fixed bottom-2`}>
                {/* if login */}
                {login ? (
                    <>
                        <div className="w-[99%] hidden h-full lg:flex items-center justify-between px-3 rounded-lg">
                            <div className="song flex items-center gap-4 w-96 ">
                                <img className='size-14 rounded-[3px]' src={songPlaying.song.image} alt="" />
                                <div className="name flex flex-col justify-center">
                                    <span className='font-medium text-base'>{songPlaying.song.songName}</span>
                                    <span className='text-[13px] text-[#b3b3b3]'>{songPlaying.song.desc}</span>
                                </div>
                                {history.length > 0 &&
                                    <div onClick={handleReplayState} className="cursor-pointer ">
                                        {currUser.isReplay ?
                                            <Tooltip content="Disable Repeat">
                                                <img className='size-6 ml-7' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670254/replay-green_i4p4pc.png" alt="" />
                                            </Tooltip>
                                            :
                                            <Tooltip content="Enable Repeat">
                                                <img className='size-6 ml-7' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670193/replay_qyx9xf.png" alt="" />
                                            </Tooltip>
                                        }
                                    </div>
                                }

                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-center gap-7">
                                    <Tooltip content="Previous">
                                        <img onClick={previousClick} className='size-4 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670345/previous-gray_y9iyms.png" alt="" />
                                    </Tooltip>
                                    <button disabled={history.length === 0}>
                                        {audio.current && audio.current.paused ?
                                            <Tooltip content="Play">
                                                <img onClick={() => audio.current.play()} className='size-8 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670496/play-button_ravslf.png" alt="" />
                                            </Tooltip>
                                            :
                                            <Tooltip content="Pause">
                                                <img onClick={() => audio.current.pause()} className='size-8 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670538/pause-button_thpchm.png" alt="" />
                                            </Tooltip>
                                        }
                                    </button>
                                    <Tooltip content="Next">
                                        <img onClick={nextClick} className='size-4 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670419/next-gray_yaxyqg.png" alt="" />
                                    </Tooltip>
                                </div>
                                <div className="text-[#b3b3b3] text-sm flex items-center gap-2">
                                    <span className='w-8'>{time.currentTime.min}:{time.currentTime.sec}</span>
                                    <div className="w-[437px] relative flex items-center group">
                                        <div className="w-full h-1 absolute top-0 left-0 bg-[#4d4d4d] rounded-md -z-20"></div>
                                        <input disabled={history.length === 0} ref={seekbar} onChange={onToggleSong} className='range w-full h-1 group hidden lg:block absolute top-0 left-0' type="range" name="progress" id="" />
                                        <div ref={seekbarPlayer} className="h-1 bg-white group-hover:bg-[#19e68c] absolute top-0 left-0 -z-10 rounded-md flex items-center justify-end">
                                            <div className="size-3 bg-white rounded-full hidden group-hover:block"></div>
                                        </div>
                                    </div>
                                    <span className='w-8'>{time.totalTime.min || 0}:{time.totalTime.sec || 0}</span>
                                </div>
                            </div>
                            <div className="flex items-center w-72 justify-end px-5">
                                <button disabled={history.length === 0}>
                                    {liked.filter(value => value.songName == songPlaying.song.songName).length > 0 ?
                                        <Tooltip content="Remove fron Liked Songs">
                                            <img onClick={() => addLikedSong(songPlaying.song)} className='mx-3 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669526/heart-green_a4rwbz.png" alt="" />
                                        </Tooltip>
                                        :
                                        <Tooltip content="Add to Liked Songs">
                                            <img onClick={() => addLikedSong(songPlaying.song)} className='mx-3 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669454/heart_ue1t0a.png" alt="" />
                                        </Tooltip>
                                    }
                                </button>
                                <Tooltip content={audio.current && audio.current.volume == 0 ? "Unmute" : "Mute"}>
                                    <div>
                                        <img ref={volumeImg} onClick={changeVolumeIcon} className='size-5 mx-2 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669326/volume_e2xi1b.png" alt="" />
                                    </div>
                                </Tooltip>
                                <div className="w-28 relative flex items-center group">
                                    <div className="w-full h-1 absolute top-0 bg-[#4d4d4d] rounded-md -z-20"></div>
                                    <input ref={volumeRef} onChange={volumeChange} className='range w-full h-1 group' type="range" name="volume" id="" />
                                    <div ref={volumeShow} className="h-full w-full bg-white -z-10 absolute top-0 left-0 rounded-md group-hover:bg-[#19e68c] flex items-center justify-end">
                                        <div className="size-3 bg-white rounded-full hidden group-hover:block"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* if not login (for both small and large devices) */}
                        <Link className='w-[97%] lg:w-[99%] h-full' to={'/signup'}>
                            <div className="w-full h-full bg-gradient-to-r from-[#af2896] to-[#509bf5] flex items-center justify-between lg:px-4 cursor-pointer rounded-lg lg:rounded-none">
                                <div className="ml-2 lg:ml-0">
                                    <span className='text-[13px] lg:text-sm font-bold'>Preview of Spotify</span>
                                    <p className='text-[10px] lg:text-base font-normal'>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
                                </div>
                                <div className="w-[153px] h-9 lg:h-12 mr-2 lg:mr-0 bg-white flex items-center justify-center rounded-3xl hover:scale-[1.03]">
                                    <span className='text-black text-[12px] lg:text-base font-bold'>Sign up free</span>
                                </div>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </>
    )
}

export default Playbar