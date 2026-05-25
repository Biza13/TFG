import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import api from '../api/axios';

export default function Register() {

  /* states del perro */
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [dogBirthDate, setDogBirthDate] = useState("");
  const [dogImg, setDogImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setIsLoading(true);
    
    // Crear el "contenedor" para enviar datos y archivos. Si solo fuesen datos mandariamos un json pero al tener archivos ha de ser un formData
    const formData = new FormData();

    // Metemos los datos del perro igual que los de la persona
    // El nombre entre comillas debera de ser el mismo en la entidad
    formData.append('dogName', dogName);
    if (breed) formData.append('breed', breed);
    if (dogBirthDate) formData.append('birth_date', dogBirthDate);
    if (dogImg) formData.append('dogImageFile', dogImg);

    try {
      // Recuperamos el token que guardamos en el registro del usuario
      const token = sessionStorage.getItem('token');

      // Enviar la petición con el token en el header para poder registrar al perro y que symfony sepa quien es el dueño al registrarlo
      const response = await api.post('/register-dog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      // Console log de prueba
      console.log('¡Registro exitoso del perro!', response.data);
      alert('Registro perruno completado correctamente');

      // Redirigir a home una vez finalizado el registro
      window.location.href = '/';

    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      alert('Hubo un error en el registro. Revisa la consola.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='bg-[#1c2230] min-h-screen flex flex-col'>
        
        <Header>
          <p className='hidden md:block font-bold text-3xl mt-5 w-[90%] lg:w-[60%]'>
            Si quieres ser parte de nuestra familia, registrate y contacta con nosotros
          </p>
        </Header>
      
        {/* Body */}
        <div className='grow flex flex-col justify-center'>
          <form onSubmit={handleSubmit} className='w-[90%] flex flex-wrap gap-5 m-auto my-5 justify-center items-center'>
          
            {/* Datos perro */}
            <section className='w-full lg:w-[60%]'>
              
              <p className='text-2xl text-white font-bold text-center mb-3'>Datos del perro</p>
          
              <div className='w-full rounded bg-[#8a8a8a] p-5 flex flex-wrap flex-col md:flex-row justify-between'>
              
                {/* div 1 datos del perro */}
                <div className='flex flex-col gap-5 w-full md:w-[50%] px-2'>
              
                  <div>
                    <label htmlFor="" className='flex gap-2'>Nombre <p className='text-red-600'>*</p></label>
                    <input type="text" placeholder='Name' onChange={e => setDogName(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                  </div>
              
                  <div>
                    <label htmlFor="" className='flex gap-2'>Raza</label>
                    <input type="text" placeholder='Breed' onChange={e => setBreed(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                  </div>
              
                  <div>
                    <label htmlFor="" className='flex gap-2'>Fecha de nacimiento</label>
                    <input type="date" onChange={e => setDogBirthDate(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                  </div>
              
                </div>
              
                {/* div 2 imagen de perro */}
                <div className='w-full md:w-[50%] m-auto flex flex-col px-2 justify-center items-center'>
                  <p className='mb-1'>Subir Foto</p>
                  <label 
                    htmlFor="dog-img" 
                    className="cursor-pointer ring-2 bg-[#21283a] hover:bg-white text-white hover:text-[#21283a] hover:font-bold transition-all duration-300 py-2 px-4 md:px-6 rounded-lg shadow-md flex items-center gap-2"
                  >
                    {dogImg ? "✅ Foto subida correctamente" : "Seleccionar archivo"}
                  </label>
          
                  <input id="dog-img" type="file" accept="image/*" onChange={(e) => setDogImg(e.target.files[0])} className='hidden' />
                  {dogImg && <p className='text-xs text-white mt-1'>{dogImg.name}</p>}
                </div>
              
              </div>
            </section>
          
            {/* Botón de registro */}
            <div className='w-full flex justify-center mt-5'>
              <button 
                type="submit" 
                className='bg-[#024d70] hover:bg-[#0572a5] text-white font-bold py-3 px-6 md:px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'
              >
                Registrar perro
              </button>
            </div>
          
          </form>
        </div>
        {/* Fin body */}

        <Footer></Footer>
      
      </div>

      {isLoading && (
        <Loading>Añadiendo perro...</Loading>
      )}
    </>
  )
}
