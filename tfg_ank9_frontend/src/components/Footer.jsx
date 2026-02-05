import React from 'react'

export default function Footer() {
  return (
    <>
        <div className='py-2 bg-[#21283a] text-white rounded-t-lg'>

            <div className='w-full flex items-center px-3 md:px-5'>
                <div className='grow border-t'></div>
                <span className='px-5 font-bold md:text-2xl'>AnK_9 Detección y búsqueda</span>
                <div className='grow border-t'></div>
            </div>

            <div className='w-full px-2 md:px-10 flex flex-wrap justify-around text-center my-4'>

                <div className='w-[50%] md:w-[33%]'>
                    <p><b>Visitanos</b></p>
                    <p>Calle talleres nº7,</p>
                    <p>Puerto de Sagunto,</p>
                    <p>Valencia</p>
                </div>

                <div className='w-[50%] md:w-[33%]'>
                    <p><b>Contacto</b></p>
                    <p>Tel: 666-666-666</p>
                    <p>Correo: aaa@bbb.com</p>
                </div>

                <div className='w-full md:w-[33%] flex flex-col items-center my-4 md:my-0 pt-2 md:pt-0'>
                    <p><b>Redes sociales</b></p>
                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="66" d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"/></path><path strokeDasharray="28" strokeDashoffset="28" d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" to="0"/></path></g><circle cx="17" cy="7" r="1.5" fill="currentColor" opacity="0"><animate fill="freeze" attributeName="opacity" begin="1.3s" dur="0.2s" to="1"/></circle></svg>
                        <p>ank_9deteccionybusqueda</p>
                    </div>
                </div>

            </div>

            <div className='text-center'>
                <p>&copy; 2026 Begoña Cabo Martínez</p>
            </div>

        </div>
    </>
  )
}
