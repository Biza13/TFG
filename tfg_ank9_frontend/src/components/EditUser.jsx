import React from 'react'

export default function EditUser({setEditModal, handleChange, handleSubmit, user, imgUser, setImgUser}) {
    
  return (
    <div className='fixed inset-0 z-50 bg-black/80 flex justify-center items-start p-5 md:p-8 overflow-y-auto overflow-x-hidden m-4 rounded-2xl'>
        
        <button 
          onClick={() => setEditModal(false)}
          className='absolute top-0 right-0 md:top-4 md:right-4 z-70 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-red-700 shadow-xl border-2 border-[#8a8a8a]'
        >
          ✕
        </button>


        <form onSubmit={handleSubmit} className='w-[80%] bg-[#8a8a8a] p-5 rounded flex flex-col gap-4 relative justify-center items-center'>

          <div className='w-full flex gap-5'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="name" className='flex gap-2'>Nombre <p className='text-red-500'>*</p></label>
              <input type="text" name='name' value={user.name} onChange={handleChange} placeholder='Nombre de usuario administrador' className='bg-white border rounded p-2' />
            </div>
            
            <div className='flex flex-col flex-1'>
              <label htmlFor="email" className='flex gap-2'>Email <p className='text-red-500'>*</p></label>
              <input type="email" name='email' value={user.email} onChange={handleChange} placeholder='example@example.com' className='bg-white border rounded p-2' />
            </div>
          </div>

          <div className='w-full flex gap-5 justify-center'> 

            <div className='flex flex-col'>
              <label htmlFor="birthDate">Fecha de nacimiento</label>
              <input type="date" name='birth_date' value={user?.birth_date || ""} onChange={handleChange} className='bg-white border rounded p-2' />
            </div>
          </div>

          <div className='w-full flex gap-5'>
            <div className='flex flex-col flex-1'>
              <label htmlFor="street">Direccion</label>
              <input type="text" name='address' value={user?.address || ""} onChange={handleChange} placeholder='C/example, población' className='bg-white border rounded p-2' />
            </div>
            
            <div className='flex flex-col flex-1'>
              <label htmlFor="city">Ciudad</label>
              <input type="text" name='city' value={user?.city || ""} onChange={handleChange} className='bg-white border rounded p-2' placeholder='Ciudad' />
            </div>

          </div>

          <div className='flex gap-5 justify-center items-center'>

            <div>
                <p>Imagen actual</p>
                <img src={`http://localhost:8000/uploads/users/${user.picture_route}`} alt="" className='w-20 h-20' />
            </div>

            <div className='w-full md:w-[90%] m-auto flex flex-col px-2 justify-center items-center mt-5'>
              <p className='mb-1'>Subir Foto</p>
              <label 
                htmlFor="person-img" 
                className="cursor-pointer ring-2 bg-[#21283a] hover:bg-white text-white hover:text-[#21283a] hover:font-bold transition-all duration-300 py-2 px-4 md:px-6 rounded-lg shadow-md flex items-center gap-2"
              >
                {imgUser ? "✅ Foto subida correctamente" : "Seleccionar archivo"}
              </label>
            
              <input id="person-img" type="file" accept="image/*" className='hidden' onChange={(e) => setImgUser(e.target.files[0])} />
              {imgUser && <p className='text-xs text-white mt-1'>{imgUser.name}</p>}
            </div>

          </ div>

          <button type='submit' className='w-[20%] bg-[#024d70] hover:bg-[#0572a5] text-white font-bold py-3 px-6 md:px-12 rounded-xl text-xl shadow-lg transition-transform hover:scale-105 cursor-pointer'>
            Enviar
          </button>

        </form>

    </div>
  )
}
