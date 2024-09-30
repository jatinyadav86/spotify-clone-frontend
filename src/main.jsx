import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home.jsx'
import { Content } from './components/Content.jsx'
import { PlaylistsMain } from './components/PlaylistsMain.jsx'
import { Login } from './components/Login.jsx'
import SongState from './context/SongState.jsx'
import { Signup } from './components/Signup.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />}>
        <Route path='' element={<Content />} />
        <Route path='/album/:name' element={<PlaylistsMain />} />
        <Route path='/playlist/:name' element={<PlaylistsMain />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SongState>
      <RouterProvider router={router} />
    </SongState>
  </React.StrictMode>,
)
