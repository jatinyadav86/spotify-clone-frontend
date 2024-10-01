import React, { useContext, useState } from 'react'
import songContext from '../context/context'
import { Link, useNavigate } from 'react-router-dom';
const backenduri = import.meta.env.VITE_BACKEND_URI;

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const { setLogin, getUserDetail, getPlaylistsDetail } = useContext(songContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backenduri}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identifier: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            setLogin(true)
            getUserDetail()
            getPlaylistsDetail()
            navigate("/")
        }
        else {
            alert(json.error);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const googleLogin = () => {
        window.location.href = `${backenduri}/api/auth0/login/google`;
    };

    const facebookLogin = () => {
        window.location.href = `${backenduri}/api/auth0/login/facebook`;
    };

    const appleLogin = () => {
        window.location.href = `${backenduri}/api/auth0/login/apple`;
    };

    return (
        <div className='w-screen h-screen  overflow-auto text-white scrollbar-none lg:scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent'>
            <div className="main w-full h-[985px] lg:h-[1072px] bg-gradient-to-b from-[#ffffff1a] to-black flex justify-center items-center">
                <div className="w-full h-full lg:w-[734px] lg:h-[1008px] bg-[#121212] lg:rounded-lg">
                    <div className="logo w-full flex justify-center mt-11 mb-4 lg:my-6">
                        <img className='size-6 lg:size-9' src="https://res.cloudinary.com/doswveiik/image/upload/v1726669213/small-logo_tewiiv.svg" alt="" />
                    </div>
                    <div className="w-full flex justify-center mb-8">
                        <p className="text-[32px] font-bold">Log in to Spotify</p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                    <div onClick={googleLogin} className="google w-[80%] lg:w-[44%] h-12 border border-[#878787] rounded-full flex justify-around items-center cursor-pointer hover:border-white">
                            <img src="https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg" alt="" />
                            <p className='text-base font-semibold mr-7'>Log in with Google</p>
                        </div>
                        <div onClick={facebookLogin} className="facebook w-[80%] lg:w-[44%] h-12 border border-[#878787] rounded-full flex justify-around items-center cursor-pointer hover:border-white">
                            <img src="https://accounts.scdn.co/sso/images/new-facebook-icon.eae8e1b6256f7ccf01cf81913254e70b.svg" alt="" />
                            <p className='text-base font-semibold mr-7'>Log in with Facebook</p>
                        </div>
                        <div onClick={appleLogin} className="apple w-[80%] lg:w-[44%] h-12 border border-[#878787] rounded-full flex justify-around items-center cursor-pointer hover:border-white">
                            <img src="https://accounts.scdn.co/sso/images/new-apple-icon.e356139ea90852da2e60f1ff738f3cbb.svg" alt="" />
                            <p className='text-base font-semibold mr-7'>Continue with Apple</p>
                        </div>
                    </div>
                    <div className="line w-[85%] lg:w-[75%] h-[1px] mx-auto mb-5 bg-[#ffffff1a] my-10"></div>
                    <form onSubmit={handleSubmit} action="" className='w-full flex flex-col items-center'>
                        <div className="gmail mb-4">
                            <div className="text-sm font-bold mb-2">Email or username</div>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} className='w-[324px] h-12 bg-transparent outline-none border border-[#878787] rounded-md py-3 px-4 font-semibold focus:border-2 focus:border-white' required placeholder='Email or username' />
                        </div>
                        <div className="password mb-4">
                            <div className="text-sm font-bold mb-2">Password</div>
                            <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} className='w-[324px] h-12 bg-transparent outline-none border border-[#878787] rounded-md py-3 px-4 font-semibold focus:border-2 focus:border-white' required placeholder='password' />
                        </div>
                        <div className="remember w-[324px] flex items-center my-1">
                            <input type="checkbox" name="" id="" />
                            <p className='text-xs ml-3'>Remember me</p>
                        </div>
                        <button type='submit' className="w-[324px] h-12 rounded-full bg-[#1ed760] my-8 flex justify-center items-center text-black text-base font-bold hover:scale-[1.04]">Log In</button>
                    </form>
                    <div className="w-full text-center text-base underline hover:text-[#1ed760] cursor-pointer">Forgot your password?</div>
                    <div className="line hidden lg:block w-[75%] h-[1px] mx-auto bg-[#ffffff1a] my-8"></div>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-2 my-16">
                        <p className='text-[#A7A7A7]'>Don't have an account?</p>
                        <Link to={"/signup"}>
                            <p className='underline cursor-pointer hover:text-[#1ed760] font-medium'>Sign up for Spotify</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer w-full h-[94px] lg:h-20 bg-[#121212] flex justify-center items-center p-8">
                <p className="text-[11px] lg:text-xs text-[#A7A7A7] font-medium text-center" data-encore-id="text">This site is protected by reCAPTCHA and the Google <Link to="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className='underline'>Privacy Policy</Link> and <Link to="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className='underline'>Terms of Service</Link> apply.</p>
            </div>
        </div>
    )
}
