import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import api from '../api/axios';

export default function Admin() {

  const buttonClass = "border border-white p-2 rounded-2xl mx-3 text-white font-bold w-fit cursor-pointer hover:scale-110 transition-all"

  const token = sessionStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    setUsers(response.data.member);
    console.log("Usuarios cargados:", response.data.member);

    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  }
  
  const handleAddUserAdmin = (e) => {

  }

  const handleAddUserRegular = (e) => {
    
  }

  const handleEditUser = (e) => {
    
  }

  const handleDeleteUser = (e) => {
    
  }

  return (
    <>
      <div className='bg-[#1c2230] min-h-screen'>
        <Header>
          {/* Para movil */}
          <p className='block md:hidden'>
            Administración
          </p>
        </Header>
        <div className='flex flex-col justify-center items-center gap-3 mt-5'>
          <button className={buttonClass}>Añadir usuario Administrador</button>
          <button className={buttonClass}>Añadir usuario regular</button>
          <button className={buttonClass}>Eliminar usuario</button>
          <button className={buttonClass}>Editar usuario</button>
        </div>

        <div>
          <button className={`${buttonClass} mb-3`}>Mostrar lista de usuarios</button>
        </div>
        <div>
          Aqui mostrar la lista de usuarios cuando se apriete el boton y un buscador para que se pueda buscar al usuario
        </div>

      </div>
    </>
  )
}
