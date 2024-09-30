import React, { useContext, useRef, useState } from 'react'
import songContext from '../context/context'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverHandler, PopoverContent, Tooltip } from "@material-tailwind/react";
const backenduri = import.meta.env.VITE_BACKEND_URI;

export const PlaylistsMenu = () => {
    const popoverrr = useRef(null);

    const [open, setOpen] = useState(false);
    const [newPlaylist, setnewPlaylist] = useState("")

    const { login, shouldPlay, setShouldPlay, allGenre, currUser, liked, playlistRef, truncateLine, playlist1, playlist2, deletePlaylist1, addPlaylist2, deletePlaylist2, currSongs, audio, setCurrSongs, setSongPlaying, addHistory } = useContext(songContext)

    const navigate = useNavigate()

    const getImage = (name) => {
        let image

        allGenre.some(category => {
            return category.playlists.some(playlist => {
                if (playlist.name === name) {
                    image = playlist.image
                    return (true);
                }
                return false;
            });
        });

        return image
    }

    const getDesc = (name) => {
        let desc

        allGenre.some(category => {
            return category.playlists.some(playlist => {
                if (playlist.name === name) {
                    desc = playlist.desc
                    if (desc.length > 25) {
                        desc = desc.substring(0, 25) + '...';
                    }
                    return (true);
                }
                return false;
            });
        });

        return desc
    }

    const addPlaylistClick = () => {
        if (login) {
            setOpen(true);
        } else {
            popoverrr.current.click();
        }
    };

    const handleChange = (event) => {
        setnewPlaylist(event.target.value);
    }

    const addPlaylist = (e) => {
        e.preventDefault()
        addPlaylist2(newPlaylist)
        setnewPlaylist("")
        setOpen(false);
    };

    const handleDeletePlaylist1 = (event, name) => {
        event.stopPropagation()
        deletePlaylist1(name)
    }

    const handleDeletePlaylist2 = (event, name) => {
        event.stopPropagation()
        deletePlaylist2(name)
        navigate("/")
    }

    const handlePlayClick = async (event, e) => {
        event.stopPropagation()

        if (currSongs.name === e.name) {
            if (audio.current.paused) {
                audio.current.play()
            }
            else {
                audio.current.pause()
            }
        } else {
            if (e.catagory === "playlist") {
                playlist2.forEach((item) => {
                    if (item.name === e.name) {
                        if (item.songs.length === 0) {
                            navigate(`/playlist/${e.name}`)
                        } else {
                            setCurrSongs(item);
                            setSongPlaying({
                                song: item.songs[0],
                                index: 0
                            })
                            setShouldPlay(true)
                            addHistory(e.name, "playlist")
                        }
                    }
                })
            } else {
                if (e.name === "Liked Songs") {
                    setCurrSongs({
                        name: "Liked Songs",
                        songs: liked
                    });
                    setSongPlaying({
                        song: liked[0],
                        index: 0
                    })
                    setShouldPlay(true)
                } else {
                    let response = await fetch(`${backenduri}/api/songsdata/fetchdata/${e.name}`, { method: "Get" });
                    let allsongs = await response.json();
                    setCurrSongs(allsongs[0]);
                    setSongPlaying({
                        song: allsongs[0].songs[0],
                        index: 0
                    })
                    setShouldPlay(true)
                }

                addHistory(e.name, "album")
            }
        }
    }

    return (
        <div className="left-bottom w-full h-full lg:h-[calc(77%-8px)] bg-[#121212] lg:rounded-lg  overflow-auto scrollbar-none lg:scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            <div className="w-full lg:h-full lg:flex flex-col items-center justify-around relative">
                <div className="library text-[#b3b3b3] w-full flex items-end justify-between px-4 my-6 lg:my-0">
                    <div data-tooltip-target="tooltip-default" className="flex gap-5 lg:gap-3 items-center  font-bold">
                        <img data-tooltip-target="tooltip-default" className='size-7 lg:size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726670083/playlist_co3iu8.svg" alt="" />
                        <span className='text-3xl lg:text-base'>Your Library</span>
                    </div>
                    <Popover open={open} placement="bottom">
                        <PopoverHandler>
                            <div></div>
                        </PopoverHandler>
                        <PopoverContent className="w-52 z-50 relative">
                            <h6 className="mb-[2px] text-gray-800 text-lg font-bold">Create new Playlist</h6>
                            <div className="w-full h-[1px] bg-gray-500 mb-4"></div>
                            <h6 className="mb-[2px] text-gray-800 text-md font-bold">Playlist Name :</h6>
                            <form onSubmit={addPlaylist} action="">
                                <div className="flex gap-2 mt-2 mb-7">
                                    <input className="w-40 h-7 outline-none border-2 border-gray-500 rounded-lg px-2 mb-2" onChange={handleChange} value={newPlaylist} placeholder="name" type="text" minLength="3" required name="" id="" />
                                    <button type='submit' className="h-8 w-16 bg-gray-800  flex items-center justify-center text-white rounded-lg absolute bottom-2 left-4">Add</button>
                                </div>
                            </form>
                            <button onClick={() => setOpen(false)} className="h-8 w-16 bg-gray-800 flex items-center justify-center text-white rounded-lg absolute bottom-2 right-8">Cancel</button>
                        </PopoverContent>
                    </Popover>
                    <Tooltip content="Create playlist" className="hidden lg:block">
                        <div className="size-8 rounded-full flex justify-center items-center hover:bg-[#1f1f1f]">
                            <img onClick={addPlaylistClick} className='size-7 lg:size-5 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726674342/plus_dbbcew.png" alt="" />
                        </div>
                    </Tooltip>
                </div>
                {login ? (
                    <>
                        <div className="w-[95%] h-[0.3px] lg:h-[1px] bg-[#b3b3b3] mx-auto my-4 lg:my-0"></div>
                        <div className="w-full lg:h-[70%] lg:overflow-auto lg:scrollbar flex items-center flex-col">
                            <div onClick={() => { playlistRef.current.style.top = "-100%"; navigate("/album/Liked Songs") }} className="w-[95%] min-h-16  hover:bg-[#ffffff12]  rounded-md flex items-center px-2 gap-3 cursor-pointer relative group">
                                <img className='size-12 rounded-md group-hover:opacity-40' src="https://misc.scdn.co/liked-songs/liked-songs-64.png" alt="" />
                                <div className="name flex flex-col h-full justify-center">
                                    <span className={`font-medium text-base ${currSongs.name === "Liked Songs" ? "text-[#1ed760]" : "text-white"}`}>Liked Songs</span>
                                    <span className='text-[13px] text-[#b3b3b3]'>Playlist . Spotify</span>
                                </div>
                                <div onClick={(event) => handlePlayClick(event, { name: "Liked Songs" })} className={`${liked.length === 0 ? "hidden" : "block"}`}>
                                    {currSongs.name === "Liked Songs" && audio.current && !audio.current.paused ?
                                        <Tooltip content="Pause">
                                            <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726669883/pause_kxcoqo.png" className='size-6 hidden group-hover:block absolute top-5 left-5' alt="" />
                                        </Tooltip>
                                        :
                                        <Tooltip content="Play">
                                            <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726669854/play_zptvam.png" className='size-6 hidden group-hover:block absolute top-5 left-5' alt="" />
                                        </Tooltip>
                                    }
                                </div>
                                <img className={`size-4 absolute right-5 ${currSongs.name === "Liked Songs" && audio.current && !audio.current.paused ? "block" : "hidden "}`} src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="" />
                            </div>

                            {playlist2.toReversed().map((e, index) => {
                                return (
                                    <div onClick={() => { playlistRef.current.style.top = "-100%"; navigate(`/playlist/${e.name}`) }} key={index} className="w-[95%] min-h-16  hover:bg-[#1a1a1a]  rounded-md flex items-center justify-between px-2 cursor-pointer relative group">
                                        <div className="flex items-center gap-3">
                                            <img className='size-12 rounded-md group-hover:opacity-40' src={e.songs.length > 0 ? e.songs[0].image : "https://res.cloudinary.com/doswveiik/image/upload/v1726674060/playlist_emlxxe.png"} alt="" />
                                            <div className="name flex flex-col h-full justify-center">
                                                <span className={`font-medium text-base ${currSongs.name === e.name ? "text-[#1ed760]" : "text-white"}`}>{truncateLine(e.name, 20)}</span>
                                                <span className='text-[13px] text-[#b3b3b3]'>Playlist . {truncateLine(currUser.name, 14)}</span>
                                            </div>
                                        </div>
                                        <Tooltip content={`Delete ${e.name}`} className="hidden lg:block">
                                            <img onClick={(event) => handleDeletePlaylist2(event, e.name)} className={`size-7 lg:size-5 cursor-pointer absolute right-5 lg:hidden ${currSongs.name === e.name && audio.current && !audio.current.paused ? "hidden" : "group-hover:block"}`} src="https://res.cloudinary.com/doswveiik/image/upload/v1726674866/delete_gfsiny.png" alt="" />
                                        </Tooltip>
                                        <div onClick={(event) => handlePlayClick(event, { name: e.name, catagory: "playlist" })}>
                                            {currSongs.name === e.name && audio.current && !audio.current.paused ?
                                                <Tooltip content="Pause">
                                                    <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726669883/pause_kxcoqo.png" className='size-6 hidden group-hover:block absolute top-5 left-5' alt="" />
                                                </Tooltip>
                                                :
                                                <Tooltip content="Play">
                                                    <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726669854/play_zptvam.png" className='size-6 hidden group-hover:block absolute top-5 left-5' alt="" />
                                                </Tooltip>
                                            }
                                        </div>
                                        <img className={`size-4 absolute right-6 ${currSongs.name === e.name && audio.current && !audio.current.paused ? "block" : "hidden "}`} src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="" />
                                    </div>
                                )
                            })}


                            {playlist1.toReversed().map((e, index) => {
                                return (
                                    <div onClick={() => { playlistRef.current.style.top = "-100%"; navigate(`/album/${e}`) }} key={index} className="w-[95%] min-h-16  hover:bg-[#ffffff12]  rounded-md flex items-center justify-between px-2 cursor-pointer relative group">
                                        <div className="flex items-center gap-3">
                                            <img className='size-12 rounded-md group-hover:opacity-40' src={getImage(e)} alt="" />
                                            <div className="name flex flex-col h-full justify-center">
                                                <span className={`font-medium text-base ${currSongs.name === e ? "text-[#1ed760]" : "text-white"}`}>{truncateLine(e, 20)}</span>
                                                <span className='text-[13px] text-[#b3b3b3]'>{getDesc(e)}</span>
                                            </div>
                                        </div>
                                        <Tooltip content="Remove from Library">
                                            <img onClick={(event) => handleDeletePlaylist1(event, e)} className={`size-7 lg:size-5 cursor-pointer absolute right-5 lg:hidden ${currSongs.name === e && audio.current && !audio.current.paused ? "hidden" : "group-hover:block"}`} src="https://res.cloudinary.com/doswveiik/image/upload/v1726674866/delete_gfsiny.png" alt="" />
                                        </Tooltip>
                                        <div onClick={(event) => handlePlayClick(event, { name: e, catagory: "album" })}>
                                            {currSongs.name === e && audio.current && !audio.current.paused ?
                                                <Tooltip content="Pause">
                                                    <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726669883/pause_kxcoqo.png" className='size-6 hidden group-hover:block absolute top-5 left-5' alt="" />
                                                </Tooltip>
                                                :
                                                <Tooltip content="Play" animate={{
                                                    mount: { scale: 1, y: 0, transition: { delay: 0.7 } }, // 700 milliseconds delay
                                                    unmount: { scale: 0, y: 25 },
                                                }}>
                                                    <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726669854/play_zptvam.png" className='size-6 hidden group-hover:block absolute top-5 left-5' alt="" />
                                                </Tooltip>
                                            }
                                        </div>
                                        <img className={`size-4 absolute right-5 ${currSongs.name === e && audio.current && !audio.current.paused ? "block" : "hidden "}`} src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="" />
                                    </div>
                                )
                            })}

                            {login && playlist2.length === 0 && playlist1.length === 0 && (
                                <div onClick={() => setOpen(true)} className="w-[95%] h-[134px] bg-[#242424] rounded-lg p-4 mt-5">
                                    <p className='font-bold'>Create your first playlist</p>
                                    <p className='text-sm my-3'>It's easy, we'll heelp you</p>

                                    <div onClick={addPlaylistClick} className="w-32 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-[1.03] hover:bg-[#f6f6f6]">
                                        <span className='text-black text-sm font-bold'>Create playlist</span>
                                    </div>
                                </div>
                            )}


                        </div>
                    </>
                ) : (
                    <>
                        <Popover placement="right">
                            <PopoverHandler>
                                <div className="w-[100%] h-[134px] absolute top-16 -z-20">
                                    <div ref={popoverrr} className="w-[100%] h-[134px] "></div>
                                </div>
                            </PopoverHandler>
                            <PopoverContent>
                                <div className="w-80 h-[137px]">
                                    <div className="text-[#0074e0] text-xl font-bold">Create a playlist</div>
                                    <div className="text-[#0074e0] text-base font-bold my-4">Log in to create and share playlists.</div>
                                    <button onClick={() => navigate("/login")} className='w-[70px] h-8 text-white text-base bg-[#0074e0] rounded-full mt-3 hover:scale-[1.05]'>Log in</button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <div className="w-[95%] h-[134px] bg-[#242424] rounded-lg p-4">
                            <p className='font-bold'>Create your first playlist</p>
                            <p className='text-sm my-3'>It's easy, we'll heelp you</p>

                            <div onClick={addPlaylistClick} className="w-32 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-[1.03] hover:bg-[#f6f6f6]">
                                <span className='text-black text-sm font-bold'>Create playlist</span>
                            </div>
                        </div>

                        <div className="w-[90%] h-20  text-[#A7A7A7] text-[11px] font-semibold">
                            <div className="w-full flex flex-wrap">
                                <div className="h-7 mr-4 cursor-pointer"><Link target="_blank" href="https://www.spotify.com/in-en/legal/">Legal</Link></div>
                                <div className="h-7 mr-4 cursor-pointer"><Link target="_blank" href="https://www.spotify.com/in-en/safetyandprivacy/">Safety & Privacy Center</Link></div>
                                <div className="h-7 mr-4 cursor-pointer"><Link target="_blank" href="https://www.spotify.com/in-en/legal/privacy-policy/">Privacy Policy</Link></div>
                                <div className="h-7 mr-4 cursor-pointer"><Link target="_blank" href="https://www.spotify.com/in-en/legal/cookies-policy/">Cookies</Link></div>
                                <div className="h-7 mr-4 cursor-pointer"><Link target="_blank" href="https://www.spotify.com/in-en/legal/privacy-policy/#s3">About Ads</Link></div>
                                <div className="h-7 mr-4 cursor-pointer"><Link target="_blank" href="https://www.spotify.com/in-en/accessibility">Accessibility</Link></div>
                            </div>
                            <div className="h-7 mr-4 text-xs"><Link target="_blank" href="https://www.spotify.com/in-en/legal/cookies-policy/">Cookies</Link></div>
                        </div>
                        <div className="w-[90%] h-8 my-3">
                            <div className="h-full w-24 border border-[#A7A7A7] rounded-full flex items-center justify-center hover:scale-[1.03] cursor-pointer">
                                <img className='size-5 mr-1' src="https://res.cloudinary.com/doswveiik/image/upload/v1726674666/earth_tfxiz6.png" alt="" />
                                <span className='text-sm font-bold'>English</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
