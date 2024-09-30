import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export const Footer = ({ login }) => {
  const location = useLocation();
  const arr = location.pathname.split("/")
  
  return (
    <>
      <div className="bg-[#121212] h-auto">
        <div className={`footer ${arr.includes("album") || arr.includes("playlist") ? "hidden" : "flex" } w-full h-auto justify-between flex-wrap p-4 lg:p-8 bg-[#121212]`}>
          <div className="links w-[80%] flex justify- flex-wrap">
            <div className="company min-w-44 my-6">
              <ul className='text-base text-[#b3b3b3] space-y-1'>
                <li className='text-white font-bold'>Company</li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://www.spotify.com/in-en/about-us/contact/" target="_blank" rel="noopener noreferrer">About</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://www.lifeatspotify.com/" target="_blank" rel="noopener noreferrer">Jobs</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://newsroom.spotify.com/" target="_blank" rel="noopener noreferrer">For the Record</Link></li>
              </ul>
            </div>
            <div className="comunnities min-w-44 my-6">
              <ul className='text-base text-[#b3b3b3] space-y-1'>
                <li className='text-white font-bold'>Communities</li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://artists.spotify.com/home" target="_blank" rel="noopener noreferrer">For Artists</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://developer.spotify.com/" target="_blank" rel="noopener noreferrer">Developers</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://ads.spotify.com/en-IN/" target="_blank" rel="noopener noreferrer">Advertising</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://investors.spotify.com/home/default.aspx" target="_blank" rel="noopener noreferrer">Investors</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://spotifyforvendors.com/" target="_blank" rel="noopener noreferrer">Vendors</Link></li>
              </ul>
            </div>
            <div className="useful links min-w-44 my-6">
              <ul className='text-base text-[#b3b3b3] space-y-1'>
                <li className='text-white font-bold'>Useful links</li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://support.spotify.com/in-en/" target="_blank" rel="noopener noreferrer">Support</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://www.spotify.com/in-en/free/" target="_blank" rel="noopener noreferrer">Free Mobile App</Link></li>
              </ul>
            </div>
            <div className="spotify plans min-w-44 my-6">
              <ul className='text-base text-[#b3b3b3] space-y-1'>
                <li className='text-white font-bold'>Spotify Plans</li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="http://www.spotify.com/in-en/premium/?ref=spotifycom_footer_premium_individual" target="_blank" rel="noopener noreferrer">Premium Individual</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://www.spotify.com/in-en/duo/?ref=spotifycom_footer_premium_duo" target="_blank" rel="noopener noreferrer">Premium Duo</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://www.spotify.com/in-en/family/?ref=spotifycom_footer_premium_family" target="_blank" rel="noopener noreferrer">Premium Family</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://www.spotify.com/in-en/student/?ref=spotifycom_footer_premium_student" target="_blank" rel="noopener noreferrer">Premium Student</Link></li>
                <li className='hover:text-white hover:underline cursor-pointer'><Link to="https://www.spotify.com/in-en/free/?ref=spotifycom_footer_free" target="_blank" rel="noopener noreferrer">Spotify Free</Link></li>
              </ul>
            </div>
          </div>
          <div className="socialMedia flex gap-3 my-6">
            <Link to="https://www.instagram.com/spotify/" target="_blank" rel="noopener noreferrer">
              <div className="insta size-10 bg-[#292929] rounded-full flex justify-center items-center hover:bg-[#727272]">
                <img className='size-6' src="https://res.cloudinary.com/doswveiik/image/upload/v1726663850/insta_p6dg2g.png" alt="" />
              </div>
            </Link>
            <Link to="https://x.com/spotify" target="_blank" rel="noopener noreferrer">
              <div className="twitter size-10 bg-[#292929] rounded-full flex justify-center items-center hover:bg-[#727272]">
                <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726663950/twitter_mq5z3l.svg" alt="" />
              </div>
            </Link>
            <Link to="https://www.facebook.com/Spotify" target="_blank" rel="noopener noreferrer">
              <div className="facebook size-10 bg-[#292929] rounded-full flex justify-center items-center hover:bg-[#727272]">
                <img src="https://res.cloudinary.com/doswveiik/image/upload/v1726664016/facebook_zizldw.svg" alt="" />
              </div>
            </Link>
          </div>
        </div>
        <div className="line w-[93%] h-[1px] mx-auto mb-7 bg-[#ffffff1a]"></div>
        <div className={`w-[93%] mx-auto pb-32 ${login && "pb-48"} lg:pb-14 text-[#A7A7A7] text-sm font-semibold flex justify-between items-center flex-wrap`}>
          <div className={`flex flex-wrap ${!login && "lg:hidden"}`}>
            <div className="h-7 mr-4 cursor-pointer hover:text-white"><Link to="_blank" href="https://www.spotify.com/in-en/legal/">Legal</Link></div>
            <div className="h-7 mr-4 cursor-pointer hover:text-white"><Link to="_blank" href="https://www.spotify.com/in-en/safetyandprivacy/">Safety & Privacy Center</Link></div>
            <div className="h-7 mr-4 cursor-pointer hover:text-white"><Link to="_blank" href="https://www.spotify.com/in-en/legal/privacy-policy/">Privacy Policy</Link></div>
            <div className="h-7 mr-4 cursor-pointer hover:text-white"><Link to="_blank" href="https://www.spotify.com/in-en/legal/cookies-policy/">Cookies</Link></div>
            <div className="h-7 mr-4 cursor-pointer hover:text-white"><Link to="_blank" href="https://www.spotify.com/in-en/legal/privacy-policy/#s3">About Ads</Link></div>
            <div className="h-7 mr-4 cursor-pointer hover:text-white"><Link to="_blank" href="https://www.spotify.com/in-en/accessibility">Accessibility</Link></div>
            <p className='mr-6'>© 2024 Spotify AB</p>
          </div>
        </div>
      </div>
    </>
  )
}
