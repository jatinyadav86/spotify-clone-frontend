import React, { useContext, useEffect, useRef, useState } from 'react'
import { Footer } from './Footer'
import { useNavigate } from 'react-router-dom'
const backenduri = import.meta.env.VITE_BACKEND_URI;
import songContext from '../context/context'
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Tooltip,
  Button,
  Input,
  Typography
} from "@material-tailwind/react";
import {getImage} from '../utils/getImage'
import {getGreeting} from '../utils/getGreeting'

export const Content = () => {

  const { login, setLogin, shouldPlay, setLoading, setShouldPlay, allGenre, history, restriction, childRef, restrictionColor, truncateLine, currUser, setCurrSongs, audio, songPlaying, setSongPlaying, currSongs, setCurrUser, liked, addHistory, playlist2, logout, icon, getSongs, allSongs, } = useContext(songContext)

  const navigate = useNavigate()

  // handlePlayClick for history items
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
            setCurrSongs(item);
            setSongPlaying({
              song: item.songs[0],
              index: 0
            })
          }
        })
        addHistory(e.name, "playlist")
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

  const handleHistoryClick = (e) => {
    setLoading(true)
    if (e.catagory === "album") {
      navigate(`/album/${e.name}`)
    } else {
      navigate(`/playlist/${e.name}`)
    }
  }

  return (
    <>
      {/* albums and playlists */}
      <div className={`w-full h-full ${!login && "pt-20"} bg-[#121212] lg:rounded-lg overflow-auto scrollbar-none lg:scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent`}>
        {login && (
          <>
            {/* top portion of website for small devices */}
            <div className="gap-4 w-full h-[72px] bg-[#121212] flex items-center justify-between px-2 lg:hidden">
              <p className='text-2xl font-bold'>{getGreeting()}</p>
              <Popover placement="bottom-start">
                <PopoverHandler>
                  <img className='size-6 mr-2' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663255/setting_hhlikr.svg" alt="" />
                </PopoverHandler>
                <PopoverContent>
                  <div className="w-24 h-16 flex flex-col justify-center items-center">
                    <div className="text-sm font-bold mt-3">{currUser.name}</div>
                    <button onClick={logout} className='w-[80px] h-8 text-white text-base bg-[#19e68c] font-bold rounded-full mt-3 hover:scale-[1.05] outline-none'>Log out</button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {/* recently played albums and playlists */}
            <div className="hidden recently-played w-(calc(100%-23px)) mt-20 mx-[9px] lg:flex flex-wrap ">
              {history.toReversed().map((e, index) => {
                return (
                  <div onClick={() => handleHistoryClick(e)} key={index} className="item min-w-[calc((100%-40px)/4)] h-12 rounded-sm bg-[#282828] hover:bg-[#424242] cursor-pointer flex items-center gap-2 text-sm mx-[5px] my-[5px] relative group">
                    {e.name == "Liked Songs" ?
                      <img className='size-12 rounded-sm' src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="" /> :
                      <img className='size-12 rounded-sm' src={getImage(e,allGenre,playlist2)} alt="" />
                    }
                    <span>{truncateLine(e.name, 14)}</span>
                    <img className={`size-4 group-hover:hidden absolute  right-5 ${currSongs.name === e.name && audio.current && !audio.current.paused ? "block" : "hidden "}`} src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="" />
                    <button onClick={(event) => handlePlayClick(event, e)} className="size-8 hidden opacity-0 group-hover:opacity-100 bg-[#1ed760] rounded-full group-hover:flex justify-center items-center absolute right-3 transition-all duration-300 hover:scale-[1.07]">
                      {currSongs.name === e.name && audio.current && !audio.current.paused ?
                        <Tooltip content="Pause">
                          <img className='size-5' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663321/pause-black_qxfyag.png" alt="" />
                        </Tooltip>
                        :
                        <Tooltip content="Play" animate={{
                          mount: { scale: 1, y: 0, transition: { delay: 0.7 } }, // 700 milliseconds delay
                          unmount: { scale: 0, y: 25 },
                        }}>
                          <img className='size-5' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663358/play-black_wmnt5a.png" alt="" />
                        </Tooltip>
                      }
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="card-section w-full flex my-1 gap-3 py-2 overflow-auto pl-3 lg:hidden scrollbar-none lg:scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {history.toReversed().map((e, index) => {
                return (<div onClick={() => handleHistoryClick(e)} key={index} className="card group h-56 lg:h-[253px] min-w-[179px] max-w-[179px] rounded-lg hover:bg-[#191919] p-[11px] overflow-hidden relative cursor-pointer">
                  <div className="size-[157px] flex justify-center items-center">
                    {e.name == "Liked Songs" ?
                      <img className='h-full w-full object-cover' src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="" /> :
                      <img className='h-full w-full object-cover' src={getImage(e,allGenre,playlist2)} alt="" />
                    }
                  </div>
                  <div className="title text-lg my-1">{truncateLine(e.name, 14)}</div>
                </div>)
              })}
            </div>
          </>
        )}
        {/* All albums and playlists */}
        {allGenre.map((e, index) => {
          return <SongSection key={index} genre={e} />
        })}
          <Footer login={login} />
      </div>
    </>
  )
}

function SongSection({ genre }) {

  const { login, allGenre, shouldPlay, setLoading, setShouldPlay, restriction, childRef, restrictionColor, audio, songPlaying, setSongPlaying, currSongs, setCurrSongs, addHistory, icon, getSongs, allSongs, setAllSongs, truncateLine } = useContext(songContext)

  const navigate = useNavigate()

  const handleClick = (album) => {
    setLoading(true)
    navigate(`/album/${album.name}`)
  }

  // handlePlayClick for albums
  const handlePlayClick = async (event, album) => {
    event.stopPropagation()
    if (!login) {
      restriction.current.style.display = "flex";
      restriction.current.style.opacity = 1;
      allGenre.some(category => {
        return category.playlists.some(playlist => {
          if (playlist.name === album.name) {
            restrictionColor.current.style.backgroundColor = playlist.color;
            childRef.current.src = playlist.image
            return true;
          }
          return false;
        });
      });
    } else {
      if (currSongs.name === album.name) {
        if (audio.current.paused) {
          audio.current.play()
        }
        else {
          audio.current.pause()
        }
      } else {
        let response = await fetch(`${backenduri}/api/songsdata/fetchdata/${album.name}`, { method: "Get" });
        let allsongs = await response.json();
        setCurrSongs(allsongs[0]);
        setShouldPlay(true)
        setSongPlaying({
          song: allsongs[0].songs[0],
          index: 0
        })
        addHistory(album.name, "album")
      }
    }
  }

  return (
    <div className="w-full lg:my-12 lg:px-4">
      <span className='text-[23px] font-bold lg:hover:underline pl-3 lg:pl-0'>{genre.catagory}</span>
      <div className="card-section w-full flex my-1 gap-3 py-2  overflow-auto pl-3 lg:pl-0 scrollbar-none lg:scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {genre.playlists.map((album, index) => {
          return (<div onClick={() => handleClick(album)} key={index} className="card group h-56 lg:h-[253px] min-w-[179px] max-w-[179px] rounded-lg hover:bg-[#191919] p-[11px] overflow-hidden relative cursor-pointer">
            <div className="size-[157px] flex justify-center items-center">
              <img className={`h-full w-full object-cover ${genre.catagory === "Popular artists" ? "rounded-lg lg:rounded-full" : "rounded-lg"}`} src={album.image} alt="" />
            </div>
            <div className={`title text-lg ${genre.catagory === "Popular artists" ? "w-full lg:text-center my-3" : "my-1"}`}>{truncateLine(album.name, 14)}</div>
            {genre.catagory != "Popular artists" &&
              (<div className="desc w-full text-[#b3b3b3] text-sm hidden lg:block">{truncateLine(album.desc, 40)}</div>)
            }
            <button onClick={(event) => handlePlayClick(event, album)} className={`size-12 hidden lg:flex ${currSongs.name === album.name && audio.current && !audio.current.paused ? "opacity-100 top-28" : "top-36 opacity-0"} group-hover:opacity-100 group-hover:top-28 bg-[#1ed760] rounded-full justify-center items-center absolute  right-5 transition-all duration-300 hover:scale-[1.07]`}>
              {currSongs.name === album.name && audio.current && !audio.current.paused ?
                <Tooltip content="Pause">
                  <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663321/pause-black_qxfyag.png" alt="" />
                </Tooltip>
                :
                <Tooltip content={`Play ${album.name}`} animate={{
                  mount: { scale: 1, y: 0, transition: { delay: 0.7 } }, // 700 milliseconds delay
                  unmount: { scale: 0, y: 25 },
                }}>
                  <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663358/play-black_wmnt5a.png" alt="" />
                </Tooltip>
              }
            </button>
          </div>)
        })}
      </div>
    </div >
  )
}
