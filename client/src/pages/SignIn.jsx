import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import {useSelector } from 'react-redux';
import { signInFailure,signInStart, signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function SignIn() {
  const[formData,setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData(
      {
      ...formData,
      [e.target.id]:e.target.value,
     }
    )
    console.log(formData)
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json();
      console.log(data);
      if(data.sucess === false){
        dispatch(signInFailure(data.message));
        return ;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    }
    catch(err){
      dispatch(signInFailure(err.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font:semibold my-7'>Sign in</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" placeholder='email' id = 'email' className=' border rounded-lg p-3' onChange={handleChange}/>
        <input type="password" placeholder='password' id = 'password' className=' border rounded-lg p-3' onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-700 rounded-lg p-3 text-white hover:opacity-95'>{
          loading?'loading':'sign in'
}
        </button>
      </form>
      <div className='flex gap-2 my-2'>
        <p>Dont have an account</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign-up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
