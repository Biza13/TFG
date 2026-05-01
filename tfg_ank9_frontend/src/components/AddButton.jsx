import React from 'react'

export default function AddButton({children}) {
  return (
    <div className='border rounded-2xl mx-2'>
        <button className='m-2 rounded cursor-pointer group flex items-center gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4" className="text-[#23374f] group-hover:text-white transition"><rect width="36" height="36" x="6" y="6" rx="3"/><path stroke-linecap="round" d="M24 16v16m-8-8h16"/></g></svg>
            {children}
        </button>
    </div>
  )
}
