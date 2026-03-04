import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Register() {

  /* States de la persona */
  const [personName, setPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [personImg, setPersonImg] = useState("");
  /* states del perro */
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [dogBirthDate, setDogBirthDate] = useState("");
  const [dogImg, setDogImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // 1. Creamos el "contenedor" para enviar datos con archivos
    const formData = new FormData();

    // 2. Metemos los datos de la persona
    formData.append('fullName', personName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('street', street);
    formData.append('city', city);
    formData.append('birthDate', birthDate);
    if (personImg) formData.append('imageFile', personImg); // El nombre 'imageFile' debe coincidir con el de tu Backend

    // 3. Metemos los datos del perro
    formData.append('dogName', dogName);
    formData.append('breed', breed);
    formData.append('dogBirthDate', dogBirthDate);
    if (dogImg) formData.append('dogImageFile', dogImg);

    try {
      const response = await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Indispensable para subir archivos
        },
      });

      console.log('¡Registro exitoso!', response.data);
      alert('Usuario y perro registrados correctamente');

      // Aquí podrías redirigir al login
      // window.location.href = '/login';

    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      alert('Hubo un error en el registro. Revisa la consola.');
    }
  };

  return (
    <>
      <div className='bg-[#1c2230]'>
        <Header><p className='font-bold text-3xl mt-5 w-[60%]'>Si quieres ser parte de nuestra familia, registrate y contacta con nosotros</p></Header>
      
        {/* Body */}
        <form onSubmit={handleSubmit} className='w-[90%] flex flex-wrap gap-5 m-auto my-5 justify-between items-center'>

          {/* Datos dueño */}
          <section className='w-[46%]'>
            
            <p className='text-2xl text-white font-bold text-center mb-3'>Datos personales</p>

            <div className='w-full rounded bg-[#8a8a8a] p-5 flex flex-wrap justify-between'>
            
              {/* div 1 datos obligatorios */}
              <div className='flex flex-col gap-5 w-[50%] px-2'>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Nombre completo <p className='text-red-600'>*</p></label>
                  <input type="text" placeholder='Full name' onChange={e => setPersonName(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Correo <p className='text-red-600'>*</p></label>
                  <input type="email" placeholder='example@example.com' onChange={e => setEmail(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Contraseña <p className='text-red-600'>*</p></label>
                  <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                </div>
            
              </div>
            
              {/* div 2 datos NO obligatorios */}
              <div className='flex flex-col gap-5 w-[50%] px-2'>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Calle</label>
                  <input type="text" placeholder='Street' onChange={e => setStreet(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Ciudad/Población</label>
                  <input type="text" placeholder='City' onChange={e => setCity(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>

                <div>
                  <label htmlFor="" className='flex gap-2'>Fecha de nacimiento</label>
                  <input type="date" onChange={e => setBirthDate(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>
            
              </div>
            
              {/* div 3 imagen */}
              <div className='w-[90%] m-auto flex flex-col px-2 justify-center items-center mt-5'>
                <p>Subir Foto</p>
                <label 
                  htmlFor="person-img" 
                  className="cursor-pointer ring-2 bg-[#21283a] hover:bg-white text-white hover:text-[#21283a] hover:font-bold transition-all duration-300 py-2 px-6 rounded-lg shadow-md flex items-center gap-2"
                >
                  {personImg ? "✅ Foto subida correctamente" : "Seleccionar archivo"}
                </label>

                <input id="person-img" type="file" accept="image/*" onChange={(e) => setPersonImg(e.target.files[0])} className='hidden' />
                {personImg && <p className='text-xs text-white mt-1'>{personImg.name}</p>}
              </div>
            
            </div>
          </section>

          {/* Datos perro */}
          <section className='w-[46%]'>
            
            <p className='text-2xl text-white font-bold text-center mb-3'>Datos del perro</p>

            <div className='w-full rounded bg-[#8a8a8a] p-5 flex flex-wrap justify-between'>
            
              {/* div 1 datos del perro */}
              <div className='flex flex-col gap-5 w-[50%] px-2'>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Nombre <p className='text-red-600'>*</p></label>
                  <input type="text" placeholder='Name' onChange={e => setDogName(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Raza</label>
                  <input type="text" placeholder='Breed' onChange={e => setBreed(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Fecha de nacimiento</label>
                  <input type="date" onChange={e => setDogBirthDate(e.target.value)} className='w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>
            
              </div>
            
              {/* div 2 imagen */}
              <div className='w-[50%] m-auto flex flex-col px-2 justify-center items-center'>
                <p>Subir Foto</p>
                <label 
                  htmlFor="dog-img" 
                  className="cursor-pointer ring-2 bg-[#21283a] hover:bg-white text-white hover:text-[#21283a] hover:font-bold transition-all duration-300 py-2 px-6 rounded-lg shadow-md flex items-center gap-2"
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
              className='bg-[#024d70] hover:bg-[#0572a5] text-white font-bold py-3 px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'
            >
              Registrar familia
            </button>
          </div>

        </form>
        {/* Fin body */}

        <Footer></Footer>
      
      </div>
    </>
  )
}
