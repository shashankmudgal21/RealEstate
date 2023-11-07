import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form action="" className='flex flex-col gap-6'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term</label>
                <input className = "border p-3 rounded-lg w-full"type="text" name="" id="searchTerm" placeholder='Search..' />
            </div>
            <div className='flex items-center gap-2 flex-wrap' >
                <label className='font-semibold'>Type:</label>
                <div className='flex gap-2'><input type="checkbox" className='w-4' name="" id="all" />
                <span>Rent & Sale</span>
                </div> 
                <div className='flex gap-2'><input type="checkbox" className='w-4' name="" id="rent" />
                <span>Rent </span>
                </div> 
                <div className='flex gap-2'><input type="checkbox" className='w-4' name="" id="sale" />
                <span>Sale</span>
                </div> 
                <div className='flex gap-2'><input type="checkbox" className='w-4' name="" id="offer" />
                <span>Offer</span>
                </div> 
            </div>
            <div className='flex items-center gap-2 flex-wrap' >
                <label className='font-semibold'>Amenteies:</label>
                <div className='flex gap-2'><input type="checkbox" className='w-4' name="" id="paring" />
                <span>Parking</span>
                </div> 
                <div className='flex gap-2'><input type="checkbox" className='w-4' name="" id="furnished" />
                <span>Furnished </span>
                </div> 
            </div>
            <div className='flex items-center gap-2 flex-wrap'>
                <label className='font-semibold'>Sort:</label>
                <select className=' border rounded-lg p-3' name="" id="sort_order">
                    <option value="">Price high to low</option>
                    <option value="">Price low to high</option>
                    <option value="">Latest</option>
                    <option value="">Oldest</option>
                </select>
            </div>
            <button className='border bg-slate-700 rounded-lg hover:opacity-95 p-3 text-white'>Search</button>
        </form>
      </div>
      <div>
        <h1 className='text-3xl border-b text-slate-700 font-semibold mt-3'>Listing results:</h1>
      </div>
    </div>
  )
}
