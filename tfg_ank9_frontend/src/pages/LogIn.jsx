import { useState } from 'react'
import Header from '../components/Header'
import api from '../api/axios'
import Footer from '../components/Footer';
import { NavLink } from 'react-router';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //la url login_check es donde enviamos las credenciales para que jwt nos de el token
      const response = await api.post('/login_check', {
        username: email, // Symfony espera 'username' que en nuestro caso sera el correo
        password: password
      });
      //Cuando haces login, symfony te devuelve un json con una sola clave (el token).
      console.log('¡Token recibido!', response.data.token);
      alert('Login correcto. Mira la consola (F12)');
    } catch (error) {
      console.error('Error en el login', error);
      alert('Error al conectar con el backend');
    }
  }

  return (
    <>
      <div className='bg-[#1c2230]'>
        <Header></Header>


        
        {/* <div className='w-full bg-red-500'>
          <h1>Prueba de Login TFG</h1>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button type="submit">Entrar</button>
          </form>
        </div> */}

        <div className='w-[90%] md:w-[80%] lg:w-[30%] rounded bg-[#8a8a8a] m-auto p-5 my-10'>
          <form onSubmit={handleLogin} className='flex flex-col justify-center items-center gap-5'>

            <div className='w-[95%] md:w-[80%] flex flex-col items-center'>
              <label htmlFor="" className='flex self-start gap-2'>Correo <p className='text-red-600'>*</p></label>
              <input type="email" placeholder="example@example.com" onChange={e => setEmail(e.target.value)} className='w-full bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a] invalid:focus:ring-red-700' />
            </div>

            <div className='w-[95%] md:w-[80%] flex flex-col items-center'>
              <label htmlFor="" className='flex self-start gap-2'>Contraseña <p className='text-red-600'>*</p></label>
              <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className='w-full bg-white rounded p-2 focus:outline-none focus:ring-3 focus:ring-[#21283a]' />
            </div>

            <p className='flex flex-wrap gap-1 text-[10px] md:text-base'>Los compos con<p className='text-red-600'>*</p>son obligatorios</p>

            <button type="submit" className='ring-[#21283a] ring-2 py-2 px-3 rounded bg-[#21283a] text-white hover:text-[#21283a] hover:bg-white transition-colors duration-300 font-bold cursor-pointer hover:scale-105 active:bg-white active:text-[#21283a]'>Entrar</button>
          </form>

        </div>

        <p className='text-center text-white mb-10'>Si aun no estas registrado <NavLink to='/register'> <i className='border-b'><b>Pulsa aquí</b></i></NavLink></p>

        <Footer></Footer>

      </div>
    </>
    
  )
}
