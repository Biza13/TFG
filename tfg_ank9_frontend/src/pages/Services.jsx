import React from 'react'
import Header from '../components/Header'
import ServiceCard from '../components/ServiceCard'
import iconDog from '../assets/img/iconDog1.png'
import iconShield from '../assets/img/iconShield1.png'
import iconCup from '../assets/img/iconCup1.png'
import iconPaw from '../assets/img/iconPaw1.png'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <div className='bg-[#1c2230]'>
        <Header>
          <p className='font-bold text-3xl mt-5'>Servicios de adiestramiento canino deportivo</p>
          <p>Programas adaptados al nivel, desciplina y objetivos de cada perro</p>
        </Header>
          
        <div className='w-[90%] m-auto flex gap-5 my-5 flex-wrap justify-center'>
            <ServiceCard 
            title="Obediencia deportiva"
            icon ={iconDog}
            isHome={false}
            eje={"x"}
            mov={-100}>
                Entrenamiento en obediencia avanzada
            </ServiceCard>
          
            <ServiceCard 
            title="IGP & Mondioring"
            icon ={iconShield}
            isHome={false}
            eje={"y"}
            mov={100}>
                Entrenamiento en obediencia avanzada
            </ServiceCard>
          
            <ServiceCard 
            title="Modificación de conducta"
            icon ={iconPaw}
            isHome={false}
            eje={"y"}
            mov={100}>
                Entrenamiento en obediencia avanzada
            </ServiceCard>
          
            <ServiceCard 
            title="Preparación de pruebas"
            icon ={iconCup}
            isHome={false}
            eje={"x"}
            mov={100}>
                Entrenamiento en obediencia avanzada
            </ServiceCard>
        </div>

      <Footer></Footer>
    </div>
  )
}
