import Header from '../components/Header'
import img from '../assets/img/head.png'
import useDeviceType from '../hooks/useDeviceType'
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer'
import iconDog from '../assets/img/iconDog1.png'
import iconShield from '../assets/img/iconShield1.png'
import iconCup from '../assets/img/iconCup1.png'
import iconPaw from '../assets/img/iconPaw1.png'

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
                <div className='w-[90%] m-auto flex flex-col items-center gap-4 py-10 my-3 border-b text-center'>

                    <p className='font-bold text-3xl'>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>

                {/* Servicios */}
                <div className='w-[90%] m-auto text-center py-10'>

                    <p className='font-bold text-3xl'>Nuestros Servicios</p>

                    <div className='w-full flex flex-col gap-5 py-4'>
                        <ServiceCard
                        title="Obediencia deportiva"
                        icon ={iconDog}
                        isHome={true}
                        eje={"x"}
                        mov={-100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>
                        <ServiceCard 
                        title="IGP & Mondioring"
                        icon ={iconShield}
                        isHome={true}
                        eje={"x"}
                        mov={100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>

                        <ServiceCard 
                        title="Modificación de conducta"
                        icon ={iconPaw}
                        isHome={true}
                        eje={"x"}
                        mov={-100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>

                        <ServiceCard 
                        title="Preparación de pruebas"
                        icon ={iconCup}
                        isHome={true}
                        eje={"x"}
                        mov={100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>
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
                <Header></Header>

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
                <div className='w-[90%] m-auto flex flex-col items-center gap-4 py-10 my-3 border-b-1'>

                    <p className='font-bold text-5xl'>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>

                {/* Servicios */}
                <div className='w-[90%] m-auto text-center py-10'>

                    <p className='font-bold text-5xl mb-3'>Nuestros Servicios</p>

                    <div className='w-full flex flex-wrap gap-5 py-4 justify-center'>
                        <ServiceCard
                        title="Obediencia deportiva"
                        icon ={iconDog}
                        isHome={true}
                        eje={"x"}
                        mov={-100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>
                        <ServiceCard 
                        title="IGP & Mondioring"
                        icon ={iconShield}
                        isHome={true}
                        eje={"y"}
                        mov={100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>

                        <ServiceCard 
                        title="Modificación de conducta"
                        icon ={iconPaw}
                        isHome={true}
                        eje={"y"}
                        mov={100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>

                        <ServiceCard 
                        title="Preparación de pruebas"
                        icon ={iconCup}
                        isHome={true}
                        eje={"x"}
                        mov={100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>
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
                    
                        <Header></Header>
                        
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
                <div className='w-[90%] m-auto flex flex-col items-center gap-4 py-10 my-3 border-b text-[#21283a]'>

                    <p className='font-bold text-5xl'>Sobre Nosotros</p>
                    <p>Somos un equipo de profesionales dedicados al <b>adiestramiento canino deportivo.</b></p>
                    <p>Nuestra misión es ayudar a los perros y a sus guias a alcanzar su máximo potencial</p>

                </div>

                {/* Servicios */}
                <div className='w-[95%] m-auto text-center py-10'>

                    <p className='font-bold text-5xl mb-4 text-[#21283a]'>Nuestros Servicios</p>

                    <div className='w-full flex justify-between py-4'>

                        <ServiceCard 
                        title="Obediencia deportiva"
                        icon ={iconDog}
                        isHome={true}
                        eje={"x"}
                        mov={-100}>
                            Entrenamiento en obediencia avanzada
                        </ServiceCard>

                        <ServiceCard 
                        title="IGP & Mondioring"
                        icon ={iconShield}
                        isHome={true}
                        eje={"y"}
                        mov={100}>
                            Preparación para deportes de protección
                        </ServiceCard>

                        <ServiceCard 
                        title="Modificación de conducta"
                        icon ={iconPaw}
                        isHome={true}
                        eje={"y"}
                        mov={100}>
                            Solución de problemas de comportamiento
                        </ServiceCard>

                        <ServiceCard 
                        title="Preparación de pruebas"
                        icon ={iconCup}
                        isHome={true}
                        eje={"x"}
                        mov={100}>
                            Entrenamiento para pruebas y competiciones
                        </ServiceCard>

                    </div>

                </div>

                {/* Footer */}
                <Footer></Footer>
            </>
        )
    }
}
   
