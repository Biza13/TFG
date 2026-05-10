import React, { useState } from 'react'
import api from '../api/axios';

export default function DeleteService({ closeDeleteModal, service }) {

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem('token');

      try {

        await api.delete(`/services/delete-service/${service.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        alert("Servicio eliminado correctamente");
        window.location.reload();

      } catch (error){

        console.error("Error al borrar el servicio", error);
        alert("No se pudo eliminar el servicio");

      } finally {
        setIsLoading(false);
      }
    }; 

  return (
    <>
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/80 p-4 m-4 rounded-2xl'>
        
        <button 
          onClick={() => closeDeleteModal()}
          className='absolute top-0 right-0 z-60 bg-red-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors'
        >
          ✕
        </button>

        <div className='relative w-full max-w-md bg-[#8a8a8a] p-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center'>
            <p className='text-white text-center text-3xl font-bold'>¿Seguro que deseas eliminar el servicio?</p>
            <button onClick={handleSubmit} className='rounded-2xl cursor-pointer bg-[#21283a] w-[40%] text-white font-bold p-3 m-3'>
                Eliminar
            </button>
        </div>

    </div>

    {isLoading && (
        /* en inset-0 para que ocupe toda la pantalla (top-0 right-0 bottom-0 left-0) */
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* defino tamaño del div size y el animate-spin hace girar el div, lo redondeamos con rounded-full, le ponemos borde con border-8,
          color del borde con border-gray y el color del borde top de azum y como esta girando con el spin el borde top se va moviendo */}
          <div className='size-16 animate-spin rounded-full border-8 border-white border-t-blue-400'></div>
          <p className="mt-4 text-xl font-bold text-white">Borrando servicio...</p>
        </div>
      )}
    </>
  )
}
