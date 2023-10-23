import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp.'
import Header from './Component/Header'
import Profile from './pages/Profile'
import PrivateRouter from './Component/PrivateRouter'
export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route exact path = '/' element = {<Home />}></Route>
        <Route exact path = '/sign-in' element = {<SignIn />}></Route>
        <Route exact path = '/sign-up' element = {<SignUp />}></Route>
        <Route exact path = '/about' element = {<About />}></Route>
        <Route element = {<PrivateRouter/>}>
        <Route exact path = '/profile' element = {<Profile />}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
