import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ServiceCard from '../components/ServiceCard'
import iconDog from '../assets/img/iconDog1.png'
import iconShield from '../assets/img/iconShield1.png'
import iconCup from '../assets/img/iconCup1.png'
import iconPaw from '../assets/img/iconPaw1.png'
import Footer from '../components/Footer'
import useDeviceType from '../hooks/useDeviceType'
import api from '../api/axios'
import EditService from '../components/EditService'
import AddButton from '../components/AddButton'
import AddService from '../components/AddService'
import DeleteService from '../components/DeleteService'
import Loading from '../components/Loading';

export default function Services() {

  const {isMobile, isTablet, isDesktop} = useDeviceType();

  const [isLoading, setIsLoading] = useState(false);

  const [services, setServices] = useState([]);

  /* Cogemos el rol para poner o no el boton de editar */
  const roles = sessionStorage.getItem('role');

  let isAdmin = false;

  /* El includes devolvera true si se cumple la condición */
  if (roles) {
      isAdmin = roles.includes("ROLE_ADMIN")
  }

  /* Para el modal de editar, añadir el servicio */
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  /* Para editar servicio */
  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  /* Para añadir servicio */
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  /* Para borrar servicio */
  const handleDelete = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  /* Coger las servicios de la bd */
  const fetchServices = async () => {

    setIsLoading(true);

    try{
      const response = await api.get("/services");

      // si es undefined (??) devolvera un array vacio. para que no de error en caso de estar la bd vacía
      const services = response.data.member ?? [];

      setServices(services);
    }catch (error){
      console.error('Error cargando servicios:', error);
    } finally {
      setIsLoading(false);
    }
    
  }

  useEffect(() => {
    fetchServices();
  }, []);

  if (isMobile) {
    return (
      <div className='bg-[#1c2230] overflow-x-hidden'>

        {/* Header */}
        <Header>
          <div>
            <p>Servicios</p>
          </div>
        </Header>
          
        {/* Body */}
        <div className='w-[90%] m-auto flex gap-5 my-5 flex-wrap justify-center'>
          <div className='text-white'>
            {
                isAdmin && (
                    <AddButton add={handleAdd}><p>Añadir servicio</p></AddButton>
                )
            }
          </div>

          {
            services.map((service) => (
              <ServiceCard
              key = {service.id}
              title = {service.name}
              /* Aqui habra quq cambiarlo por la url cuando este desplegado */
              icon={`http://localhost:8000/uploads/services/${service.icon_route}`}
              isHome = {false}
              featureTitle = {service.titleFeatures}
              features = {service.features}
              featureTitle2={service.titleFeatures2}
              features2 = {service.features2}
              showEditButton={true}
              service={service}
              edit={handleEdit}
              deleteS={handleDelete}
              >
                {service.description}
              </ServiceCard>
            ))
          }
        </div>

        {/* Modal para editar servicio */}
        {isEditModalOpen && selectedService && (
          <EditService closeEditModal={closeEditModal} service={selectedService}></EditService>
        )}

        {/* Modal para añadir servicio */}
        {isAddModalOpen && (
          <AddService closeAddModal={closeAddModal}></AddService>
        )}

        {/* Modal para eliminar servicio */}
        {isDeleteModalOpen && selectedService && (
          <DeleteService closeDeleteModal={closeDeleteModal} service={selectedService}></DeleteService>
        )}

      {/* Footer */}
      <Footer></Footer>

      {isLoading && (
        <Loading>Cargando servicios...</Loading>
      )}
    </div>
    )
  }

  if (isTablet) {
    return (
      <div className='bg-[#1c2230] overflow-x-hidden'>

          {/* Header */}
          <Header>
            <div className='flex gap-5 items-center'>

                  <div>
                    {
                        isAdmin && (
                            <AddButton add={handleAdd}><p>Añadir servicio</p></AddButton>
                        )
                    }
                  </div>

                  <div className='flex flex-col'>
                    <p className='font-bold text-3xl mt-6'>Servicios de adiestramiento canino deportivo</p>
                    <p className='mb-6'>Programas adaptados al nivel, disciplina y objetivos de cada perro</p>
                  </div>

                </div>
          </Header>
                  
          {/* Body */}
          <div className='w-[95%] m-auto flex gap-5 my-5 flex-wrap justify-center'>
              {
                services.map((service) => (
                  <ServiceCard
                  key = {service.id}
                  title = {service.name}
                  /* Aqui habra quq cambiarlo por la url cuando este desplegado */
                  icon={`http://localhost:8000/uploads/services/${service.icon_route}`}
                  isHome = {false}
                  featureTitle = {service.titleFeatures}
                  features = {service.features}
                  featureTitle2={service.titleFeatures2}
                  features2 = {service.features2}
                  showEditButton={true}
                  service={service}
                  edit={handleEdit}
                  deleteS={handleDelete}
                  >
                    {service.description}
                  </ServiceCard>
                ))
              }
          </div>

          {/* Modal para editar servicio */}
          {isEditModalOpen && selectedService && (
            <EditService closeEditModal={closeEditModal} service={selectedService}></EditService>
          )}

          {/* Modal para añadir servicio */}
          {isAddModalOpen && (
            <AddService closeAddModal={closeAddModal}></AddService>
          )}

          {/* Modal para eliminar servicio */}
          {isDeleteModalOpen && selectedService && (
            <DeleteService closeDeleteModal={closeDeleteModal} service={selectedService}></DeleteService>
          )}

        {/* Footer */}
        <Footer></Footer>

        {isLoading && (
           <Loading>Cargando servicios...</Loading>
         )}

      </div>
    )
  }
  
  if (isDesktop) {
    return (
      <div className='bg-[#1c2230] min-h-screen flex flex-col overflow-x-hidden'>

        {/* Header */}
        <Header>

            <div className='flex gap-5 items-center justify-center'>

              <div>
                {
                    isAdmin && (
                        <AddButton add={handleAdd}><p>Añadir servicio</p></AddButton>
                    )
                }
              </div>

              <div className='flex flex-col'>
                <p className='font-bold text-3xl mt-6'>Servicios de adiestramiento canino deportivo</p>
                <p className='mb-6'>Programas adaptados al nivel, disciplina y objetivos de cada perro</p>
              </div>

            </div>

        </Header>
          
        {/* Body */}
        <div className='grow flex flex-col justify-center'>
          <div className='w-[95%] m-auto flex gap-10 my-5 flex-wrap justify-center'>
              {
                services?.map((service) => (
                  <ServiceCard
                  key = {service.id}
                  title = {service.name}
                  /* Aqui habra quq cambiarlo por la url cuando este desplegado */
                  icon={`http://localhost:8000/uploads/services/${service.icon_route}`}
                  isHome = {false}
                  featureTitle = {service.titleFeatures}
                  features = {service.features}
                  featureTitle2={service.titleFeatures2}
                  features2 = {service.features2}
                  showEditButton={true}
                  service={service}
                  edit={handleEdit}
                  deleteS={handleDelete}
                  >
                    {service.description}
                  </ServiceCard>
                ))
              }
          </div>
          
          {/* Modal para editar servicio */}
          {isEditModalOpen && selectedService && (
            <EditService closeEditModal={closeEditModal} service={selectedService}></EditService>
          )}

          {/* Modal para añadir servicio */}
          {isAddModalOpen && (
            <AddService closeAddModal={closeAddModal}></AddService>
          )}

          {/* Modal para eliminar servicio */}
          {isDeleteModalOpen && selectedService && (
            <DeleteService closeDeleteModal={closeDeleteModal} service={selectedService}></DeleteService>
          )}

        </div>

        {/* Footer */}
        <Footer></Footer>

        {isLoading && (
          <Loading>Cargando servicios...</Loading>
        )}

      </div>
    )
  }
}
