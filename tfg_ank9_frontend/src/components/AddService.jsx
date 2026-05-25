import React, { useState } from 'react'
import api from '../api/axios';
import Loading from '../components/Loading';

export default function AddService({ closeAddModal }) {

    const [isLoading, setIsLoading] = useState(false);

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

    /* Función para meter en el formData los datos recogidos en el formulario con las propiedades de los inputs de name y onChange */
    const handleChange = (e) => {
        /* A la propiedad name de cada input se le va a dar el valor que escribamos en el input */
        const {name, value} = e.target;
        setFormData ({ ...formData, [name]: value });
    }

    /* Función para meter en el formData la imagen */
    const handleFileChange = (e) => {
        setFormData ({ ...formData, icon_route: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        /* Coger el token para los permisos de crear el servicio */
        const token = sessionStorage.getItem('token');

        // Crear el form data para poder enviarlo a symfony
        const data = new FormData();

        data.append('name', formData.name);
        data.append('shortDescription', formData.shortDescription);
        data.append('description', formData.description);
        data.append('titleFeatures', formData.titleFeatures);
        data.append('features', formData.features);
        data.append('titleFeatures2', formData.titleFeatures2);
        data.append('features2', formData.features2);

        /* Para el icono */
        if (formData.icon_route) {
            data.append('icon', formData.icon_route); // Symfony lo recibirá como 'icon'
        }

        try {
            // Aqui hay que poner la ruta de la función en symfony de crear un servicio
            await api.post('/services/create-service', data, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("Servicio creado con éxito");
            window.location.reload(); // Recargar la pagina para ver el nuevo servicio
            closeAddModal();
        } catch (error) {
            console.error("Error al crear el servicio: ", error);
            alert("Error al crear el servicio");   
        } finally {
          setIsLoading(false);
        }
    }

  return (
    <>
        <div className='fixed inset-0 z-50 bg-black/80 flex justify-center items-start p-5 md:p-8 overflow-y-auto overflow-x-hidden m-4 rounded-2xl'>
        
        <button 
          onClick={() => closeAddModal()}
          className='absolute top-0 right-0 z-60 bg-red-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors'
        >
          ✕
        </button>

        <div className='relative w-full md:w-full bg-[#8a8a8a] p-5 rounded-2xl'>
          {/* Formulario para añadir servicio */}

          <div className='text-center font-bold text-3xl m-3 p-2'>
            Añade un servicio nuevo  
          </div>  

          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>

            <div className='flex flex-col lg:flex-row justify-around gap-8'>

              <div className='flex flex-col gap-1 my-2 w-full'>
                <label htmlFor="" className='flex gap-2'>Nombre del servicio <p className='text-red-600'>*</p></label>
                <input name="name" value={formData.name} type="text" onChange={handleChange} className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>

              <div className='flex flex-col gap-1 my-2 w-full'>
                <label htmlFor="" className='flex gap-2'>Descripción corta  <p className='text-red-600'>*</p></label>
                <input name="shortDescription" value={formData.shortDescription} onChange={handleChange} type="text" className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
              </div>

            </div>

            <div className='flex flex-col gap-1 my-2 w-[70%] m-auto items-center'>
              <label htmlFor="">Descripción</label>
              <textarea name="description" value={formData.description} onChange={handleChange} type="text" rows="6" className='w-full bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
            </div>

            <div className='flex flex-col lg:flex-row gap-8 justify-around items-center'>
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Título de características</label>
                <input name="titleFeatures" value={formData.titleFeatures} onChange={handleChange} type="text" className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>
              
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Características</label>
                <p>Las características se han de poner separadas por un ; cada una</p>
                <p>Ejemplo: característica1.;Característica2.;...</p>
                <textarea name='features' value={formData.features} onChange={handleChange} type="text" rows="6" className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-8 justify-around items-center'>
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Título de características 2</label>
                <input name='titleFeatures2' value={formData.titleFeatures2} onChange={handleChange} type="text" className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>
              
              <div className='w-full flex flex-col gap-1 my-2'>
                <label htmlFor="">Características 2</label>
                <p>Las características se han de poner separadas por un ; cada una</p>
                <p>Ejemplo: característica1.;Característica2;...</p>
                <textarea name='features2' value={formData.features2} onChange={handleChange} type="text" rows="6" className='bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
              </div>
            </div>

            {/* Revisar esto de las imagenes para saber si se modificaria o no */}
            <div className='flex flex-col gap-1 my-2 justify-center items-center'>
              <label 
                htmlFor="file-upload" 
                className='text-center cursor-pointer bg-[#21283a] text-white py-2 px-4 rounded-lg hover:bg-black transition-colors text-sm font-medium shadow-md'
                >
                {formData.icon_route ? "✅ Icono seleccionado" : "Seleccionar icono"}
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
                Crear Servicio
            </button>

          </form>
        </div>

    </div>

    {isLoading && (
      <Loading>Creando servicio...</Loading>
    )}

    </>
  )
}
