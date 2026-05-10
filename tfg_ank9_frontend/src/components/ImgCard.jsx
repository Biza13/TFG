import React from 'react'

export default function ImgCard({img, imgSelected}) {
  return (
    <>
        <div className='flex justify-center'>
            <img onClick={imgSelected} key={img.id} src={`http://localhost:8000/uploads/gallery/${img.imgvideo_route}`} alt="Imagenes" className="w-full lg:w-[95%] aspect-video object-contain rounded-xl ring ring-white shadow-md shadow-white hover:scale-105 transition-transform" />
        </div>
    </>
  )
}
