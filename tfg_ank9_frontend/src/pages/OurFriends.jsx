import React from 'react'
import { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Carousel from '../components/Carousel'
import p1 from '../assets/img/p1.jpeg'
import p2 from '../assets/img/p2.jpg'
import p3 from '../assets/img/p3.jpg'
import p4 from '../assets/img/p4.jpg'
import p5 from '../assets/img/p5.jpg'
import p6 from '../assets/img/p6.png'
import p7 from '../assets/img/p7.jpeg'
import ImgModal from '../components/ImgModal';

export default function OurFriends() {

  /* Bloque Bajo prueba */
  const imgsGallery = [
    {pi: p1},
    {pi: p2},
    {pi: p3},
    {pi: p4},
    {pi: p5},
    {pi: p6},
    {pi: p7},
    {pi: p7},
    {pi: p7},
  ];

  const [selectedImg, setSelectedImg] = useState(null);
  /* Fin bloque bajo prueba */

  /* Para mobil, tablet y escritorio */
  return(
    <div className='bg-[#1c2230]'>

      {/* Header */}
      <Header>
        
        {/* Children para cuando esta en tablet o escritorio */}
        <p className='font-bold text-3xl mt-5 hidden md:block'>Algunas de las actividades que realizamos con nuestros amigos Caninos</p>
        <p className='hidden md:block'>Y con las que disfrutamos todos</p>
        
        {/* Children para cuando esta en movil */}
        <p className='block md:hidden'>
          Nuestros amigos
        </p>
        
      </Header>

      {/* Body */}
      <div className='my-10'>

        {/* Carousel */}
        <Carousel></Carousel>

        {/* Bloque bajo prueba */}
        <div className='w-[90%] m-auto grid grid-cols-2 md:grid-cols-3 gap-5 justify-center items-center my-5 mt-8'>
          {imgsGallery.map((item, index) => {
            return <img key={index} src={item.pi} alt={'image '+index} onClick={() => setSelectedImg(item.pi)} className="w-full aspect-video object-contain rounded-xl ring ring-white shadow-md shadow-white hover:scale-105 transition-transform"></img>
          })}
        </div>

        {selectedImg && (
          <ImgModal imgSrc={selectedImg} setSelectedImg={setSelectedImg} />
        )}
        {/* Fin bloque bajo prueba */}

      </div>

      {/* Footer */}
      <Footer></Footer>

    </div>
  )
}
