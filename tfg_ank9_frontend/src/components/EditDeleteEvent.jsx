import React, { useState, useEffect } from 'react'
import api from '../api/axios';
import Loading from './Loading';

export default function EditDeleteEvent({closeModal, event}) {

  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
      capacity: event.capacity,
      // Con el slice para que no me coja los segundos
      date: event.date ? event.date.slice(0, 16) : '',
      serviceId: event.serviceId,
  });

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

  // Para editar los eventos
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingEdit(true)

    const data = {
        capacity: parseInt(formData.capacity),
        dateTime: formData.date,
        // Con la URL del servicio Api Platform relaciona las entidades
        service: `/api/services/${formData.serviceId}`,
    }

    try {

      /* Uso el patch porque al no tener una funcion controlador en mi backend para editar eventos
       y usar la API Platform el metodo para editar es el patch */
      await api.patch(`/events/${event.id}`, data, {
        headers: { 'Content-Type': 'application/merge-patch+json' }
      })
      alert("Evento editado con exito")
      window.location.reload();
      closeModal(false)

    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      alert("No se pudo actualizar el evento.");
    } finally {
      setIsLoadingEdit(false);
    }

  }

  // Para borrar evento
  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoadingDelete(true);

    try {
      await api.delete(`/events/${event.id}`)
      alert("Evento eliminado con 'éxito")
      window.location.reload();
      closeModal(false);
    } catch (error) {
      console.error("Error al eliminar el evento: ", error);
      alert("No se puedo eliminar el evento");
    }finally{
      setIsLoadingDelete(false);
    }
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-5 md:p-8 overflow-y-auto overflow-x-hidden m-4 rounded-2xl'>
        <button 
          onClick={() => closeModal(false)}
          className='absolute top-0 right-0 md:top-4 md:right-4 z-70 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-red-700 shadow-xl border-2 border-[#8a8a8a]'
        >
          ✕
        </button>

        <div className='w-[80%] bg-[#8a8a8a] p-5 rounded flex flex-col gap-4 relative justify-center items-center'>
          
          <p className='font-bold text-2xl'>Editar/Borrar evento</p>

          <form onSubmit={handleSubmit} className='flex flex-col'>
          
            <div className='flex gap-5'>
              <div className='flex flex-col justify-center items-center gap-3'>
                <label htmlFor="service">Servicios</label>
                <select 
                    className='bg-white py-1 px-2 rounded'
                    name='service'
                    value={formData.serviceId}
                    onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                >
                    {services.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
              </div>
              
              <div className='flex flex-col justify-center items-center gap-3'>
                <label htmlFor="capacity">Capacidad</label>
                <input type="text" name='capacity' onChange={(e) => setFormData({...formData, capacity: e.target.value})} className='bg-white text-center py-1 px-2 rounded' value={formData.capacity} />
              </div>

              <div className='flex flex-col justify-center items-center gap-3'>
                <label htmlFor="dateTime">Fecha</label>
                <input 
                  type="datetime-local" 
                  name='dateTime' 
                  className='bg-white text-center py-1 px-2 rounded' 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>

            </div>
          
            <button type='submit' className='mt-5 bg-[#024d70] hover:bg-[#0572a5] text-white font-bold py-3 px-6 md:px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'>
              Editar evento
            </button>
          
          </form>

          <form onSubmit={handleDelete}>
            <button type='submit' className='mt-5 bg-[#ab0000] hover:bg-[#0572a5] text-white font-bold py-3 px-6 md:px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'>
              Borrar evento
            </button>
          </form>

        </div>

        {isLoadingEdit && (
          <Loading>Editando evento...</Loading>
        )}

        {isLoadingDelete && (
          <Loading>Eliminando evento...</Loading>
        )}

    </div>
  )
}
