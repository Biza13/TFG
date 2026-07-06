import React from 'react'

export default function CreateEvent({closeModal}) {
  return (
    <div className='fixed inset-0 z-50 bg-black/80 flex justify-center items-start p-5 md:p-8 overflow-y-auto overflow-x-hidden m-4 rounded-2xl'>
        <button 
          onClick={() => closeModal(false)}
          className='absolute top-0 right-0 md:top-4 md:right-4 z-70 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-red-700 shadow-xl border-2 border-[#8a8a8a]'
        >
          ✕
        </button>
        ModalCreateEvent
    </div>
  )
}
