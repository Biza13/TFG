import Logo from '../assets/img/LogoTFG.png'
import { Link } from "react-router";

export default function Header() {
  return (
    <div className='w-full flex'>
        <div className='w-[18%] bg-[#21283a] rounded-br-[15px] p-5'>
            <img src={Logo} alt="Logo" />
        </div>

        <div className='w-full bg-[#21283a] h-25 text-white font-bold flex justify-evenly items-center'>
            <div className='flex gap-10'>
                <Link to='/'>Inicio</Link>
                <Link to='/services'>Servicios</Link>
                <Link to='/ourFriends'>Nuestros amigos</Link>
            </div>

            <div className='flex gap-10 items-center'>
                <Link to='/login' className='border border-white px-5 py-3 rounded-lg'>Iniciar sesión</Link>
                <Link to='/register'>Registrate</Link>
            </div>
        </div>
    </div>
  )
}
