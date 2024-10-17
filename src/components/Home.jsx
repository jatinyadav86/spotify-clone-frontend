import { useEffect, useContext } from 'react'
import { PlaylistsMenu } from './PlaylistsMenu'
import { Header } from './Header';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import songContext from '../context/context'
import { Restriction } from './Restriction';
import { GetApp } from './GetApp';
import { Player } from './Player';
import Loading from './Loading';
import Playbar from './Playbar';

export const Home = () => {

    const location = useLocation();
    let navigate = useNavigate();

    const { getGenres, login, setLogin, getUserDetail, shouldPlay, setShouldPlay, audio, songPlaying, playlistRef, getPlaylistsDetail } = useContext(songContext)

    useEffect(() => {
        getGenres();
        if (localStorage.getItem("token")) {
            getUserDetail()
            getPlaylistsDetail()
            setLogin(true)
        }
    }, [])

    useEffect(() => {
        if (login && shouldPlay) {
            audio.current.play()
            setShouldPlay(false)
        }
    }, [songPlaying])

    useEffect(() => {
        if (!login) {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');

            if (token) {
                // Store the token in local storage
                localStorage.setItem('token', token);
                setLogin(true)

                // Redirect the user to the home page
                navigate('/');
                getUserDetail()
                getPlaylistsDetail()
            }
        }
    }, [location]);

    return (
        <>
            <Restriction />
            <GetApp />
            <Player />
            <div className='w-screen h-screen overflow-hidden text-white relative'>
                {location.pathname.split("/").length <= 2 &&
                    <Loading />
                }
                {/* main portion of website */}
                <div className="main w-full h-full lg:h-[calc(100%-89px)] lg:m-2 flex">
                    {/* left portion of website in large devices*/}
                    <div ref={playlistRef} className="left w-screen  lg:w-[25%] h-full fixed top-[-100%] z-20 lg:z-0 lg:static lg:space-y-2">
                        <div className="left-top hidden w-full h-[23%] bg-[#121212] rounded-lg lg:flex flex-col  justify-evenly space-x-6">
                            <img className='invert w-[85px] mx-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726664463/logo_tseut2.svg" alt="" />
                            <NavLink className={"w-28"} to={'/'}>
                                {({ isActive }) => {
                                    return (
                                        <div className={`home w-full group flex gap-4 font-bold ${isActive ? "text-white" : "text-[#b3b3b3]"} hover:text-white  cursor-pointer`}>
                                            <svg className={`w-6 ${isActive ? "fill-white" : "fill-[#b3b3b3]"} group-hover:fill-white `} xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path></svg>
                                            <span>Home</span>
                                        </div>
                                    )
                                }}

                            </NavLink>
                        </div>
                        <PlaylistsMenu />
                    </div>
                    {/* right or main portion of website for both small and large devices */}
                    <div className="right lg:ml-2 h-full w-full lg:w-[calc(75%-24px)] lg:rounded-lg relative pb-10 lg:pb-0">
                        <Header />
                        <Outlet />
                    </div>
                </div>
                <Playbar />
            </div>
            <audio ref={audio} src={songPlaying.song.url} preload='auto'></audio>
        </>
    )
}


