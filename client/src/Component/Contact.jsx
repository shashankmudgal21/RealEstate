import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Contact({listing}) {
  const [landlord,setLandlord] = useState(null);
  const [message,setMessage] = useState('');
  useEffect(()=>{
    const fetchLandlord = async()=>{
      try {
      const res = await fetch(`/api/user/${listing.useRef}`);
      const data = await res.json();
      setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLandlord();
  },[listing.useRef]) 
  const onchange = (e) =>{
    setMessage(e.target.value)
  }
  return (
    <div>
     { landlord && (
      <div className='flex flex-col gap-3'>
        <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span></p>
        <textarea className = "w-full rounded-lg p-3 border" placeholder = "Enter your message here " name="message" id="message" cols="30" rows="3" value={message} onChange={onchange}></textarea>
        <Link className = "bg-slate-700 text-center hover:opacity-95 rounded-lg p-3 text-white" to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>Send</Link>
      </div>
     
     )}
    </div>
  )
}
