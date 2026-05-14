import React from 'react'
import DeleteButton from './DeleteButton'

export default function ImgCard({img, imgSelected, handleDelete, isAdmin}) {
  return (
    <>
        <div className='flex justify-center relative'>
            {
              isAdmin && (
                <DeleteButton onClick={handleDelete} optionalClass="md:mr-2 lg:mr-5 z-10"></DeleteButton>
              )
            }
            <img onClick={imgSelected} key={img.id} src={`http://localhost:8000/uploads/gallery/${img.imgvideo_route}`} alt="Imagenes" className="w-full lg:w-[95%] aspect-video object-contain rounded-xl ring ring-white shadow-md shadow-white hover:scale-105 transition-transform" />
        </div>
    </>
  )
}
