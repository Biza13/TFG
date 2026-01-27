import { useState } from 'react'
import Header from '../components/Header'

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
      <Header></Header>
      <div className='w-full bg-red-500'>
        <h1>Prueba de Login TFG</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
    
  )
}
