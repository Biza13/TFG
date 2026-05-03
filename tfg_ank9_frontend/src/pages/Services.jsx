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

export default function Services() {

  const {isMobile, isTablet, isDesktop} = useDeviceType();

  const [services, setServices] = useState([]);

  /* Cogemos el rol para poner o no el boton de editar */
  const roles = sessionStorage.getItem('role');

  let isAdmin = false;

  if (roles) {
      isAdmin = roles.includes("ROLE_ADMIN")
  }

  /* Para el modal de editar el servicio */
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /* Coger las servicios de la bd */
  const fetchServices = async () => {

    try{
      const response = await api.get("/services");

      const services = response.data.member;

      setServices(services);
    }catch (error){
      console.error('Error cargando servicios:', error);
    }
    
  }

  useEffect(() => {
    fetchServices();
  }, []);

  if (isMobile) {
    return (
      <div className='bg-[#1c2230]'>

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
                    <AddButton><p>Añadir servicio</p></AddButton>
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
              >
                {service.description}
              </ServiceCard>
            ))
          }
        </div>

      {isModalOpen && selectedService && (
        <EditService closeModal={closeModal} service={selectedService}></EditService>
      )}

      {/* Footer */}
      <Footer></Footer>
    </div>
    )
  }

  if (isTablet) {
    return (
      <div className='bg-[#1c2230]'>

          {/* Header */}
          <Header>
            <div className='flex gap-5 items-center'>

                  <div>
                    {
                        isAdmin && (
                            <AddButton><p>Añadir servicio</p></AddButton>
                        )
                    }
                  </div>

                  <div className='flex flex-col'>
                    <p className='font-bold text-3xl mt-6'>Servicios de adiestramiento canino deportivo</p>
                    <p className='mb-6'>Programas adaptados al nivel, desciplina y objetivos de cada perro</p>
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
                  >
                    {service.description}
                  </ServiceCard>
                ))
              }
          </div>

        {isModalOpen && selectedService && (
          <EditService closeModal={closeModal} service={selectedService}></EditService>
        )}

        {/* Footer */}
        <Footer></Footer>
      </div>
    )
  }
  
  if (isDesktop) {
    return (
      <div className='bg-[#1c2230]'>

        {/* Header */}
        <Header>

            <div className='flex gap-5 items-center'>

              <div>
                {
                    isAdmin && (
                        <AddButton><p>Añadir servicio</p></AddButton>
                    )
                }
              </div>

              <div className='flex flex-col'>
                <p className='font-bold text-3xl mt-6'>Servicios de adiestramiento canino deportivo</p>
                <p className='mb-6'>Programas adaptados al nivel, desciplina y objetivos de cada perro</p>
              </div>

            </div>

        </Header>
          
        {/* Body */}
        <div className='w-[95%] m-auto flex gap-10 my-5 flex-wrap justify-center'>
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
                >
                  {service.description}
                </ServiceCard>
              ))
            }
        </div>

        {isModalOpen && selectedService && (
          <EditService closeModal={closeModal} service={selectedService}></EditService>
        )}

        {/* Footer */}
        <Footer></Footer>
      </div>
    )
  }
}
