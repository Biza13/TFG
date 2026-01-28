import Header from '../components/Header'
import img from '../assets/img/head.png'
import useDeviceType from '../hooks/useDeviceType'
import ServiceCard from '../components/ServiceCard';

export default function Home() {

    const {isMobile, isTablet, isDesktop} = useDeviceType();

    if (isMobile){
        return (
            <>

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
                <div>

                    <p>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>
            </>
        )
    }

    if (isTablet){
        return (
            <>
                <Header>Inicio</Header>

                {/* Cabecera Imagen */}
                {/* Espero que no haya problema con el mt negativo en el chrome se ve bien */}
                <div className='bg-cover bg-top-left -mt-35 bg-no-repeat bg-[`url(${img})`]' style={{backgroundImage: `url(${img})`}}>

                    <div className="bg-gradient-to-r from-black/80 via-black/40 to-transparent pt-35">
                        
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
                <div>

                    <p>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>
            </>
        )
    }

    if (isDesktop){
        return (
            <>
                {/* Barra nav y cabecera */}
                <div className='bg-cover bg-top-left bg-no-repeat bg-[`url(${img})`]' style={{backgroundImage: `url(${img})`}}>

                    {/* overlay para la capa oscura de encima de la imagen */}
                    {/* en inset-0 estira el div a todo lo ancho y largo de la caja padre */}
                    <div className="bg-gradient-to-r from-black/80 via-black/40 to-transparent">
                    
                        <Header>Inicio</Header>
                        
                        <div className='w-[40%] py-20 pl-20 text-white'>
                        
                            <div className='font-bold text-5xl'>
                                Adiestramiento canino deportivo profesional
                            </div>
                        
                            <div className='text-4xl mt-10'>
                                Disciplica, control y rendimiento para perros deportivos y de trabajo
                            </div>
                        
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

                    <p className='font-bold text-5xl'>Nuestros Servicios</p>

                    <div className='w-full flex'>
                        <ServiceCard></ServiceCard>
                        <ServiceCard></ServiceCard>
                        <ServiceCard></ServiceCard>
                        <ServiceCard></ServiceCard>
                    </div>

                </div>
            </>
        )
    }
}
   
