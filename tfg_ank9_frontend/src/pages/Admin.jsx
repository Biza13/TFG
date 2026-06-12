import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import api from '../api/axios';
import UserCard from '../components/UserCard';
import Footer from '../components/Footer';
import CreateNewUser from '../components/CreateNewUser';
import EditUser from '../components/EditUser';
import Loading from '../components/Loading';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';

export default function Admin() {

  const buttonClass = "border border-white p-2 rounded-2xl mx-3 text-white font-bold w-fit cursor-pointer hover:scale-110 transition-all"

  const token = sessionStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // estados para enseñar formularios para añadir usuarios
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isAddRegularOpen, setIsAddRegularOpen] = useState(false);

  // Estados para añadir usuarios nuevos tanto admin como NO admin
   const [newUser, setNewUser] = useState ({
    name: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    birth_date: "",
   });
   const [imgUser, setImgUser] = useState (null);

  // Para el buscador de usuarios
  const [searchUser, setSearchUser] = useState('');

  /* El filteredUsers contiene todos los usuarios al principio, ya que si no se escribe nada en el buscador search es "" 
  y el includes devielve true porque cualquier cadena incluye "", 
  por lo que todos los usuarios estan incluidos si no se escribe nada en el buscador */
  const filteredUsers = users.filter((user) => {
    const search = searchUser.toLowerCase();
    // El ? es para que si esta propiedad existe y no es nula, continúa, si es nula o no existe, frena y no lanza un error
    const matchesName = user.name?.toLowerCase().includes(search);
    const matchesEmail = user.email?.toLowerCase().includes(search);

    // Devuelve verdadero si coincide con el nombre o con el email y los introducimos en el array del filter
    return matchesName || matchesEmail;
  })

  // Fetch para los usuarios
  const fetchUsers = async () => {

    setIsLoading(true);
    
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data.member);

    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    } finally {
        setIsLoading(false);
    }
  }
  
  // Añadir usuario administrador
  const handleAddUserAdmin = (e) => {
    setNewUser({ name: "", lastName: "", email: "", password: "", address: "", city: "", birth_date: "" });
    setImgUser(null);
    setIsAddAdminOpen(true);
  }

  // Añadir usuario regular
  const handleAddUserRegular = (e) => {
    setNewUser({ name: "", lastName: "", email: "", password: "", address: "", city: "", birth_date: "" });
    setImgUser(null);
    setIsAddRegularOpen(true);
  }

  const handleSubbmitUser = async (e, isAdmin = false) => {
    e.preventDefault();

    setIsLoadingAdd(true);

    const data = new FormData();

    data.append("name", newUser.name);
    data.append("lastName", newUser.lastName);
    data.append("email", newUser.email.trim());
    data.append("password", newUser.password.trim());

    if (newUser.address) data.append("address", newUser.address);
    if (newUser.city) data.append("city", newUser.city);
    if (newUser.birth_date) data.append("birth_date", newUser.birth_date);

    if (imgUser) {
      data.append("imageFile", imgUser);
    }

    // Esto diferencia el crear un admin de un usuario regular según el parametro que le pasemos a la función
    data.append("makeAdmin", isAdmin ? "true" : "false");

    try {
      const response = await api.post('/register-user', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      isAdmin ? alert("Usuario administrador creado con éxito") : alert("Usuario NO administrador creado con éxito");

      // LIMPIEZA DEL ESTADO
      setNewUser({ name: "", lastName: "", email: "", password: "", address: "", city: "", birth_date: "" });
      setImgUser(null);
      setIsAddAdminOpen(false);
      setIsAddRegularOpen(false);
      fetchUsers();

    } catch (error) {
      console.error("Error al crear el usuario: ", error);

      if (error.response?.status === 409) {
        alert("No se puede crear el usuario, ya existe un usuario registrado con este email.");
      } else {
        alert("Hubo un problema: " + (error.response?.data?.detail || "Revisa la consola"));
      }

    } finally {
      setIsLoadingAdd(false);
    }

  }

  //Para editar
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setImgUser(null);
    setEditModal(true);
  }

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setSelectedUser((user) => ({...user, [name]: value }));
  };

  const handleSubmitEdit = async (e) => {

    setIsLoadingEdit(true);

    e.preventDefault();

    const data = new FormData();

    if (selectedUser.name) data.append("name", selectedUser.name.trim());
    if (selectedUser.lastName) data.append("lastName", selectedUser.lastName);
    if (selectedUser.email) data.append("email", selectedUser.email.trim());
    if (selectedUser.birth_date) data.append("birth_date", selectedUser.birth_date);
    if (selectedUser.address) data.append("address", selectedUser.address);
    if (selectedUser.city) data.append("city", selectedUser.city);

    if (imgUser) {
      data.append("imageFile", imgUser);
    }

    try {

      const response = await api.post(`/edit-user/${selectedUser.id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("Usuario actualizado con éxito");

      setEditModal(false);
      setImgUser(null);
      fetchUsers(); 

    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
      
      if (error.response?.status === 409) {
        alert("No se puede editar el usuario, ya existe un usuario registrado con este email.");
      } else {
        alert("Hubo un problema: " + (error.response?.data?.detail || "Revisa la consola"));
      }

    } finally {
      setIsLoadingEdit(false);
    }

  }

  // Para borrar
  const handleSubmitDelete = async (id) => {

    setIsLoadingDelete(true);

    /* Esto es lo mismo que en OurFriend para eliminar archivos, si el window.confirm recibe el aceptar (true), elimina el usuario,
    si recibe el cancelar (false) pues se sale de la función */
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
        try {
          const token = sessionStorage.getItem("token");
          await api.delete(`/user/${id}`, {
            headers: {
                    'Authorization': `Bearer ${token}`
                }
          })

          alert("Usuario eliminada con éxito");
          fetchUsers();

        } catch (error) {
          console.error("Error al eliminar usuario", error)
        } finally {
          setIsLoadingDelete(false);
        }
    }

  }

  return (
    <>
      <div className='bg-[#1c2230] min-h-screen flex flex-col'>
        <Header>
          {/* Para movil */}
          <p className='block md:hidden'>
            Administración
          </p>
        </Header>
        <div className='grow flex flex-col justify-center items-center gap-3 mt-5'>

          <button className={buttonClass} onClick={handleAddUserAdmin}>Añadir usuario Administrador</button>

          {/* Formulario para añadir usuario adminustrador */}
          {
            isAddAdminOpen && (
              <CreateNewUser 
                handleSubmit={(e) => handleSubbmitUser(e, true)} 
                setImgUser={setImgUser} 
                setNewUser={setNewUser} 
                newUser={newUser}
                onClose={() => setIsAddAdminOpen(false)}>

                </CreateNewUser>
            )
          }

          <button className={buttonClass} onClick={handleAddUserRegular}>Añadir usuario regular</button>

          {/* Formulario para añadir usuario NO adminustrador */}
          {
            isAddRegularOpen && (
              <CreateNewUser 
                handleSubmit={(e) => handleSubbmitUser(e, false)}
                setImgUser={setImgUser} 
                setNewUser={setNewUser} 
                newUser={newUser}
                onClose={() => setIsAddRegularOpen(false)}>

                </CreateNewUser>
            )
          }
        </div>

        <div className='mt-10 md:mt-5'>
          <button onClick={fetchUsers} className={`${buttonClass} mb-3`}>Mostrar lista de usuarios</button>
        </div>
        <div className='mx-2 md:mx-5 p-0 md:p-5 text-white'>
          {
            users.length > 0 && (

              /* Div para tablet y desktop */
              <div>
                <div className='hidden md:block'>
                  <input type="text" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} placeholder='🔍 Buscar ususario' className='bg-white rounded p-1 text-[#1c2230]' />
                  
                  <table className='w-full text-center mt-3'>
                    <thead>
                      <tr className='text-2xl'>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Eliminar/editar</th>
                      </tr>
                    </thead>
                  
                    <tbody>
                      {
                        filteredUsers.map((user) => (
                          <UserCard key={user.id} user={user} onClickDelete={handleSubmitDelete} OnClickEdit={handleEditUser}></UserCard>
                        ))
                      }
                    </tbody>
                  
                  </table>
                
                </div>

                {/* Div para moviles */}
                <div className='flex flex-col md:hidden gap-4'>
                    {
                      filteredUsers.map((user) => (
                        <div key={user.id} className='border rounded-2xl p-2 text-center'>
                          <div>
                            <p className='font-bold'>Nombre</p>
                            <p className='font-light'>{user.name}</p>
                          </div>
                          <div>
                            <p className='font-bold'>Email</p>
                            <p className='font-light'>{user.email}</p>
                          </div>
                          <div>
                            <p className='font-bold'>Rol</p>
                            <p className='font-light'>{user.roles.join(",")}</p>
                          </div>
                          <div>
                            <p className='font-bold'>Editar/Eliminar</p>
                            <div className='flex gap-3 justify-center p-2'>
                              <DeleteButton onClick={() => handleSubmitDelete(user.id)} optionalClass='!static !w-7 !h-7 !m-0 flex items-center justify-center'></DeleteButton>
                              <EditButton onClick={() => handleEditUser(user)} optionalClass='!static !w-7 !h-7 !m-0 flex items-center justify-center'></EditButton>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                </div>

              </div>
              
          )}
          
        </div>

        <Footer></Footer>

      </div>

      {isLoading && (
        /* en inset-0 para que ocupe toda la pantalla (top-0 right-0 bottom-0 left-0) */
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* defino tamaño del div size y el animate-spin hace girar el div, lo redondeamos con rounded-full, le ponemos borde con border-8,
          color del borde con border-gray y el color del borde top de azum y como esta girando con el spin el borde top se va moviendo */}
          <div className='size-16 animate-spin rounded-full border-8 border-white border-t-blue-400'></div>
          <p className="mt-4 text-xl font-bold text-white">Cargando usuarios...</p>
        </div>
      )}

      {isLoadingAdd && (
        <Loading>Creando usuario...</Loading>
      )}

      {isLoadingEdit && (
        <Loading>Editando usuario...</Loading>
      )}

      {isLoadingDelete && (
        <Loading>Eliminando usuario...</Loading>
      )}

      {
        editModal && (
          <EditUser 
            setEditModal={setEditModal} 
            user={selectedUser}
            handleSubmit={handleSubmitEdit}
            handleChange={handleChangeEdit}
            imgUser={imgUser}
            setImgUser={setImgUser}>

            </EditUser>
        )
      }

    </>
  )
}
