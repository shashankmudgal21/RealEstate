import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div className='bg-slate-200 shadow-md'>
        <div className='flex p-3 mx-auto max-w-6xl justify-between items-center'>
            <Link to = '/'>
            <h1 className='font-bold text-sm sm:text-xl'>
                <span className='text-slate-500'>Sahand</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            </Link>
            <form action="" className='bg-slate-100 flex items-center rounded-lg w-24 sm:w-64'>
                <input type="text" placeholder='Search...' className='bg-transparent p-3 focus:outline-none' />
                <FaSearch className='text-slate-600'></FaSearch>
            </form>
            <ul className='flex gap-5'>
                <Link to = '/'>
                <li className='hidden sm:inline text-slate-700 hover:underline' >Home</li>
                </Link>
                <Link to = '/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to = '/sign-up'>
                <li className='text-slate-700 hover:underline'>SignIn</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}
