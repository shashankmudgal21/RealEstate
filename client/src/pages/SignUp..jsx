import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import OAuth from '../Component/OAuth';
export default function SignUp() {
  const[formData,setFormData] = useState({});
  const[error,setError] = useState('');
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
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
      setLoading(true);
      const res = await fetch('/api/auth/sign-up',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json();
      console.log(data);
      if(data.sucess === false){
        setLoading(false);
        setError(data.message); 
        return ;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    }
    catch(err){
      setLoading(false);
      setError(err.message);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font:semibold my-7'>Sign up</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' id = 'username' className=' border rounded-lg p-3' onChange={handleChange}/>
        <input type="email" placeholder='email' id = 'email' className=' border rounded-lg p-3' onChange={handleChange}/>
        <input type="password" placeholder='password' id = 'password' className=' border rounded-lg p-3' onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-700 rounded-lg p-3 text-white hover:opacity-95'>{
          loading?'loading':'sign up'
}
        </button>
        <OAuth></OAuth>
      </form>
      <div className='flex gap-2 my-2'>
        <p>Have an account</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign-in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
