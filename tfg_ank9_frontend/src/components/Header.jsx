import Logo from '../assets/img/LogoTFG.png'
import { Link } from "react-router";
//para la linea de debajo de la página donde estas
import { NavLink } from 'react-router-dom';
import useDeviceType from '../hooks/useDeviceType';
import { useState } from 'react'
import ham from '../assets/img/ham.png'

export default function Header({children}) {

    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const [menuOpen, setMenuOpen] = useState(false);

    //Estilos para que se quede subrayado la página en la que estás.
    const onStyle = 'transition-transform duration-500 active:scale-125 border-b-3';
    const offStyle = 'transition-transform duration-500 active:scale-125 lg:hover:scale-125';

    //Para movil
    if (isMobile) {
        return (
        <nav className="bg-[#21283a] text-white p-4 inset-shadow-sm inset-shadow-gray-500/50">

            <div className="flex justify-between items-center">
                <img src={Logo} alt="Logo" className="w-16" />

                <p className='font-bold text-2xl'>{children}</p>

                {/* Botón menú hamburguesa */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="w-[15%] p-2 font-bold text-2xl flex justify-end">
                    {menuOpen ? "✕" : <img src={ham} alt="Hamburguer menu"></img>}
                </button>
            </div>

            {/* Si el menú esta abierto muestra los links */}
            {menuOpen && (
            <div className="flex flex-col gap-5 mt-5 pb-5 font-bold border-t border-gray-700 pt-5 items-center">
                <Link to='/'>Inicio</Link>
                <Link to='/services'>Servicios</Link>
                <Link to='/ourFriends'>Nuestros amigos</Link>
                <Link to='/register'>Registro</Link>
                <Link to='/login' className="bg-white text-[#21283a] w-full text-center py-2 rounded-lg">Iniciar sesión</Link>
            </div>
            
            )}
        </nav>
        );
    }

    //Para tablet
    if (isTablet) {
        return (
            <div className='w-full flex'>

                {/* Logo */}
                <div className='w-[25%] bg-[#21283a] rounded-br-[15px] p-5'>
                    <img src={Logo} alt="Logo" />
                </div>

                <div className='w-full flex-col'>

                    {/* Barra links */}
                    <div className='w-full bg-[#21283a] h-20 text-white text-sm font-bold flex justify-evenly items-center'>
                        <div className='flex gap-10'>
                            {/* Usamos navLink porque sabe el que página estamos, en vez de Link que No lo sabe
                            y el navLink tiene una propiedad que es el isActive que devuelve true si estás en la página o false si no estas en la pagina */}
                            <NavLink to='/' className={ ({isActive}) => isActive ? onStyle : offStyle }>Inicio</NavLink>
                            <NavLink to='/services' className={ ({isActive}) => isActive ? onStyle : offStyle }>Servicios</NavLink>
                            <NavLink to='/ourFriends' className={ ({isActive}) => isActive ? onStyle : offStyle }>Nuestros amigos</NavLink>
                        </div>
                    
                        <div className='flex gap-10 items-center'>
                            <NavLink to='/login' className='border border-white px-5 py-3 rounded-lg active:bg-white active:text-[#21283a] transition-colors'>Iniciar sesión</NavLink>
                            <NavLink to='/register' className={ ({isActive}) => isActive ? onStyle : offStyle }>Registrate</NavLink>
                        </div>
                        
                    </div>
                    
                    {/* Children para textos */}
                    <div className='flex flex-col items-center justify-center text-white text-center gap-5'>
                        {children}
                    </div>
                </div>
                
            </div>
        );
    }

    //Para versión de escritorio
    if (isDesktop){
        return (
            <div className='w-full flex'>

                {/* Logo */}
                <div className='w-[18%] bg-[#21283a] rounded-br-[15px] p-5'>
                    <img src={Logo} alt="Logo" />
                </div>

                <div className='w-full flex-col'>

                    {/* Barra de links */}
                    <div className='w-full bg-[#21283a] h-25 text-white font-bold flex justify-evenly items-center'>
                        <div className='flex gap-10'>
                            {/* Usamos navLink porque sabe el que página estamos, en vez de Link que No lo sabe
                            y el navLink tiene una propiedad que es el isActive que devuelve true si estás en la página o false si no estas en la pagina */}
                            <NavLink to='/' className={ ({isActive}) => isActive ? onStyle : offStyle }>Inicio</NavLink>
                            <NavLink to='/services' className={ ({isActive}) => isActive ? onStyle : offStyle }>Servicios</NavLink>
                            <NavLink to='/ourFriends' className={ ({isActive}) => isActive ? onStyle : offStyle }>Nuestros amigos</NavLink>
                        </div>
                    
                        <div className='flex gap-10 items-center'>
                            <NavLink to='/login' className='border border-white px-5 py-3 rounded-lg active:bg-white active:text-[#21283a] lg:hover:bg-white lg:hover:text-[#21283a] transition-colors duration-300'>Iniciar sesión</NavLink>
                            <NavLink to='/register' className={ ({isActive}) => isActive ? onStyle : offStyle }>Registrate</NavLink>
                        </div>
                        
                    </div>

                    {/* Children para los textos */}
                    <div className='flex flex-col items-center justify-center text-white text-center gap-5'> 
                        {children}
                    </div>
                </div>
                
            </div>
        )
    }
}
