import React from 'react'
import Header from '../components/Header'
import useDeviceType from '../hooks/useDeviceType';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel'

export default function OurFriends() {

  const {isMobile, isTablet, isDesktop} = useDeviceType();

  if (isMobile){
    return (
      <Header>Nuestros amigos</Header>
    )
  }

  return(
    <div className='bg-[#1c2230]'>

      {/* Header */}
      <Header>
        <p className='font-bold text-3xl mt-5'>Algunas de las actividades que realizamos con nuestros amigos Caninos</p>
        <p>Y con las que disfrutamos todos</p>
      </Header>

      {/* Body */}
      <div className='my-10'>

        {/* Carrousel */}
        <Carousel></Carousel>

      </div>

      {/* Footer */}
      <Footer></Footer>

    </div>
  )
}
