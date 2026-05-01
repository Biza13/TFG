import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import api from '../api/axios';

export default function Register() {

  /* States del usuario */
  const [personName, setPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [personImg, setPersonImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setIsLoading(true);
    
    // Crear el "contenedor" para enviar datos y archivos. Si solo fuesen datos mandariamos un json pero al tener archivos ha de ser un formData
    const formData = new FormData();

    // Metemos los datos de la persona con el append dando clave valor
    // El nombre entre comillas debera de ser el mismo en la entidad
    formData.append('fullName', personName);
    formData.append('email', email.trim());
    formData.append('password', password.trim());
    // Si los campos pueden ser null hay que poner un if, para mandar un null y  no una cadena vacia
    if (street) formData.append('address', street);
    if (city) formData.append('city', city);
    if (birthDate) formData.append('birth_date', birthDate);
    if (personImg) formData.append('imageFile', personImg);

    try {
      // Registro del usuario
      const response = await api.post('/register-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Esperar un poco antes de loguear
      await new Promise(resolve => setTimeout(resolve, 800));

      // Login automatico después del registro
      const loginResponse = await api.post('/login_check', {
          email: email.trim(),
          password: password
      }, {
          headers: {
              'Content-Type': 'application/json' 
          }
      });

      // Guardar el token en el local storage para poder registrar a los perros y el nombre para el header
      const token = loginResponse.data.token;
      const userName = response.data.name;
      const userPicture = response.data.picture_route;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('userPicture', userPicture);

      // Redirigir al registro de perros
      window.location.href = '/dogRegister';

    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);
      alert('Hubo un error en el registro. Revisa la consola.'+ (error.response?.data?.detail));
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='bg-[#1c2230]'>
        <Header><p className='hidden md:block font-bold text-3xl mt-5 w-[90%] lg:w-[60%]'>Si quieres ser parte de nuestra familia, registrate y contacta con nosotros</p></Header>
      
        {/* Body */}
        <form onSubmit={handleSubmit} className='w-[90%] flex flex-wrap gap-5 m-auto my-5 justify-center lg:justify-between items-center'>

          {/* Datos dueño */}
          <section className='w-full'>
            
            <p className='text-2xl text-white font-bold text-center mb-3'>Datos personales</p>

            <div className='w-full rounded bg-[#8a8a8a] p-5 flex flex-wrap flex-col md:flex-row justify-between'>
            
              {/* div 1 datos obligatorios */}
              <div className='flex flex-col gap-5 w-full md:w-[50%] px-2'>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Nombre completo <p className='text-red-600'>*</p></label>
                  <input type="text" placeholder='Full name' onChange={e => setPersonName(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Correo <p className='text-red-600'>*</p></label>
                  <input type="email" placeholder='example@example.com' onChange={e => setEmail(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Contraseña <p className='text-red-600'>*</p></label>
                  <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' required />
                </div>
            
              </div>
            
              {/* div 2 datos NO obligatorios */}
              <div className='flex flex-col gap-5 w-full md:w-[50%] px-2'>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Calle</label>
                  <input type="text" placeholder='Street' onChange={e => setStreet(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>
            
                <div>
                  <label htmlFor="" className='flex gap-2'>Ciudad/Población</label>
                  <input type="text" placeholder='City' onChange={e => setCity(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>

                <div>
                  <label htmlFor="" className='flex gap-2'>Fecha de nacimiento</label>
                  <input type="date" onChange={e => setBirthDate(e.target.value)} className='w-full md:w-[90%] bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
                </div>
            
              </div>
            
              {/* div 3 imagen de usuario */}
              <div className='w-full md:w-[90%] m-auto flex flex-col px-2 justify-center items-center mt-5'>
                <p className='mb-1'>Subir Foto</p>
                <label 
                  htmlFor="person-img" 
                  className="cursor-pointer ring-2 bg-[#21283a] hover:bg-white text-white hover:text-[#21283a] hover:font-bold transition-all duration-300 py-2 px-4 md:px-6 rounded-lg shadow-md flex items-center gap-2"
                >
                  {personImg ? "✅ Foto subida correctamente" : "Seleccionar archivo"}
                </label>

                <input id="person-img" type="file" accept="image/*" onChange={(e) => setPersonImg(e.target.files[0])} className='hidden' />
                {personImg && <p className='text-xs text-white mt-1'>{personImg.name}</p>}
              </div>
            
            </div>
          </section>

          {/* Botón de registro */}
          <div className='w-full flex justify-center mt-5'>
            <button 
              type="submit" 
              className='bg-[#024d70] hover:bg-[#0572a5] text-white font-bold py-3 px-6 md:px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'
            >
              Registrarme
            </button>
          </div>

        </form>
        {/* Fin body */}

        <Footer></Footer>
      
      </div>

      {isLoading && (
        /* en inset-0 para que ocupe toda la pantalla (top-0 right-0 bottom-0 left-0) */
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* defino tamaño del div size y el animate-spin hace girar el div, lo redondeamos con rounded-full, le ponemos borde con border-8,
          color del borde con border-gray y el color del borde top de azum y como esta girando con el spin el borde top se va moviendo */}
          <div className='size-16 animate-spin rounded-full border-8 border-white border-t-blue-400'></div>
          <p className="mt-4 text-xl font-bold text-white">Registrando usuario...</p>
        </div>
      )}

    </>
  )
}
