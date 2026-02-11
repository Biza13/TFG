import React from 'react'

export default function ImgModal({imgSrc, setSelectedImg}) {
  return (
    //El fixed es para que flote en el medio de la pantalla
    <div className='fixed inset-0 z-50 w-full lg:w-[95%] md:m-auto bg-black/80 rounded-2xl flex justify-center items-center p-3 lg:p-10 lg:my-5'>
        <img src={imgSrc} alt="Modal image" className='w-[90%] h-screen object-contain py-1 md:py-10' />
        
        <button 
          onClick={() => setSelectedImg(null)}
          className='absolute top-0 right-0 z-60 bg-red-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors'
        >
          ✕
        </button>
    </div>
  )
}
