import Header from '../components/Header'
import img from '../assets/img/head.png'
import useDeviceType from '../hooks/useDeviceType'
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer'
import iconDog from '../assets/img/iconDog1.png'
import iconShield from '../assets/img/iconShield1.png'
import iconCup from '../assets/img/iconCup1.png'
import iconPaw from '../assets/img/iconPaw1.png'
import {animate, motion} from 'framer-motion'
import { useEffect, useState } from 'react';
/* Siempre que se haga una llamada a la api hay que poner este import */
import api from '../api/axios'

export default function Home() {

  const {isMobile, isTablet, isDesktop} = useDeviceType();

  const role = sessionStorage.getItem('role');

  const [services, setServices] = useState([]);

  let isAdmin = false;

  if (role) {
      isAdmin = role.includes("ROLE_ADMIN")
  }

  const fetchServices = async () => {

    try{
      const response = await api.get("/services");

      const services = response.data.member;
      console.log(response.data);

      setServices(services);
    }catch (error){
      console.error('Error cargando servicios:', error);
    }
    
  }

  useEffect(() => {
    fetchServices();
  }, []);

    if (isMobile){
        return (
            <>
                {/* Header */}
                <Header>Inicio</Header>

                {/* Cabecera Imagen */}
                <div className='bg-cover bg-center bg-no-repeat bg-[`url(${img})`]' style={{backgroundImage: `url(${img})`}}>

                    <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/50">
                        
                        <div className='w-[90%] py-10 text-white flex flex-col m-auto text-center'>
                        
                            <div className='font-bold text-3xl'>
                                Adiestramiento canino deportivo profesional
                            </div>
                        
                            <div className='text-2xl mt-10'>
                                Disciplica, control y rendimiento para perros deportivos y de trabajo
                            </div>
                        
                        </div>
                        
                    </div>

                </div>

                {/* Sobre nosotros */}
                <div className='w-[90%] m-auto flex flex-col items-center gap-4 py-10 my-3 border-b text-center'>

                    <p className='font-bold text-3xl'>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>

                {/* Servicios */}
                <div className='w-[90%] m-auto text-center py-10'>

                    <p className='font-bold text-3xl'>Nuestros Servicios</p>

                    <div className='w-full flex flex-col gap-5 py-4'>

                        {
                          services.map((service) => (
                            <ServiceCard
                            key = {service.id}
                            title = {service.name}
                            /* Aqui habra quq cambiarlo por la url cuando este desplegado */
                            icon={`http://localhost:8000/uploads/services/${service.icon_route}`}
                            isHome = {true}
                            >
                              {service.shortDescription}
                            </ServiceCard>
                          ))
                        }
                        
                    </div>

                </div>

                {/* Footer */}
                <Footer></Footer>

            </>
        )
    }

    if (isTablet){
        return (
            <>
                {/* Header */}
                <Header></Header>

                {/* Cabecera Imagen */}
                {/* Espero que no haya problema con el mt negativo en el chrome se ve bien */}
                <div className='bg-cover bg-top-left -mt-44 bg-no-repeat bg-[`url(${img})`]' style={{backgroundImage: `url(${img})`}}>

                    <div className="bg-gradient-to-r from-black/80 via-black/40 to-transparent pt-35">
                        
                        <div className='w-[90%] py-10 text-white flex flex-col m-auto text-center'>
                        
                            <motion.div className='font-bold text-5xl'
                            initial={{opacity:0, scale:0.5, y:-500}}
                            animate={{opacity:1, scale:1, y:0}}
                            /* para efecto rebote: el type:spring hace el efecto rebote, el stiffness el la velocidad (cuanto más alto mas rapido), 
                            y el damping (cuanto más bajo más rebote) */
                            transition={{duration:1.5, type:"spring", stiffness: 80, damping: 7}}
                            >
                                Adiestramiento canino deportivo profesional
                            </motion.div>
                        
                            <motion.div className='text-4xl mt-10'
                            initial={{opacity:0, scale:0.5, x:500}}
                            animate={{opacity:1, scale:1, x:0}}
                            transition={{duration:1.5, type:"spring", stiffness: 80, damping:7, delay:1}}
                            >
                                Disciplica, control y rendimiento para perros deportivos y de trabajo
                            </motion.div>
                        
                        </div>
                        
                    </div>

                </div>

                {/* Sobre nosotros */}
                <div className='w-[90%] m-auto flex flex-col items-center gap-4 py-10 my-3 border-b-1'>

                    <p className='font-bold text-5xl'>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>

                {/* Servicios */}
                <div className='w-[90%] m-auto text-center py-10'>

                    <p className='font-bold text-5xl mb-3'>Nuestros Servicios</p>

                    <div className='w-full flex flex-wrap gap-5 py-4 justify-center'>
                        {
                          services.map((service) => (
                            <ServiceCard
                            key = {service.id}
                            title = {service.name}
                            /* Aqui habra quq cambiarlo por la url cuando este desplegado */
                            icon={`http://localhost:8000/uploads/services/${service.icon_route}`}
                            isHome = {true}
                            >
                              {service.shortDescription}
                            </ServiceCard>
                          ))
                        }
                    </div>

                </div>

                {/* Footer */}
                <Footer></Footer>

            </>
        )
    }

    if (isDesktop){
        return (
            <>
                {/* Barra nav y cabecera */}
                <div className='bg-cover bg-top-left bg-no-repeat bg-[`url(${img})`]' style={{backgroundImage: `url(${img})`}}>

                    {/* overlay para la capa oscura de encima de la imagen */}
                    <div className="bg-gradient-to-r from-black/80 via-black/40 to-transparent">
                    
                        {/* Header */}
                        <Header></Header>
                        
                        {/* Cabecera imagen */}
                        <div className='w-[40%] py-20 pl-20 text-white'>
                        
                            <motion.div className='font-bold text-5xl'
                            initial={{opacity:0, scale:0.5, y:-500}}
                            animate={{opacity:1, scale:1, y:0}}
                            /* para efecto rebote: el type:spring hace el efecto rebote, el stiffness el la velocidad (cuanto más alto mas rapido), 
                            y el damping (cuanto más bajo más rebote) */
                            transition={{duration:1.5, type:"spring", stiffness: 80, damping: 7}}
                            >
                                Adiestramiento canino deportivo profesional
                            </motion.div>
                        
                            <motion.div className='text-4xl mt-10'
                            initial={{opacity:0, scale:0.5, x:500}}
                            animate={{opacity:1, scale:1, x:0}}
                            transition={{duration:1.5, type:"spring", stiffness: 80, damping:7, delay:1}}
                            >
                                Disciplica, control y rendimiento para perros deportivos y de trabajo
                            </motion.div>
                        
                        </div>

                    </div>

                </div>

                {/* Sobre nosotros */}
                <div className='w-[90%] m-auto flex flex-col items-center gap-4 py-10 my-3 border-b text-[#21283a]'>

                    <p className='font-bold text-5xl'>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>

                {/* Servicios */}
                <div className='w-[95%] m-auto text-center py-10'>

                    <p className='font-bold text-5xl mb-4 text-[#21283a]'>Nuestros Servicios</p>

                    <div className='w-full grid grid-cols-4 align-baseline py-4 gap-6 m-auto'>

                        {
                          services.map((service) => (
                            <ServiceCard
                            key = {service.id}
                            title = {service.name}
                            /* Aqui habra quq cambiarlo por la url cuando este desplegado */
                            icon={`http://localhost:8000/uploads/services/${service.icon_route}`}
                            isHome = {true}
                            >
                              {service.shortDescription}
                            </ServiceCard>
                          ))
                        }

                    </div>

                </div>

                {/* Footer */}
                <Footer></Footer>
            </>
        )
    }
}
   
