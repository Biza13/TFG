import React from 'react'
import DeleteButton from './DeleteButton'

export default function VideoCard({video, isAdmin, handleDelete}) {
  return (
    <>
        <div className="w-full flex flex-col md:w-[45%] lg:w-[30%] shrink-0 bg-[#21283a] rounded-2xl items-center justify-center inset-shadow-sm inset-shadow-gray-500/50">
                <div className="bg-[#21283a] h-137.5 md:h-150 rounded-2xl overflow-hidden shadow-lg border m-3 border-white/10 relative">
                  {
                    isAdmin && (
                        <DeleteButton onClick={handleDelete}></DeleteButton>
                    )
                  }
                  <video 
                      className="w-full h-full object-cover" 
                      controls 
                      muted 
                      playsInline
                  >
                      {/* Ajusta la URL según donde guardes los archivos en Symfony */}
                      <source src={`http://localhost:8000/uploads/gallery/${video.imgvideo_route}`} type="video/mp4" />
                      Tu navegador no soporta videos.
                  </video>
                  
                  {/* {video.text && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded-xl text-sm">
                          {video.text}
                      </div>
                  )} */}
                </div>

                {video.text && (
                      <div className="mb-3 bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-xl text-sm">
                          {video.text}
                      </div>
                  )}
              </div>
    </>
  )
}
