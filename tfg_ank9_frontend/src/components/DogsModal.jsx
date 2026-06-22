import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Loading from '../components/Loading';

export default function DogsModal({setDogModal, user}) {

    const[dogs, setDogs] = useState([]);
    const[loadingDogs, setLoadingDogs] = useState(false)

    useEffect(() => {
        const fetchDogs = async () => {

            setLoadingDogs(true)

            try {
                // Dame los perros (/api/dogs) del usuario (?user=) que tiene id x (/api/users/x)
                const response = await api.get(`/dogs?user=/api/users/${user.id}`)

                // si es undefined (??) devolvera un array vacio. para que no de error en caso de estar la bd vacía
                const dogs = response.data.member ?? [];

                setDogs(dogs);

            } catch (error) {
                console.error("Error cargando perros", error)
            }finally{
                setLoadingDogs(false)
            }

        }

        fetchDogs();

    }, [])

  return (
    <div className='fixed inset-0 z-50 w-full lg:w-[95%] md:m-auto bg-black/80 rounded-2xl flex justify-center items-start md:items-center overflow-y-auto p-3 lg:p-10 lg:my-5'>

        <div className='w-[90%] bg-[#8a8a8a] rounded p-5 my-auto'>

            {/* Para tablet y desktop */}
            <table className='w-full border hidden md:table'>
                <thead>
                    <tr className='text-left'>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Raza</th>
                        <th className='p-2'>Fecha Nacimiento</th>
                        <th className='p-2'>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dogs.map((dog) => (
                            <tr className='border'>
                                <td className='p-1'>{dog.name}</td>
                                {
                                    dog.breed
                                        ? <td className='p-1'>{dog.breed}</td>
                                        : <td className='p-1'>No especifica</td>
                                }

                                {
                                    dog.birth_date
                                        ? <td className='p-1'>{dog.birth_date}</td>
                                        : <td className='p-1'>No especifica</td>
                                }

                                {
                                    dog.picture_route 
                                        ? <td className='p-1'>
                                            <img src={`${import.meta.env.VITE_UPLOADS_URL}/uploads/dogs/${dog.picture_route}`} className='w-20 h-20'></img>
                                        </td>
                                        : <td className='p-1 w-20 h-20'>Sin foto</td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Para moviles */}
            <div className='block md:hidden'>
                {
                    dogs.map((dog) => (
                        <div className='border my-2 p-2 flex flex-col justify-center items-center'>
                            <div className='text-center'>
                                <p className='font-bold'>Nombre</p>
                                <p>{dog.name}</p>
                            </div>
                            <div className='text-center'>
                                <p className='font-bold'>Raza</p>
                                {
                                    dog.breed
                                        ? <p className=''>{dog.breed}</p>
                                        : <p className=''>No especifica</p>
                                }
                            </div>
                            <div className='text-center'>
                                <p className='font-bold'>Fecha naciemiento</p>
                                {
                                    dog.birth_date
                                        ? <p>{dog.birth_date}</p>
                                        : <p>No especifica</p>
                                }
                            </div>
                            <div className='text-center flex flex-col justify-center items-center'>
                                <p className='font-bold'>Imagen</p>
                                {
                                    dog.picture_route 
                                        ? <img src={`${import.meta.env.VITE_UPLOADS_URL}/uploads/dogs/${dog.picture_route}`} className='w-20 h-20'></img>
                                        : <p className='w-20 h-20'>Sin foto</p>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>

        <button onClick={() => setDogModal(false)} className='w-10 h-10 absolute top-0 right-0 z-60 text-2xl rounded-full bg-red-500 flex justify-center items-center font-bold hover:bg-gray-200 transition-colors cursor-pointer'>
            X
        </button>

        {loadingDogs && (
                <Loading>Cargando perros...</Loading>
        )}
    </div>
  )
}
