import Logo from '../assets/img/LogoTFG.png'
import { Link } from "react-router";
//para la linea de debajo de la página donde estas
import { NavLink } from 'react-router-dom';
import useDeviceType from '../hooks/useDeviceType';
import { useEffect, useState } from 'react'
import ham from '../assets/img/ham.png'

export default function Header({children}) {

    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const [menuOpen, setMenuOpen] = useState(false);

    const [isLogged, setIsLogged] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [fotoPerfil, setFotoPerfil] = useState('');

    // Definimos la base de la URL de tu API, cuando pongamos dominio habra que cambiarlo
    // Esto es para poner la foto de perfil
    const API_BASE_URL = 'http://localhost:8000';

    const handleLogOut = () => {
        localStorage.clear();
        setIsLogged(false);
        window.location.href = '/';
    }

    useEffect (() => {
        // Cada vez que cargue la página miramos el localStorage
        const token = localStorage.getItem('token');
        //const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName')
        const userPicture = localStorage.getItem('userPicture');

        if (token) {
            setIsLogged(true);
            //setEmail(userEmail);
            setFotoPerfil(userPicture);
            setName(userName);
        }
    }, [])

    //Estilos para que se quede subrayado la página en la que estás.
    const onStyle = 'transition-transform duration-500 active:scale-125 border-b-3';
    const offStyle = 'transition-transform duration-500 active:scale-125 lg:hover:scale-125';

    //Para movil
    if (isMobile) {
        return (
        <nav className="bg-[#21283a] text-white p-4 inset-shadow-sm inset-shadow-gray-500/50">

            <div className="flex justify-between items-center mb-3">
                <img src={Logo} alt="Logo" className="w-16" />

                <p className='font-bold text-2xl'>{children}</p>

                {/* Botón menú hamburguesa */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="w-[15%] p-2 font-bold text-2xl flex justify-end">
                    {menuOpen ? "✕" : <img src={ham} alt="Hamburguer menu"></img>}
                </button>
            </div>

            {
                isLogged && (
                    <div className='flex justify-center gap-5 items-center'>
                                    <div className="bg-[#8a8a8a] p-2 rounded-lg flex gap-2 items-center w-fit shadow-xl">
                                        {/* Foto de usuario (de momento una genérica o la que guardes) */}
                                        <div className='flex justify-center items-center gap-2'>
                                            <div className="bg-[#21283a] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#21283a]">
                                                {
                                                    fotoPerfil ? (
                                                        <img 
                                                        src={`http://localhost:8000/uploads/users/${fotoPerfil}`} 
                                                        className="w-10 h-10 rounded-full object-cover" 
                                                        alt="Avatar"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl">👤</span> 
                                                    )
                                                }
                                                {/* <span className="text-2xl">👤</span>  */}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h2 className="text-sm font-bold text-[#1c2230]">Bienvenid@</h2>
                                            <p className="text-[#21283a] text-sm text italic">{name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={handleLogOut} className='border border-white text-sm px-3 py-2 rounded-lg hover:bg-white hover:text-[#21283a] hover:scale-105 active:bg-white active:text-[#21283a] transition-all'>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                )
            }

            {/* Si el menú esta abierto muestra los links */}
            {menuOpen && (
            <div className="flex flex-col gap-5 mt-5 pb-5 font-bold border-t border-gray-700 pt-5 items-center">
                
                <Link to='/'>Inicio</Link>
                <Link to='/services'>Servicios</Link>
                <Link to='/ourFriends'>Nuestros amigos</Link>
                <div>
                    <Link to='/dogRegister'>Registrar perro</Link>
                </div>
                {
                    !isLogged && (
                        <div className='flex flex-col justify-center items-center gap-5'>
                            <Link to='/register'>Registro</Link>
                            <Link to='/login' className="bg-white text-[#21283a] w-full text-center px-2 py-2 rounded-lg">Iniciar sesión</Link>
                        </div>
                    )
                }
                
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
                    <div className='bg-[#21283a] h-20 text-white text-sm font-bold flex justify-evenly items-center'>
                        <div className='flex gap-10'>
                            {/* Usamos navLink porque sabe el que página estamos, en vez de Link que No lo sabe
                            y el navLink tiene una propiedad que es el isActive que devuelve true si estás en la página o false si no estas en la pagina */}
                            <NavLink to='/' className={ ({isActive}) => isActive ? onStyle : offStyle }>Inicio</NavLink>
                            <NavLink to='/services' className={ ({isActive}) => isActive ? onStyle : offStyle }>Servicios</NavLink>
                            <NavLink to='/ourFriends' className={ ({isActive}) => isActive ? onStyle : offStyle }>Nuestros amigos</NavLink>

                            {
                                isLogged && (
                                    <NavLink to='/dogRegister' className={ ({isActive}) => isActive ? onStyle : offStyle }>Registrar perro</NavLink>
                                )
                            }

                        </div>

                        {
                            isLogged ? (
                                <div className='flex justify-center gap-5 items-center'>
                                    <div className="bg-[#8a8a8a] p-2 rounded-lg flex gap-2 items-center shadow-xl">
                                        {/* Foto de usuario (de momento una genérica o la que guardes) */}
                                        <div className='flex justify-center items-center gap-2'>
                                            <div className="bg-[#21283a] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#21283a]">
                                                {
                                                    fotoPerfil ? (
                                                        <img 
                                                        src={`http://localhost:8000/uploads/users/${fotoPerfil}`} 
                                                        className="w-10 h-10 rounded-full object-cover" 
                                                        alt="Avatar"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl">👤</span> 
                                                    )
                                                }
                                                {/* <span className="text-2xl">👤</span>  */}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h2 className="font-bold text-[#1c2230]">Bienvenid@</h2>
                                            <p className="text-[#21283a] text-sm text italic">{name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={handleLogOut} className='border border-white px-3 py-2 rounded-lg hover:bg-white hover:text-[#21283a] hover:scale-105 active:bg-white active:text-[#21283a] transition-all'>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex gap-10 items-center'>
                                    <NavLink to='/login' className='border border-white px-5 py-3 rounded-lg hover:bg-white hover:text-[#21283a] hover:scale-105 active:bg-white active:text-[#21283a] transition-all'>Iniciar sesión</NavLink>
                                    <NavLink to='/register' className={ ({isActive}) => isActive ? onStyle : offStyle }>Registrate</NavLink>
                                </div>
                            )
                        }

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

                            {
                                isLogged && (
                                    <NavLink to='/dogRegister' className={ ({isActive}) => isActive ? onStyle : offStyle }>Registrar perro</NavLink>
                                )
                            }

                        </div>

                        {
                            isLogged ? (
                                <div className='flex justify-center gap-5 items-center'>
                                    <div className="bg-[#8a8a8a] p-2 rounded-lg flex gap-2 items-center shadow-xl">
                                        {/* Foto de usuario (de momento una genérica o la que guardes) */}
                                        <div className='flex justify-center items-center gap-2'>
                                            <div className="bg-[#21283a] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#21283a]">
                                                {
                                                    fotoPerfil ? (
                                                        <img 
                                                        src={`http://localhost:8000/uploads/users/${fotoPerfil}`} 
                                                        className="w-10 h-10 rounded-full object-cover" 
                                                        alt="Avatar"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl">👤</span> 
                                                    )
                                                }
                                                {/* <span className="text-2xl">👤</span>  */}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h2 className="font-bold text-[#1c2230]">Bienvenid@</h2>
                                            <p className="text-[#21283a] text-sm text italic">{name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={handleLogOut} className='border border-white px-5 py-3 rounded-lg hover:bg-white hover:text-[#21283a] hover:scale-105 active:bg-white active:text-[#21283a] transition-all'>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex gap-10 items-center'>
                                    <NavLink to='/login' className='border border-white px-5 py-3 rounded-lg hover:bg-white hover:text-[#21283a] hover:scale-105 active:bg-white active:text-[#21283a] transition-all'>Iniciar sesión</NavLink>
                                    <NavLink to='/register' className={ ({isActive}) => isActive ? onStyle : offStyle }>Registrate</NavLink>
                                </div>
                            )
                        }
                        
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
