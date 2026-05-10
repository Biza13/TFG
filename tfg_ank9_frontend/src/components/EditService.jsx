import React, { useEffect, useState } from 'react'
import api from '../api/axios';

export default function EditService({closeEditModal, service}) {

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    titleFeatures: '',
    features: '',
    titleFeatures2: '',
    features2: ''
  });

  // Estado para el nuevo icono si el admin quiere cambiarlo
  const [newIconFile, setNewIconFile] = useState(null);

  // Función para cambios en inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para el cambio de archivo
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewIconFile(e.target.files[0]);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    /* Coger el token para los permisos de editar el servicio */
    const token = sessionStorage.getItem('token');

    const data = new FormData();

    /* Meter los datos en el FormData del estado de formData */
    data.append('name', formData.name);
    data.append('shortDescription', formData.shortDescription);
    data.append('description', formData.description);
    data.append('titleFeatures', formData.titleFeatures);
    data.append('features', formData.features);
    data.append('titleFeatures2', formData.titleFeatures2);
    data.append('features2', formData.features2);

    // si decide cambiar el icono
    if (newIconFile) {
      data.append('icon', newIconFile);
    }

    try {
      // Post para la edición del servicio con la url de symfony y con la data del servicio
      await api.post(`/services/edit-service/${service.id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("¡Servicio actualizado correctamente!");
      window.location.reload();
      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      alert("No se pudo actualizar el servicio.");
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className='fixed inset-0 z-50 bg-black/80 flex justify-center items-start p-5 md:p-8 overflow-y-auto overflow-x-hidden m-4 rounded-2xl'>
        
        <button 
          onClick={() => closeEditModal()}
          className='absolute top-0 right-0 md:top-4 md:right-4 z-70 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-red-700 shadow-xl border-2 border-[#8a8a8a]'
        >
          ✕
        </button>

        <div className='max-w-full md:w-full bg-[#8a8a8a] p-5 rounded-2xl'>

          <div className='text-center font-bold text-3xl m-3 p-2'>
            Edita el servicio  
          </div>  

          {/* Formulario para añadir servicio */}
          <form onSubmit={handleSubmit} className='w-full m-auto flex flex-col gap-5'>

            <div className='flex flex-col lg:flex-row justify-around gap-8'>

              <div className='flex flex-col gap-1 my-2 w-full'>
                <label htmlFor="" className='flex gap-2'>Nombre del servicio <p className='text-red-600'>*</p></label>
                <input name="name" onChange={handleChange} type="text" value={formData.name} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>

              <div className='flex flex-col gap-1 my-2 w-full'>
                <label htmlFor="" className='flex gap-2'>Descripción corta  <p className='text-red-600'>*</p></label>
                <input name="shortDescription" onChange={handleChange} type="text" value={formData.shortDescription} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>

            </div>

            <div className='flex flex-col gap-1 my-2 w-full m-auto items-center'>
              <label htmlFor="">Descripción</label>
              <textarea name="description" onChange={handleChange} type="text" rows="6" value={formData.description} className='w-full bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
            </div>

            <div className='flex flex-col lg:flex-row gap-8 justify-around items-center'>

              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Título de características</label>
                <input name="titleFeatures" onChange={handleChange} type="text" value={formData.titleFeatures} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>
              
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Características</label>
                <p>Las características se han de poner separadas por un ; cada una</p>
                <p>Ejemplo: característica1.;Característica2.;...</p>
                <textarea name='features' onChange={handleChange} type="text" rows="6" value={formData.features} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>

            </div>

            <div className='flex flex-col lg:flex-row gap-8 justify-around items-center'>

              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Título de características 2</label>
                <input name='titleFeatures2' onChange={handleChange} type="text" value={formData.titleFeatures2} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>
              
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Características 2</label>
                <p>Las características se han de poner separadas por un ; cada una</p>
                <p>Ejemplo: característica1.;Característica2.;...</p>
                <textarea name='features2' onChange={handleChange} type="text" rows="6" value={formData.features2} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>

            </div>

            {/* Revisar esto de las imagenes para saber si se modificaria o no */}
            <div className='flex flex-col gap-1 my-2 justify-center items-center'>
              <img src={`http://localhost:8000/uploads/services/${service.icon_route}`} alt="" className='w-20 h-20' />
              
            <label 
              htmlFor="file-upload" 
              className='text-center cursor-pointer bg-[#21283a] text-white py-2 px-4 rounded-lg hover:bg-black transition-colors text-sm font-medium shadow-md'
            >
              {newIconFile ? "✅ Imagen seleccionada" : "Subir nueva imagen"}
            </label>

            {/* 2. El input real se oculta con 'hidden' pero se vincula mediante el ID para que el label sea el propio boton */}
            <input 
              id="file-upload"
              type="file" 
              accept="image/*" 
              className='hidden' 
              onChange={handleFileChange}
            />

            </div>

            <button type="submit" className='bg-[#21283a] text-white font-bold py-3 px-10 rounded-xl self-center hover:bg-black transition-all mb-5'>
                Editar Servicio
            </button>

          </form>
        </div>
      {isLoading && (
        /* en inset-0 para que ocupe toda la pantalla (top-0 right-0 bottom-0 left-0) */
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* defino tamaño del div size y el animate-spin hace girar el div, lo redondeamos con rounded-full, le ponemos borde con border-8,
          color del borde con border-gray y el color del borde top de azum y como esta girando con el spin el borde top se va moviendo */}
          <div className='size-16 animate-spin rounded-full border-8 border-white border-t-blue-400'></div>
          <p className="mt-4 text-xl font-bold text-white">Editando servicio...</p>
        </div>
      )}
    </div>
  )
}
