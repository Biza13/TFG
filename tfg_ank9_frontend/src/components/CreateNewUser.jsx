import React, { useState } from 'react'

export default function CreateNewUser({handleSubmit, setNewUser, newUser, setImgUser, onClose}) {

    const [personImg, setPersonImg] = useState();

    /* Función para meter en el formData los datos recogidos en el formulario con las propiedades de los inputs de name y onChange */
    const handleChange = (e) => {
        /* A la propiedad name de cada input se le va a dar el valor que escribamos en el input */
        const {name, value} = e.target;
        setNewUser ({ ...newUser, [name]: value });
    }

    /* Función para meter en el formData la imagen */
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPersonImg(file);  
            setImgUser(file);   
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit} className='w-[95%] md:w-[80%] bg-[#8a8a8a] p-3 md:p-5 rounded flex flex-col gap-4 relative justify-center items-center'>
          <button type="button" onClick={onClose} className='pb-2 absolute top-0 right-0 z-60 bg-red-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors'>x</button>

          <div className='w-full flex flex-col md:flex-row gap-5 mt-4 md:mt-0'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="name" className='flex gap-2'>Nombre <p className='text-red-500'>*</p></label>
              <input type="text" name='fullName' onChange={handleChange} placeholder='Nombre de usuario administrador' className='bg-white border rounded p-2' />
            </div>
            
            <div className='flex flex-col flex-1'>
              <label htmlFor="email" className='flex gap-2'>Email <p className='text-red-500'>*</p></label>
              <input type="email" name='email' onChange={handleChange} placeholder='example@example.com' className='bg-white border rounded p-2' />
            </div>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-5'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="password" className='flex gap-2'>Contraseña <p className='text-red-500'>*</p></label>
              <input type="password" name='password' onChange={handleChange} placeholder='Contraseña' className='bg-white border rounded p-2' />
            </div>
            
            <div className='flex flex-col flex-1'>
              <label htmlFor="birthDate">Fecha de nacimiento</label>
              <input type="date" name='birth_date' onChange={handleChange} className='bg-white border rounded p-2' />
            </div>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-5'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="street">Direccion</label>
              <input type="text" name='address' onChange={handleChange} placeholder='C/example, población' className='bg-white border rounded p-2' />
            </div>
            
            <div className='flex flex-col flex-1'>
              <label htmlFor="city">Ciudad</label>
              <input type="text" name='city' onChange={handleChange} className='bg-white border rounded p-2' placeholder='Ciudad' />
            </div>
          </div>

          <div className='w-full md:w-[90%] m-auto flex flex-col px-2 justify-center items-center mt-5'>
            <p className='mb-1'>Subir Foto</p>
            <label 
              htmlFor="person-img" 
              className="cursor-pointer ring-2 bg-[#21283a] hover:bg-white text-white hover:text-[#21283a] hover:font-bold transition-all duration-300 py-2 px-4 md:px-6 rounded-lg shadow-md flex items-center gap-2"
            >
              {personImg ? "✅ Foto subida correctamente" : "Seleccionar archivo"}
            </label>
        
            <input id="person-img" type="file" accept="image/*" onChange={handleFileChange} className='hidden' />
            {personImg && <p className='text-xs text-white mt-1'>{personImg.name}</p>}
          </div>

          <button type='submit' className='w-[40%] md:w-[20%] bg-[#024d70] hover:bg-[#0572a5] text-white font-bold py-3 px-6 md:px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'>
            Enviar
          </button>

        </form>
    </>
  )
}
