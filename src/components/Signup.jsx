import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import songContext from '../context/context'
import { Link } from 'react-router-dom';
const backenduri = import.meta.env.VITE_BACKEND_URI;

export const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate();
    const location = useLocation();

    const { setLogin, getUserDetail, getPlaylistsDetail } = useContext(songContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backenduri}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, identifier: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            const response = await fetch(`${backenduri}/api/data/addData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": json.authtoken
                }
            });
            const result = await response.json()
            getUserDetail()
            getPlaylistsDetail()
            setLogin(true)
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
                        <p className="w-[250px] text-[32px] font-bold text-center">Sign up to start listening</p>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                        <div onClick={googleLogin} className="google w-[80%] lg:w-[44%] h-12 border border-[#878787] rounded-full flex justify-around items-center cursor-pointer hover:border-white">
                            <img src="https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg" alt="" />
                            <p className='text-base font-semibold mr-7'>Sign up with Google</p>
                        </div>
                        <div onClick={facebookLogin} className="facebook w-[80%] lg:w-[44%] h-12 border border-[#878787] rounded-full flex justify-around items-center cursor-pointer hover:border-white">
                            <img src="https://accounts.scdn.co/sso/images/new-facebook-icon.eae8e1b6256f7ccf01cf81913254e70b.svg" alt="" />
                            <p className='text-base font-semibold mr-7'>Sign up with Facebook</p>
                        </div>
                        <div onClick={appleLogin} className="apple w-[80%] lg:w-[44%] h-12 border border-[#878787] rounded-full flex justify-around items-center cursor-pointer hover:border-white">
                            <img src="https://accounts.scdn.co/sso/images/new-apple-icon.e356139ea90852da2e60f1ff738f3cbb.svg" alt="" />
                            <p className='text-base font-semibold mr-7'>Sign up with Apple</p>
                        </div>
                    </div>
                    <div className="line w-[85%] lg:w-[75%] h-[1px] mx-auto bg-[#ffffff1a] my-10"></div>
                    <form onSubmit={handleSubmit} action="" className='w-full flex flex-col items-center'>
                        <div className="name mb-4">
                            <div className="text-sm font-bold mb-2">Name</div>
                            <input type="text" name="name" id="name" minLength={3} value={credentials.name} onChange={onChange} className='w-[324px] h-12 bg-transparent outline-none border border-[#878787] rounded-md py-3 px-4 font-semibold focus:border-2 focus:border-white' required placeholder='This name will appear on your profile' />
                        </div>
                        <div className="gmail mb-4">
                            <div className="text-sm font-bold mb-2">Email address</div>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} className='w-[324px] h-12 bg-transparent outline-none border border-[#878787] rounded-md py-3 px-4 font-semibold focus:border-2 focus:border-white' required placeholder='Email or username' />
                        </div>
                        <div className="password mb-4">
                            <div className="text-sm font-bold mb-2">Password</div>
                            <input type="password" name="password" id="password" minLength={8} value={credentials.password} onChange={onChange} className='w-[324px] h-12 bg-transparent outline-none border border-[#878787] rounded-md py-3 px-4 font-semibold focus:border-2 focus:border-white' required placeholder='password' />
                        </div>
                        <div className="remember w-[324px] flex items-center my-1">
                            <input type="checkbox" name="" id="" />
                            <p className='text-xs ml-3'>Remember me</p>
                        </div>
                        <button type='submit' className="w-[324px] h-12 rounded-full bg-[#1ed760] my-6 flex justify-center items-center text-black text-base font-bold hover:scale-[1.04]">Sign up</button>
                    </form>
                    <div className="line hidden lg:block w-[75%] h-[1px] mx-auto bg-[#ffffff1a] my-6"></div>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-2">
                        <p className='text-[#A7A7A7]'>Already have an account? </p>
                        <Link to={"/login"}>
                            <p className='underline cursor-pointer hover:text-[#1ed760] font-medium'>Log in here</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="footer w-full h-[94px] lg:h-20 bg-[#121212] flex justify-center items-center p-8">
                <p className="text-[11px] lg:text-xs text-[#A7A7A7] font-medium text-center" data-encore-id="text">This site is protected by reCAPTCHA and the Google <Link to="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className='underline'>Privacy Policy</Link> and <Link href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className='underline'>Terms of Service</Link> apply.</p>
            </div>
        </div>
    )
}
