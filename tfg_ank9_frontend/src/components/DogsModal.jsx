import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function DogsModal({setDogModal, user}) {

    const[dogs, setDogs] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {

            try {
                const response = await api.get(`/dogs?user=/api/users/${user.id}`)

                // si es undefined (??) devolvera un array vacio. para que no de error en caso de estar la bd vacía
                const dogs = response.data.member ?? [];

                setDogs(dogs);

            } catch (error) {
                console.error("Error cargando perros", error)
            }

            

        }
    }, [])

  return (
    <div className='fixed inset-0 z-50 w-full lg:w-[95%] md:m-auto bg-black/80 rounded-2xl flex justify-center items-center p-3 lg:p-10 lg:my-5'>
        
        {
            console.log(user.dogs[0])
        }

        <button onClick={() => setDogModal(false)} className='w-10 h-10 absolute top-0 right-0 z-60 text-2xl rounded-full bg-red-500 flex justify-center items-center font-bold hover:bg-gray-200 transition-colors cursor-pointer'>
            X
        </button>
    </div>
  )
}
