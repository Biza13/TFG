import React from 'react'
import Header from '../components/Header'
import useDeviceType from '../hooks/useDeviceType';

export default function OurFriends() {

  const {isMobile, isTablet, isDesktop} = useDeviceType();

  if (isMobile){
    return (
      <Header>Nuestros amigos</Header>
    )
  }

  return(
    <div className='bg-[#1c2230]'>

      <Header>
        <p className='font-bold text-3xl mt-5'>Algunas de las actividades que realizamos con nuestros amigos Caninos</p>
        <p>Y con las que disfrutamos todos</p>
      </Header>

      {/* Carrousel */}
      

    </div>
  )
}
