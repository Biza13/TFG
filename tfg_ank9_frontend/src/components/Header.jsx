import Logo from '../assets/img/LogoTFG.png'
import { Link } from "react-router";
import useDeviceType from '../hooks/useDeviceType';
import { useState } from 'react'
import ham from '../assets/img/ham.png'

export default function Header({children}) {

    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const [menuOpen, setMenuOpen] = useState(false);

    //Para movil
    if (isMobile) {
        return (
        <nav className="bg-[#21283a] text-white p-4">
            <div className="flex justify-between items-center">
                <img src={Logo} alt="Logo" className="w-16" />

                <p className='font-bold text-2xl'>{children}</p>

                <button onClick={() => setMenuOpen(!menuOpen)} className="w-[15%] p-2 font-bold text-2xl flex justify-end">
                    {menuOpen ? "✕" : <img src={ham} alt="Hamburguer menu"></img>}
                </button>
            </div>
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

                <div className='w-[25%] bg-[#21283a] rounded-br-[15px] p-5'>
                    <img src={Logo} alt="Logo" />
                </div>

                <div className='w-full bg-[#21283a] h-20 text-white text-sm font-bold flex justify-evenly items-center'>
                    <div className='flex gap-10'>
                        <Link to='/' className='transition-transform duration-500 active:scale-125'>Inicio</Link>
                        <Link to='/services' className='transition-transform duration-500 active:scale-125'>Servicios</Link>
                        <Link to='/ourFriends' className='transition-transform duration-500 active:scale-125'>Nuestros amigos</Link>
                    </div>

                    <div className='flex gap-10 items-center'>
                        <Link to='/login' className='border border-white px-5 py-3 rounded-lg active:bg-white active:text-[#21283a] transition-colors'>Iniciar sesión</Link>
                        <Link to='/register' className='transition-transform duration-500 active:scale-125'>Registrate</Link>
                    </div>
                    
                </div>
                
            </div>
        );
    }

    //Para versión de escritorio
    if (isDesktop){
        return (
            <div className='w-full flex'>

                <div className='w-[18%] bg-[#21283a] rounded-br-[15px] p-5'>
                    <img src={Logo} alt="Logo" />
                </div>

                <div className='w-full flex-col'>
                    <div className='w-full bg-[#21283a] h-25 text-white font-bold flex justify-evenly items-center'>
                        <div className='flex gap-10'>
                            <Link to='/' className='transition-transform duration-500 hover:scale-125'>Inicio</Link>
                            <Link to='/services' className='transition-transform duration-500 hover:scale-125'>Servicios</Link>
                            <Link to='/ourFriends' className='transition-transform duration-500 hover:scale-125'>Nuestros amigos</Link>
                        </div>
                    
                        <div className='flex gap-10 items-center'>
                            <Link to='/login' className='border border-white px-5 py-3 rounded-lg transition-colors duration-700 hover:bg-white hover:text-[#21283a]'>Iniciar sesión</Link>
                            <Link to='/register' className='transition-transform duration-500 hover:scale-125'>Registrate</Link>
                        </div>
                        
                    </div>

                    <div className='flex flex-col items-center text-white'> 
                        {children}
                    </div>
                </div>
                
            </div>
        )
    }
}
