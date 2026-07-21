import React, { useEffect, useState } from 'react'
import api from '../api/axios';

export default function CreateEvent({closeModal}) {

  const [services, setServices] = useState([]);

  useEffect(() => {
      const fetchServices = async () => {
          try {
              const response = await api.get('/services');
              setServices(response.data.member);
          } catch (error) {
              console.error(error);
          }
      }
      fetchServices();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        capacity: parseInt(e.target.capacity.value),
        dateTime: e.target.dateTime.value,
        service: `/api/services/${e.target.service.value}`,
    }

    try {
        await api.post('/events', data, {
            // para apliPlatform es decir que no tenenmos un endPoint propio creado en symfony hay que usar el application/ld+json
            headers: { 'Content-Type': 'application/ld+json' }
        });
        alert('Evento creado con éxito');
        window.location.reload();
        closeModal(false);
    } catch (error) {
        console.error(error);
        alert('No se pudo crear el evento.');
    }

  }

  return (
    <div className='fixed inset-0 z-50 bg-black/80 flex justify-center items-start p-5 md:p-8 overflow-y-auto overflow-x-hidden m-4 rounded-2xl'>
        <button 
          onClick={() => closeModal(false)}
          className='absolute top-0 right-0 md:top-4 md:right-4 z-70 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-red-700 shadow-xl border-2 border-[#8a8a8a]'
        >
          ✕
        </button>
        <div className='w-[80%] bg-[#8a8a8a] p-5 rounded flex flex-col gap-4 relative justify-center items-center'>
          <p className='font-bold text-2xl'>Crear evento</p>

          <form onSubmit={handleSubmit} className='w-[90%] flex flex-col items-center'>

            <div className='w-full flex justify-around'>

              <div className='flex flex-col'>
                <label htmlFor="service">Servicios</label>
                <select 
                    className='bg-white py-1 px-2 rounded'
                    name='service'
                >
                    {services.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="capacity">Capacidad en número</label>
                <input type="text" name='capacity' className='bg-white text-center py-1 px-2 rounded' />
              </div>

              <div className='flex flex-col'>
                <label htmlFor="dateTime">Fecha y hora</label>
                <input type="datetime-local" name='dateTime' className='bg-white text-center py-1 px-2 rounded' />
              </div>

            </div>

            <button type='submit' className='mt-5 w-fit bg-[#024d70] hover:bg-[#0572a5] text-white font-bold py-3 px-6 md:px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'>
              Crear evento
            </button>

          </form>

        </div>
    </div>
  )
}
