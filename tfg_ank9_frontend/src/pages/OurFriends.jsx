import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Carousel from '../components/Carousel'
import p1 from '../assets/img/p1.jpeg'
import p2 from '../assets/img/p2.jpg'
import p3 from '../assets/img/p3.jpg'
import p4 from '../assets/img/p4.jpg'
import p5 from '../assets/img/p5.jpg'
import p6 from '../assets/img/p6.png'
import p7 from '../assets/img/p7.jpeg'
import ImgModal from '../components/ImgModal';
import api from '../api/axios';
import ImgCard from '../components/ImgCard';
import AddButton from '../components/AddButton';
import Loading from '../components/Loading';

export default function OurFriends() {

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAddMulti, setIsLoadingAddMulti] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  /* Cogemos el rol para poner o no el boton de añadir y eliminar */
  const roles = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  let isAdmin = false;

  /* El includes devolvera true si se cumple la condición */
  if (roles) {
      isAdmin = roles.includes("ROLE_ADMIN")
  }

  /* Coger las imagenes de la bd */
  const [imgGallery, setImgGallery] = useState([]);

  const fetchImgs = async () => {

    setIsLoading(true);

    try {
      const response = await api.get("/galleries");

      // Los videos y las fotos estan en response.data.member
      // si es undefined (??) devolvera un array vacio. para que no de error en caso de estar la bd vacía
        const elements = response.data.member ?? [];

        const onlyImgs = elements.filter(item => item.type === 'image');
            setImgGallery(onlyImgs);
    } catch (error) {
      const status = error.response ? error.response.status : 'No response';
      console.error("Error cargando la galeria. Status: ", status);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchImgs();
  }, []);

  /* Estado para abrir los modales de las imagenes */
  const [selectedImg, setSelectedImg] = useState(null);

  const [fileToAdd, setFileToAdd] = useState ({
    text: "",
    imgvideo_route: null,
    type: "",
  })

  /* Cogemos el archivo y lo metemos en el estado */
  const handleAddMedia = ((e) => {
    /* Cogemos el archivo que se va a seleccionar */
    setFileToAdd ({ ...fileToAdd, imgvideo_route: e.target.files[0] })
  })

  /* Función para meter en el fileToAdd los datos recogidos en el formulario con las propiedades de los inputs de name y onChange */
  const handleFillData = (e) => {
    /* A la propiedad name de cada input se le va a dar el valor que escribamos en el input */
    const {name, value} = e.target;
    setFileToAdd ({ ...fileToAdd, [name]: value });
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    setIsLoadingAddMulti(true);

    const data = new FormData();

    data.append('text', fileToAdd.text);
    data.append('type', fileToAdd.type);

    if(fileToAdd.imgvideo_route){
      data.append('imageFile', fileToAdd.imgvideo_route)
    }

    try {
      await api.post("/galleries", data);
      alert("Archivo añadido con éxito");
      window.location.reload();
    
    } catch (error) {
      console.error("Error al añadir el archivo: ", error);
      console.error("Error completo:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      alert("Error al añadir el archivo");
    } finally {
      setIsLoadingAddMulti(false);
    }

  }

  const handleDelete = async (id) => {

    setIsLoadingDelete(true);

    /* lo que hace este bloque: window.confirm (la pantalla de alerta) si le damos a cancelar, este devuelve un false pero 
    con la condición de ! delante lo convierte en un true por lo que entra dentro del if y hace el return, es decir se sale de la 
    función sin hacer nada, por otro lado si le das a aceptar el window.confirm devuelve true pero al poner la condición de ! delante es un false
    por lo que no entra dentro deel if y hace el eliminado el archivo */
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen o video?")) {
        return;
    }

    try {
      const token = sessionStorage.getItem("token");

      await api.delete(`/galleries/${id}`, {
        // Este parentesis lo podria eliminar como he hecho en el handleUpload ya que esta ya puesto por defecto en axios.js
        headers: {
                'Authorization': `Bearer ${token}`
            }
      });

        alert("Imagen o video eliminada con éxito");
        window.location.reload();

    } catch (error) {
      console.error("Error al borrar:", error);
      alert("No se pudo eliminar la imagen o el video");
    } finally {
      setIsLoadingDelete(false);
    }

  }

  /* Para mobil, tablet y escritorio */
  return(
    <div className='bg-[#1c2230]'>

      {/* Header */}
      <Header>
        
        <div className='gap-5'>
          
          <div>
            {/* Children para cuando esta en tablet o escritorio */}
            <p className='font-bold text-3xl mt-5 hidden md:block'>Algunas de las actividades que realizamos con nuestros amigos Caninos</p>
            <p className='hidden md:block text-2xl'>Y con las que disfrutamos todos</p>
          </div>        
          
        </div>
        
        {/* Children para cuando esta en movil */}
        <p className='block md:hidden'>
          Nuestros amigos
        </p>
        
      </Header>

      {/* Body */}
      <div className='my-10'>

        {
            isAdmin && (                
                <div className="w-[95%] md:w-[35%] bg-[#21283a] p-3 md:p-6 rounded-2xl border border-white/10 my-8 flex flex-col m-auto items-center justify-center">

                  <label className="block text-white text-sm font-medium mb-2">
                    Añadir nuevo contenido a la galería
                  </label>
                  
                  <div className='w-full flex flex-col justify-center items-center'>
                    <input 
                      type="file" 
                      onChange={handleAddMedia}
                      accept="image/*,video/*"
                      className="block w-fit text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                       file:bg-white/10 file:text-white
                       hover:file:bg-white/20
                        file:cursor-pointer"
                    />
                    {fileToAdd.imgvideo_route && (
                      <div className='text-white my-5 w-full flex-flex-col text-center'>

                        <form onSubmit={handleUpload} className='flex flex-col justify-center items-center gap-3'>

                          <div className='w-full flex flex-col gap-2 my-3'>
                            <label htmlFor="text">
                              Texto
                            </label>
                            <input name='text' onChange={handleFillData} type="text" placeholder='texto descriptivo' className='w-full text-center ring rounded-2xl p-2' />
                          </div>

                          <div className='flex flex-col'>
                            <p className='mb-2'>Seleccione el tipo de archivo: *</p>

                            <div className='flex gap-10 justify-center'>

                              <div className='flex gap-2'>
                                <label htmlFor="type">Imagen</label>
                                <input name='type' onChange={handleFillData} type="radio" value="image" required />
                              </div>

                              <div className='flex gap-2'>
                                <label htmlFor="type">Video</label>
                                <input name='type' onChange={handleFillData} type="radio" value="video" />
                              </div>

                            </div>

                          </div>

                          <button 
                            type='submit'
                            className="mt-4 w-[50%] bg-white/10 hover:bg-[#1c2230] ring text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg cursor-pointer"
                            >
                            Subir archivo
                          </button>

                        </form>
                        
                      </div>
                    )}
                  </div>
                  
                  {/* <p className="mt-2 text-xs text-gray-500">
                    Formatos admitidos: Imágenes (jpg, png) y Videos (mp4).
                  </p> */}

                </div>
            )
          }
        
        {/* Carousel */}
        <Carousel isAdmin={isAdmin} handleDelete={handleDelete}></Carousel>

        <div className='w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center my-5 mt-8'>
          {imgGallery.map((item, index) => {
            return <ImgCard 
                      img={item} 
                      imgSelected={() => setSelectedImg(`http://localhost:8000/uploads/gallery/${item.imgvideo_route}`)}
                      handleDelete={() => handleDelete(item.id)}  
                      isAdmin={isAdmin}
                    ></ImgCard>
          })}
        </div>

        {selectedImg && (
          <ImgModal imgSrc={selectedImg} setSelectedImg={setSelectedImg} />
        )}
        {/* Fin bloque bajo prueba */}

      </div>

      {/* Footer */}
      <Footer></Footer>

      {isLoading && (
        <Loading>Cargando...</Loading>
      )}

      {isLoadingAddMulti && (
        <Loading>Añadiendo archivos...</Loading>
      )}

      {isLoadingDelete && (
        <Loading>Eliminando archivos...</Loading>
      )}

    </div>
  )
}
