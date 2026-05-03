import React, { useEffect, useState } from 'react'

export default function EditService({closeModal, service}) {

  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    titleFeatures: '',
    features: '',
    titleFeatures2: '',
    features2: '',
    icon_route: ''
  });

  /* Efecto para cargar los datos en cuanto se abre el modal */
  useEffect(() => {
    if (service) {
      /* El || '' es para qeu cuando la bd nos devuelva campos vacios (null) lo cambiamos por string vacio ('')
       Porque tenemos campos que nos devolvera null como features2 */
      setFormData({
        name: service.name,
        shortDescription: service.shortDescription,
        description: service.description || '',
        titleFeatures: service.titleFeatures || '',
        features: service.features || '',
        titleFeatures2: service.titleFeatures2 || '',
        features2: service.features2 || '',
        icon_route: `http://localhost:8000/uploads/services/${service.icon_route}` || ''
      });
    }
  }, [service]);

  return (
    <div className='fixed inset-0 z-50 w-full lg:w-[95%] md:m-auto bg-black/80 rounded-2xl flex justify-center items-start p-3 lg:p-10 lg:my-5 overflow-y-auto'>
        
        <button 
          onClick={() => closeModal()}
          className='absolute top-0 right-0 z-60 bg-red-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors'
        >
          ✕
        </button>

        <div className='w-full bg-[#8a8a8a] p-5 rounded-2xl'>
          {/* Formulario para añadir servicio */}
          <form className='w-[90%] m-auto flex flex-col gap-5'>

            <div className='flex justify-around gap-8'>

              <div className='flex flex-col gap-1 my-2 w-full'>
                <label htmlFor="" className='flex gap-2'>Nombre del servicio <p className='text-red-600'>*</p></label>
                <input type="text" value={service.name} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>

              <div className='flex flex-col gap-1 my-2 w-full'>
                <label htmlFor="" className='flex gap-2'>Descripción corta  <p className='text-red-600'>*</p></label>
                <input type="text" value={service.shortDescription} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>

            </div>

            <div className='flex flex-col gap-1 my-2 w-[70%] m-auto items-center'>
              <label htmlFor="">Descripción</label>
              <textarea type="text" rows="6" value={service.description} className='w-full bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
            </div>

            <div className='flex gap-8 justify-around items-center'>
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Título de características</label>
                <input type="text" value={service.titleFeatures} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>
              
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Características</label>
                <p>Las características se han de poner separadas por un ; cada una</p>
                <p>Ejemplo: característica1.;Característica2.;Característica3.;...</p>
                <textarea type="text" rows="6" value={service.features} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>
            </div>

            <div className='flex gap-8 justify-around items-center'>
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Título de características 2</label>
                <input type="text" value={service.titleFeatures2} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>
              
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Características 2</label>
                <p>Las características se han de poner separadas por un ; cada una</p>
                <p>Ejemplo: característica1.;Característica2.;Característica3.;...</p>
                <textarea type="text" rows="6" value={service.features2} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>
            </div>

            {/* Revisar esto de las imagenes para saber si se modificaria o no */}
            <div className='flex flex-col gap-1 my-2 justify-center items-center'>
              <img src={`http://localhost:8000/uploads/services/${service.icon_route}`} alt="" className='w-20 h-20' />
              <label htmlFor="">Icono</label>
              <input type="file" accept="image/*" className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
            </div>

          </form>
        </div>

    </div>
  )
}
