import React, { useContext, useEffect, useRef, useState } from 'react'
import { Footer } from './Footer'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import songContext from '../context/context'
import { Tooltip } from "@material-tailwind/react";
import Loading from './Loading';
const backenduri = import.meta.env.VITE_BACKEND_URI;

export const PlaylistsMain = () => {
    const location = useLocation();
    const addPlaylistModal = useRef();

    const [currAlbum, setCurrAlbum] = useState({
        name: "",
        desc: "",
        image: "",
        color: "#e05068"
    })
    const [durations, setDurations] = useState([]);
    const [markedPlaylists, setMarkedPlaylists] = useState([]);
    const [addToPlaylistSong, setAddToPlaylistSong] = useState({})

    const { name } = useParams()
    const { login, setShouldPlay, allGenre, getSongs, allSongs, setAllSongs, setCurrSongs, restriction, childRef, truncateLine, restrictionColor, audio, songPlaying, setSongPlaying, history, setHistory, addHistory, liked, addLikedSong, addPlaylist1, playlist1, playlist2, setPlaylist2, currUser, getPlaylistsDetail } = useContext(songContext)

    const navigate = useNavigate()

    useEffect(() => {
        const arr = location.pathname.split("/")
        if (arr.includes("album")) {
            if (name != "Liked Songs") {
                getSongs(name);
            }
        } else {
            if (history.length === 0) {
                getPlaylistsDetail();
            }
        }
    }, [name])

    useEffect(() => {
        if (location.pathname.split("/").includes("playlist")) {
            playlist2.some(playlist => {
                if (playlist.name == name) {
                    setAllSongs({ name: playlist.name, songs: playlist.songs })
                    setCurrAlbum({
                        name: playlist.name,
                        desc: currUser.name,
                        image: `${playlist.songs.length > 0 ? playlist.songs[0].image : "https://res.cloudinary.com/doswveiik/image/upload/v1726674060/playlist_emlxxe.png"}`,
                        color: "#535353"
                    })
                    return true;
                }
                return false
            });
        }

        playlist2.forEach(async (item) => {
            if (item.songs.length === 0) {
                if (history.filter(value => value.name == item.name).length > 0) {

                    const token = localStorage.getItem('token')
                    let newHistory = history.filter(value => value.name !== item.name)
                    setHistory(newHistory)

                    const response = await fetch(`${backenduri}/api/data/updateData`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": token
                        },
                        body: JSON.stringify({ historyItem: newHistory })
                    });
                    const json = await response.json()
                }
            }
        })

    }, [playlist2,name])

    useEffect(() => {
        if (name == "Liked Songs") {
            setAllSongs({ name: "Liked Songs", songs: liked })
        }
    }, [liked,name])

    useEffect(() => {
        if (name != "Liked Songs") {
            getCurrAlbum()
        } else {
            setCurrAlbum({
                name: "Liked Songs",
                desc: "kumar Yadav",
                image: "https://misc.scdn.co/liked-songs/liked-songs-300.png",
                color: "#5038a0"
            })
        }
    }, [allGenre, name])

    const getCurrAlbum = async () => {
        await allGenre.some(category => {
            return category.playlists.some(playlist => {
                if (playlist.name === name) {
                    setCurrAlbum(playlist);
                    return true;
                }
                return false;
            });
        });
    }

    const handleClick = async (song, index) => {
        if (!login) {
            restriction.current.style.display = "flex";
            restriction.current.style.opacity = 1;
            restrictionColor.current.style.backgroundColor = song.color;
            childRef.current.src = song.image
        } else {
            setSongPlaying({
                song: song,
                index: index
            })
            setCurrSongs(allSongs)
            setShouldPlay(true)
            if (location.pathname.split("/").includes("playlist")) {
                addHistory(currAlbum.name, "playlist")
            } else {
                addHistory(currAlbum.name, "album")
            }
        }
    }

    const playClick = async () => {

        if (!login) {
            restriction.current.style.display = "flex";
            restriction.current.style.opacity = 1;
            restrictionColor.current.style.backgroundColor = currAlbum.color;
            childRef.current.src = currAlbum.image
        } else {
            if (allSongs.songs.filter(value => value.songName == songPlaying.song.songName).length > 0) {
                if (audio.current.paused) {
                    audio.current.play()
                }
                else {
                    audio.current.pause()
                }
            } else {
                if (allSongs.songs.length === 0) {
                    alert(`The Playlist is empty`)
                } else {
                    setSongPlaying({
                        song: allSongs.songs[0],
                        index: 0
                    })
                    setCurrSongs(allSongs)
                    setShouldPlay(true)
                    if (location.pathname.split("/").includes("playlist")) {
                        addHistory(currAlbum.name, "playlist")
                    } else {
                        addHistory(currAlbum.name, "album")
                    }
                }
            }
        }
    }

    const addToLibrary = () => {
        if (!login) {
            restriction.current.style.display = "flex";
            restriction.current.style.opacity = 1;
            restrictionColor.current.style.backgroundColor = currAlbum.color;
            childRef.current.src = currAlbum.image
        } else {
            addPlaylist1(currAlbum.name)
        }
    }

    const addToLiked = (event, song) => {
        if(!login){
            restriction.current.style.display = "flex";
            restriction.current.style.opacity = 1;
            restrictionColor.current.style.backgroundColor = currAlbum.color;
            childRef.current.src = currAlbum.image
        }else{
            event.stopPropagation()
            addLikedSong(song)
        }
    }

    const handlePause = (e) => {
        e.stopPropagation();
        audio.current.pause()
    }

    const handlePlay = (e) => {
        if(login){
            audio.current.play() 
        }
    }

    const checkInPlaylist = (song) => {
        return playlist2.some(item => {
            return item.songs.some((songDetail) => {
                if (songDetail.songName === song.songName) {
                    return (true);
                }
                return false;
            });
        })
    }

    const addToPlaylist = async (e, song) => {
        if (!login) {
            restriction.current.style.display = "flex";
            restriction.current.style.opacity = 1;
            restrictionColor.current.style.backgroundColor = currAlbum.color;
            childRef.current.src = currAlbum.image
        } else {
            e.stopPropagation();
            addPlaylistModal.current.style.right = "16px"
            let newArray = []
            await playlist2.forEach(item => {
                item.songs.some((songDetail) => {
                    if (songDetail.songName === song.songName) {
                        newArray = [...newArray, item.name]
                        return (true);
                    }
                    return false;
                });
            });
            setMarkedPlaylists(newArray)
            setAddToPlaylistSong(song)
        }
    }

    const handleCheck = (name) => {
        if (markedPlaylists.includes(name)) {
            setMarkedPlaylists(markedPlaylists.filter(playlist => playlist != name))
        } else {
            setMarkedPlaylists([...markedPlaylists, name])
        }
    }

    const addSongToPlaylists = async () => {
        let newPlaylist2 = playlist2.map((playlist) => {
            let updatedSongs = playlist.songs.filter(value => value.songName !== addToPlaylistSong.songName);

            if (markedPlaylists.includes(playlist.name)) {
                updatedSongs.push(addToPlaylistSong);
            }

            return {
                ...playlist,
                songs: updatedSongs
            };
        });

        setPlaylist2(newPlaylist2);

        setAddToPlaylistSong({});

        // Hide the modal
        addPlaylistModal.current.style.right = "-384px";

        // Update the backend
        const token = localStorage.getItem('token');
        const response = await fetch(`${backenduri}/api/data/updateData`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({ playlist2Item: newPlaylist2 })
        });
        const json = await response.json();
    };

    useEffect(() => {
        const getDuration = async () => {
            await allSongs.songs.forEach((song, index) => {
                getAudioDuration(song.url)
                    .then(duration => {

                        setDurations(prevDurations => {
                            const newDurations = [...prevDurations];
                            newDurations[index] = duration;
                            return newDurations;
                        });
                    })
                    .catch(error => {
                        console.error(error)
                    });
            });
        }

        getDuration()

    }, [allSongs])

    return (
        <>
            <Loading />
            <div className="w-full h-full overflow-auto relative lg:rounded-lg scrollbar-none lg:scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                <div style={{ backgroundImage: `linear-gradient(${currAlbum.color}, transparent)` }} className="background w-full h-[33rem] lg:rounded-lg -z-10 absolute top-0 bg-gradient-to-b"></div>
                {login &&
                    <img onClick={() => navigate(-1)} className='absolute z-10 top-4 left-4 lg:hidden' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664093/backward_nzvsoa.svg" alt="" />
                }
                <div className="top w-full h-[380px] lg:h-[250px]  lg:pb-4 relative">
                    <div className="w-full h-auto lg:h-32 flex flex-col lg:flex-row items-center justify-end lg:justify-start px-4 gap-4 absolute top-16 lg:top-auto lg:bottom-4">
                        <img className='size-[166px] lg:size-32 rounded-[4px] object-cover' src={currAlbum.image} alt="" />
                        <div className="h-full w-full flex flex-col justify-between items-start">
                            {location.pathname.split("/").includes("playlist") || location.pathname.split("/").includes("Liked%20Songs") ?
                                <span className='text-sm font-semibold hidden lg:block'>Playlist</span>
                                :
                                <span className='text-sm font-semibold hidden lg:block'>Album</span>
                            }
                            <p className='text-[32px] lg:text-6xl font-bold line leading-9'>{currAlbum.name}</p>
                            <p className='text-sm  font-semibold my-5 lg:my-0 flex flex-col lg:flex-row gap-2 lg:gap-0'><span>{currAlbum.desc}</span> <span className="hidden lg:block">&nbsp;.&nbsp;{allSongs.songs.length} songs</span> </p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto bg-gradient-to-b from-[#1212124d] from-10% to-[#121212] pb-3">
                    <div className="w-full h-[88px]  p-4 flex flex-row-reverse lg:flex-row justify-between lg:justify-normal items-center gap-5">
                        <div onClick={playClick} className="size-14 flex justify-center items-center bg-[#1ED760] rounded-full hover:scale-[1.05] cursor-pointer">
                            {allSongs.songs.filter(value => value.songName == songPlaying.song.songName).length > 0 && audio.current && !audio.current.paused ?
                                <Tooltip content="Pause" className="hidden lg:block">
                                    <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663321/pause-black_qxfyag.png" alt="" />
                                </Tooltip>
                                :
                                <Tooltip content="Play" className="hidden lg:block">
                                    <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663358/play-black_wmnt5a.png" alt="" />
                                </Tooltip>
                            }
                        </div>


                        <div className={`${location.pathname.split("/").includes("playlist") || location.pathname.split("/").includes("Liked%20Songs") ? "hidden" : "block"}`}>
                            {playlist1.filter(value => value == currAlbum.name).length > 0 ?
                                <Tooltip content="Remove from your Library" className="hidden lg:block">
                                    <img onClick={addToLibrary} className='size-8 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726673446/tick_h9fvww.png" alt="" />
                                </Tooltip>
                                :
                                <Tooltip content="Save to your Library" className="hidden lg:block">
                                    <svg onClick={addToLibrary} className='size-8 fill-[#a7a7a7] cursor-pointer hover:fill-[white] hover:scale-[1.03]' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z" />
                                        <path d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z" />
                                    </svg>
                                </Tooltip>
                            }
                        </div>


                    </div>
                    <div className="middle w-full">
                        {allSongs.songs.length !== 0 &&
                            <>
                                <div className="w-full text-[#A7A7A7] px-8 items-center hidden lg:flex my-5 relative">
                                    <span className='text-lg font-bold w-[4%] absolute left-[3%]'>#</span>
                                    <span className='text-sm font-semibold absolute left-[7%]'>Title</span>
                                    <div className="w-6 absolute right-[3%]">
                                        <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726673504/time_vtyeeq.svg" alt="" />
                                    </div>
                                </div>
                                <div className="line hidden lg:block w-[97%] h-[1px] mx-auto mt-1 mb-2 bg-[#ffffff1a]"></div>
                            </>
                        }
                        <div className="song-list w-full min-h-[calc(100vh-660px)]">
                            {allSongs.songs.length === 0 ?
                                <div className="w-full h-36 flex justify-center items-center">
                                    <h4 className='text-xl'>This Playlist is empty !</h4>
                                </div>
                                :
                                allSongs.songs.map((song, index) => {
                                    return (
                                        <div onClick={() => handleClick(song, index)} key={index} className="song group h-16 lg:h-14 w-full lg:w-[98%] px-4 lg:px-5 rounded-lg mx-auto flex items-center lg:hover:bg-[#ffffff12] relative">
                                            <div className="w-5 absolute left-[2%] hidden lg:block">
                                                <span className={`text-lg block font-semibold group-hover:hidden ${songPlaying.song.songName == song.songName ? "text-[#1ed760]" : "text-white"} ${songPlaying.song.songName == song.songName && audio.current && !audio.current.paused ? "lg:hidden" : ""}`}>{index + 1}</span>
                                                <img className={`size-4 group-hover:hidden ${songPlaying.song.songName == song.songName && audio.current && !audio.current.paused ? "lg:block" : "hidden"}`} src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="" />
                                                {songPlaying.song.songName == song.songName && audio.current && !audio.current.paused ?
                                                    <Tooltip content="Pause" className="hidden lg:block">
                                                        <img onClick={(e) => handlePause(e)} className={`hidden size-4 group-hover:block cursor-pointer`} src="https://res.cloudinary.com/doswveiik/image/upload/v1726669883/pause_kxcoqo.png" alt="" />
                                                    </Tooltip>
                                                    :
                                                    <Tooltip content={`Play ${song.songName}`} className="hidden lg:block">
                                                        <img onClick={(e) => handlePlay(e)} className={`hidden size-4 group-hover:block cursor-pointer`} src="https://res.cloudinary.com/doswveiik/image/upload/v1726669854/play_zptvam.png" alt="" />
                                                    </Tooltip>
                                                }
                                            </div>
                                            <div className="name w-[85%] flex items-center gap-3 absolute left-[6%]">
                                                <img className='size-12 lg:size-10 rounded-md' src={song.image} alt="" />
                                                <div>
                                                    <span className={`${songPlaying.song.songName == song.songName ? "text-[#1ed760]" : "text-white"} lg:hidden`}>{truncateLine(song.songName, 20)}</span>
                                                    <span className={`${songPlaying.song.songName == song.songName ? "text-[#1ed760]" : "text-white"} hidden lg:block`}>{song.songName}</span>
                                                    <p className='text-sm text-[#A7A7A7] lg:hidden'>{truncateLine(song.desc, 25)}</p>
                                                    <p className='text-sm text-[#A7A7A7] hidden lg:block'>{song.desc}</p>
                                                </div>
                                            </div>

                                            <Tooltip content="Add to Playlist" className="hidden lg:block">
                                                {checkInPlaylist(song) ?
                                                    <img onClick={(e) => addToPlaylist(e, song)} className='size-5 mx-6 lg:hover:scale-[1.1] absolute right-[10%] lg:right-[12%] cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726673446/tick_h9fvww.png" alt="" />
                                                    :
                                                    <img onClick={(e) => addToPlaylist(e, song)} className='size-5 mx-6 lg:hidden lg:group-hover:block lg:hover:scale-[1.1] absolute right-[10%] lg:right-[12%] cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726662485/addtoplaylist_yqkhi0.png" alt="" />
                                                }
                                            </Tooltip>

                                            {liked.filter(value => value.songName == song.songName).length > 0 ?
                                                <Tooltip content="Remove fron Liked Songs" className="hidden lg:block">
                                                    <img onClick={(event) => addToLiked(event, song)} className='size-5 mx-6 lg:hidden lg:group-hover:block lg:hover:scale-[1.1] absolute right-0 lg:right-[7%] cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669526/heart-green_a4rwbz.png" alt="" />
                                                </Tooltip>
                                                :
                                                <Tooltip content="Add to Liked Songs" className="hidden lg:block">
                                                    <img onClick={(event) => addToLiked(event, song)} className='size-5 mx-6 lg:hidden lg:group-hover:block lg:hover:scale-[1.1] absolute right-0 lg:right-[7%] cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669454/heart_ue1t0a.png" alt="" />
                                                </Tooltip>
                                            }
                                            <span className='text-sm hidden lg:block text-[#A7A7A7] font-medium absolute right-[3%]'>{Math.floor(durations[index] / 60) || 0}:{Math.floor(durations[index] % 60) || 0}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer login={login} />
            </div>
            <div ref={addPlaylistModal} className="w-72 h-96 rounded-lg bg-[#1f1f1f] absolute bottom-3 -right-96 z-40">
                <div className="w-full h-10 flex justify-center items-center my-3">
                    <h4 className='text-xl'>Add to playlist</h4>
                </div>
                <div className="w-[90%] h-[1px] mx-auto mt-1 mb-2 bg-[#ffffff1a]"></div>
                <div className="w-full h-64">
                    {playlist2.map((playlist) => {
                        return (
                            <div key={playlist2.indexOf(playlist)} className="w-full h-14 px-5 flex items-center justify-between">
                                <div className='flex gap-3 items-center'>
                                    {playlist.songs.length == 0 ?
                                        <div className="size-9 rounded-sm flex justify-center items-center bg-[#282828]">
                                            <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726673769/music_yrxrwo.svg" alt="" />
                                        </div>
                                        :
                                        <img className='size-9 rounded-sm' src={playlist.songs[0].image} alt="" />
                                    }
                                    <h5 className='text-lg'>{truncateLine(playlist.name,14)}</h5>
                                </div>
                                <div onClick={() => handleCheck(playlist.name)}>
                                    {markedPlaylists.includes(playlist.name) ?
                                        <img className='size-4 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726673446/tick_h9fvww.png" alt="" />
                                        :
                                        <img className='size-4 cursor-pointer' src="https://res.cloudinary.com/doswveiik/image/upload/v1726673832/circle_d25g0l.png" alt="" />
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="h-14 w-full bg-[#313131] p-5 flex items-center justify-end rounded-b-lg gap-3">
                    <button onClick={() => addPlaylistModal.current.style.right = "-384px"}>Cancel</button>
                    <button onClick={addSongToPlaylists} className='w-16 h-8 bg-white text-black text-sm font-bold rounded-full'>Done</button>
                </div>
            </div>
        </>
    )
}

function getAudioDuration(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio(url);

        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
    });
}


