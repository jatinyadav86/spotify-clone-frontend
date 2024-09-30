import React, { useEffect, useRef, useState } from 'react'
import songContext from './context'
const backenduri = import.meta.env.VITE_BACKEND_URI;

const SongState = (props) => {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false)
  const [allGenre, setAllGenre] = useState([]);
  const [allSongs, setAllSongs] = useState({
    name: "",
    songs: [{
      songName: "",
      desc: "",
      image: "",
      color: "#535353",
      url: ""
    }]
  })
  const [currSongs, setCurrSongs] = useState({
    name: "",
    songs: [{
      songName: "",
      desc: "",
      image: "",
      color: "#535353",
      url: ""
    }]
  })
  const [currUser, setCurrUser] = useState({})
  const [shouldPlay, setShouldPlay] = useState(false);
  const [history, setHistory] = useState([])
  const [liked, setLiked] = useState([])
  const [playlist1, setPlaylist1] = useState([])
  const [playlist2, setPlaylist2] = useState([])
  const [songPlaying, setSongPlaying] = useState({
    song: {
      songName: "",
      desc: "",
      image: "",
      color: "#535353",
      url: ""
    },
    index: 0
  })
  const [time, setTime] = useState({
    currentTime: {
      sec: 0,
      min: 0
    },
    totalTime: {
      sec: 0,
      min: 0
    }
  })

  const restriction = useRef(null)
  const getApp = useRef(null)
  const childRef = useRef(null)
  const seekbarSmall = useRef()
  const seekbarPlayerSmall = useRef()
  const playerRef = useRef(null)
  const restrictionColor = useRef(null)
  const icon = useRef(null)
  const audio = useRef(null)
  const playRef = useRef(null);
  const playlistRef = useRef(null);


  const getGenres = async () => {
    let response = await fetch(`${backenduri}/api/appdata/fetchdata`, { method: "Get" });
    let genre = await response.json();
    setAllGenre(genre);
  }

  const getSongs = async (name) => {
    let response = await fetch(`${backenduri}/api/songsdata/fetchdata/${name}`, { method: "Get" });
    let songs = await response.json();
    setAllSongs(songs[0]);
  }

  const getUserDetail = async () => {
    const token = localStorage.getItem('token')
    let response = await fetch(`${backenduri}/api/auth/getuser`, {
      method: "Get",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    })

    let user = await response.json();
    setCurrUser(user)
  }

  const getPlaylistsDetail = async () => {
    const token = localStorage.getItem('token')
    let response = await fetch(`${backenduri}/api/data/fetchdata`, {
      method: "Get",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    })
    let detail = await response.json();
    setHistory(detail.history)
    setLiked(detail.liked)
    setPlaylist1(detail.playlists1)
    setPlaylist2(detail.playlists2)

    const hist = detail.history
    const play2 = detail.playlists2
    const liked = detail.liked

    if (hist.length > 0) {
      if (hist[hist.length - 1]?.catagory === "playlist") {
        play2.forEach((item) => {
          if (item.name === hist[hist.length - 1].name) {
            setCurrSongs(item);
            setSongPlaying({
              song: item.songs[0],
              index: 0
            })
          }
        })
      } else if (hist[hist.length - 1]?.catagory === "album" && hist[hist.length - 1]?.name === "Liked Songs") {
        setCurrSongs({
          name: "Liked Songs",
          songs: liked
        });
        setSongPlaying({
          song: liked[0],
          index: 0
        })
      } else {
        let response2 = await fetch(`${backenduri}/api/songsdata/fetchdata/${hist[hist.length - 1]?.name}`, { method: "Get" });
        let allsongs = await response2.json();
        setCurrSongs(allsongs[0]);
        setSongPlaying({
          song: allsongs[0].songs[0],
          index: 0
        })
      }
    } else {
      setSongPlaying({
        song: {
          songName: "",
          desc: "",
          image: "https://res.cloudinary.com/doswveiik/image/upload/v1726675329/blank_bnrmyy.png",
          color: "",
          url: ""
        },
        index: 0
      })
    }
  }

  function truncateLine(line, number) {
    if (line?.length > number) {
      return line.substring(0, number) + '...';
    } else {
      return line;
    }
  }

  const addHistory = async (name, catagory) => {
    const token = localStorage.getItem('token')
    let newHistory
    if (history.filter(value => value.name === name).length > 0) {
      newHistory = history.filter((item) => {
        return item.name !== name
      })
      newHistory.push({ name, catagory })
      if (newHistory.length > 8) {
        newHistory.shift()
      }
      setHistory(newHistory)
    } else {
      newHistory = history
      newHistory.push({ name, catagory })
      if (newHistory.length > 8) {
        newHistory.shift()
      }
      setHistory(newHistory)
    }

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

  const addLikedSong = async (song) => {
    const token = localStorage.getItem('token')
    let newLiked
    if (liked.filter(value => value.songName == song.songName).length > 0) {
      newLiked = liked.filter((item) => {
        return item.songName !== song.songName
      })
      setLiked(newLiked)
    } else {
      newLiked = [...liked]
      newLiked.push(song)
      setLiked(newLiked)
    }

    const response = await fetch(`${backenduri}/api/data/updateData`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ likedItem: newLiked })
    });
    const json = await response.json()
  }

  const addPlaylist1 = async (name) => {
    const token = localStorage.getItem('token')
    let newPlaylist
    if (playlist1.includes(name)) {
      newPlaylist = playlist1.filter((item) => {
        return item !== name
      })
      setPlaylist1(newPlaylist)
    } else {
      newPlaylist = [...playlist1]
      newPlaylist.push(name)
      setPlaylist1(newPlaylist)
    }

    const response = await fetch(`${backenduri}/api/data/updateData`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ playlist1Item: newPlaylist })
    });
    const json = await response.json()
  }

  const deletePlaylist1 = async (name) => {
    const token = localStorage.getItem('token')
    let newPlaylist = playlist1.filter((item) => {
      return item !== name
    })
    setPlaylist1(newPlaylist)

    const response = await fetch(`${backenduri}/api/data/updateData`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ playlist1Item: newPlaylist })
    });
    const json = await response.json()
  }

  const addPlaylist2 = async (name) => {
    let newPlaylist = [...playlist2]
    newPlaylist.push({
      name,
      songs: []
    })
    setPlaylist2(newPlaylist)

    const token = localStorage.getItem('token')
    const response = await fetch(`${backenduri}/api/data/updateData`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ playlist2Item: newPlaylist })
    });
    const json = await response.json()
  }

  const deletePlaylist2 = async (name) => {
    let newPlaylist = playlist2.filter((item) => {
      return item.name !== name
    })
    setPlaylist2(newPlaylist)

    let newHistory = history.filter((item) => {
      return item.name !== name
    })
    setHistory(newHistory)

    const token = localStorage.getItem('token')
    const response = await fetch(`${backenduri}/api/data/updateData`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ playlist2Item: newPlaylist, historyItem: newHistory })
    });
    const json = await response.json()
  }

  const previousClick = async () => {
    if (history.length !== 0) {
      if (songPlaying.index > 0) {
        setSongPlaying({
          song: currSongs.songs[songPlaying.index - 1],
          index: songPlaying.index - 1
        })
      } else {
        setSongPlaying({
          song: currSongs.songs[currSongs.songs.length - 1],
          index: currSongs.songs.length - 1
        })
      }
      setShouldPlay(true)
    }
  }

  const nextClick = async () => {
    if (history.length !== 0) {
      if (currSongs.songs.length > songPlaying.index + 1) {
        setSongPlaying({
          song: currSongs.songs[songPlaying.index + 1],
          index: songPlaying.index + 1
        })
      } else {
        setSongPlaying({
          song: currSongs.songs[0],
          index: 0
        })
      }
      setShouldPlay(true)
    }
  }

  const handleReplayState = async () => {
    setCurrUser(prevUser => ({
      ...prevUser,               // Spread the previous state to keep all other fields the same
      isReplay: !prevUser.isReplay // Toggle the isReplay field
    }));

    const token = localStorage.getItem('token')

    const response = await fetch(`${backenduri}/api/auth/updateuser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ isReplay: !currUser.isReplay })
    });
    const json = await response.json()

    if (!json.success) {
      setCurrUser(prevUser => ({
        ...prevUser,               // Spread the previous state to keep all other fields the same
        isReplay: !prevUser.isReplay // Toggle the isReplay field
      }));
    }

  }

  const logout = () => {
    localStorage.setItem("token", "")
    audio.current.pause()
    setLogin(false)
    setCurrSongs({
      name: "",
      songs: [{
        songName: "",
        desc: "",
        image: "",
        color: "#535353",
        url: ""
      }]
    })
    setCurrUser({})
    setSongPlaying({
      song: {
        songName: "",
        desc: "",
        image: "",
        color: "#535353",
        url: ""
      },
      index: 0
    })
  }

  return (
    <songContext.Provider value={{
      login, setLogin,
      loading, setLoading,
      allGenre, setAllGenre,
      getGenres,
      getSongs,
      getUserDetail,
      allSongs, setAllSongs,
      currSongs, setCurrSongs,
      shouldPlay, setShouldPlay,
      restriction, getApp, childRef, playerRef, restrictionColor,
      currUser, setCurrUser,
      history, setHistory,
      liked, setLiked,
      playlist1, setPlaylist1,
      playlist2, setPlaylist2,
      getPlaylistsDetail,
      songPlaying, setSongPlaying,
      audio, icon,
      truncateLine,
      seekbarSmall, seekbarPlayerSmall,
      time, setTime,
      playRef, playlistRef,
      addHistory,
      addLikedSong,
      addPlaylist1, deletePlaylist1,
      addPlaylist2, deletePlaylist2,
      previousClick, nextClick,
      handleReplayState,
      logout
    }}>
      {props.children}
    </songContext.Provider>
  )
}

export default SongState