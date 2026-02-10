import React from 'react'
import Header from '../components/Header'
import ServiceCard from '../components/ServiceCard'
import iconDog from '../assets/img/iconDog1.png'
import iconShield from '../assets/img/iconShield1.png'
import iconCup from '../assets/img/iconCup1.png'
import iconPaw from '../assets/img/iconPaw1.png'
import Footer from '../components/Footer'
import useDeviceType from '../hooks/useDeviceType'

export default function Services() {

  const {isMobile, isTablet, isDesktop} = useDeviceType();

  if (isMobile) {
    return (
      <div className='bg-[#1c2230]'>

        {/* Header */}
        <Header>
          Servicios
        </Header>
          
        {/* Body */}
        <div className='w-[90%] m-auto flex gap-5 my-5 flex-wrap justify-center'>
            <ServiceCard 
            title="Obediencia deportiva"
            icon ={iconDog}
            isHome={false}
            eje={"x"}
            mov={-100}>
                <p>Es una disciplina canina que enseña a perros y guías a trabajar juntos con precisión, realizando ejercicios útiles para la vida diaria y situaciones cotidianas, desde comandos básicos hasta habilidades más complejas como seguimiento y búsqueda, siendo apta para cualquier perro y dueño, sin importar raza o edad. </p>
                <div>
                  <p className='font-bold'>Características</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Enfoque: Desarrollar una fuerte relación y comunicación entre perro y guía, fomentando un trabajo alegre y proactivo, no forzado.</li>
                    <li>Utilidad: Los ejercicios se basan en situaciones reales, como recuperar objetos, permanecer sin distracciones, seguir al guía o ser indiferente a estímulos externos.</li>
                    <li>Inclusividad: Pueden practicarla perros de cualquier raza, tamaño o edad, con categorías para cachorros y grados que van desde debutante hasta el nivel más avanzado (Clase 3).</li>
                    <li>Motivación: Utiliza el refuerzo positivo, premiando al perro con caricias y recompensas, para que disfrute la actividad. </li>
                  </ul>
                </div>
            </ServiceCard>
          
            <ServiceCard 
            title="IGP & Mondioring"
            icon ={iconShield}
            isHome={false}
            eje={"x"}
            mov={100}>
                <p>Son dos disciplinas deportivas caninas de alto nivel que evalúan el trabajo, obediencia, agilidad y protección del perro, pero difieren en su enfoque: el IGP (IPO) es un reglamento más estandarizado (rastro, obediencia, protección), mientras que el Mondioring es más dinámico, con pistas y distracciones variables, buscando la funcionalidad completa del perro en obediencia, saltos y defensa.</p>
                <div>
                  <p className='font-bold'>IGP (Internationale Gebrauchshund Prüfung)</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Enfoque: Un reglamento internacional con tres secciones claras: Rastro, Obediencia y Protección.</li>
                    <li>Objetivo: Evaluar la capacidad de trabajo, obediencia y protección del perro en un entorno controlado, fortaleciendo el vínculo.</li>
                    <li>Ejercicios: Rastreos en campo, obediencia formal y ejercicios de protección. </li>
                  </ul>
                </div>
                <div>
                  <p className='font-bold'>Mondioring</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Enfoque: Disciplina más moderna y variable, con pistas y escenarios decorados que incluyen distracciones reales (objetos, ruidos).</li>
                    <li>Objetivo: Evaluar la funcionalidad total del perro (obediencia, agilidad, protección) en situaciones impredecibles, como un "valetudo" canino.</li>
                    <li>Ejercicios: Obediencia dinámica, saltos (altura y longitud), búsqueda de objetos, búsqueda de figurante y defensa del dueño con escenarios complejos. </li>
                  </ul>
                </div>
            </ServiceCard>
          
            <ServiceCard 
            title="Modificación de conducta"
            icon ={iconPaw}
            isHome={false}
            eje={"x"}
            mov={-100}>
                <p>es un proceso para cambiar comportamientos no deseados (agresión, miedo, reactividad) usando técnicas como el refuerzo positivo, contracondicionamiento y desensibilización, que se basan en premiar lo bueno y exponer gradualmente a estímulos temidos, evitando castigos (gritos, collares de ahogo) que generan más miedo y agresividad, siendo clave la calma, la paciencia y la constancia, a menudo con ayuda de un profesional, para lograr una convivencia equilibrada. </p>
                <div>
                  <p className='font-bold'>Técnicas comunes</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Protocolo de relajación: Enseñar al perro a asociar un lugar o posición con la calma, premiándole por relajarse y luego introducir estímulos estresantes a distancia.</li>
                    <li>Sustitución: Enseñar una conducta alternativa y más adaptativa (ej: sentarse en lugar de ladrar al timbre).</li>
                    <li>Habituación: Exponer al perro repetidamente a un estímulo para que pierda su reacción (ej: ruidos). </li>
                  </ul>
                </div>
            </ServiceCard>
          
            <ServiceCard 
            title="Preparación de pruebas"
            icon ={iconCup}
            isHome={false}
            eje={"x"}
            mov={100}>
                <p>es un proceso para cambiar comportamientos no deseados (agresión, miedo, reactividad) usando técnicas como el refuerzo positivo, contracondicionamiento y desensibilización, que se basan en premiar lo bueno y exponer gradualmente a estímulos temidos, evitando castigos (gritos, collares de ahogo) que generan más miedo y agresividad, siendo clave la calma, la paciencia y la constancia, a menudo con ayuda de un profesional, para lograr una convivencia equilibrada. </p>
                <div>
                  <p className='font-bold'>Principios Clave</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Salud Primero: Chequeo veterinario para descartar problemas, especialmente en cachorros y razas braquicéfalas.</li>
                    <li>Motivación Positiva: Usar comida, juguetes o pelotas para que el perro disfrute y se concentre, no para obligarlo.</li>
                    <li>Progresión Gradual: Empezar con paseos suaves y aumentar tiempo e intensidad poco a poco, evitando sobreesfuerzos.</li>
                    <li>Calentamiento y Recuperación: Sesiones siempre con calentamiento (15-20 min a ritmo lento) y enfriamiento (15-20 min a ritmo lento) para evitar lesiones.</li>
                    <li>Variedad y Constancia: Cambiar ejercicios para evitar el aburrimiento; la constancia es clave.</li>
                    <li>Descanso Pre-Competición: Una semana antes, el perro debe descansar para estar en forma física y mental. </li>
                  </ul>
                </div>
            </ServiceCard>
        </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
    )
  }

  if (isTablet) {
    return (
      <div className='bg-[#1c2230]'>

        {/* Header */}
        <Header>
          <p className='font-bold text-3xl mt-5'>Servicios de adiestramiento canino deportivo</p>
          <p>Programas adaptados al nivel, desciplina y objetivos de cada perro</p>
        </Header>
          
        {/* Body */}
        <div className='w-[95%] m-auto flex gap-5 my-5 flex-wrap justify-center'>
            <ServiceCard 
            title="Obediencia deportiva"
            icon ={iconDog}
            isHome={false}
            eje={"x"}
            mov={-100}>
                <p>Es una disciplina canina que enseña a perros y guías a trabajar juntos con precisión, realizando ejercicios útiles para la vida diaria y situaciones cotidianas, desde comandos básicos hasta habilidades más complejas como seguimiento y búsqueda, siendo apta para cualquier perro y dueño, sin importar raza o edad. </p>
                <div>
                  <p className='font-bold'>Características</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Enfoque: Desarrollar una fuerte relación y comunicación entre perro y guía, fomentando un trabajo alegre y proactivo, no forzado.</li>
                    <li>Utilidad: Los ejercicios se basan en situaciones reales, como recuperar objetos, permanecer sin distracciones, seguir al guía o ser indiferente a estímulos externos.</li>
                    <li>Inclusividad: Pueden practicarla perros de cualquier raza, tamaño o edad, con categorías para cachorros y grados que van desde debutante hasta el nivel más avanzado (Clase 3).</li>
                    <li>Motivación: Utiliza el refuerzo positivo, premiando al perro con caricias y recompensas, para que disfrute la actividad. </li>
                  </ul>
                </div>
            </ServiceCard>
          
            <ServiceCard 
            title="IGP & Mondioring"
            icon ={iconShield}
            isHome={false}
            eje={"x"}
            mov={100}>
                <p>Son dos disciplinas deportivas caninas de alto nivel que evalúan el trabajo, obediencia, agilidad y protección del perro, pero difieren en su enfoque: el IGP (IPO) es un reglamento más estandarizado (rastro, obediencia, protección), mientras que el Mondioring es más dinámico, con pistas y distracciones variables, buscando la funcionalidad completa del perro en obediencia, saltos y defensa.</p>
                <div>
                  <p className='font-bold'>IGP (Internationale Gebrauchshund Prüfung)</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Enfoque: Un reglamento internacional con tres secciones claras: Rastro, Obediencia y Protección.</li>
                    <li>Objetivo: Evaluar la capacidad de trabajo, obediencia y protección del perro en un entorno controlado, fortaleciendo el vínculo.</li>
                    <li>Ejercicios: Rastreos en campo, obediencia formal y ejercicios de protección. </li>
                  </ul>
                </div>
                <div>
                  <p className='font-bold'>Mondioring</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Enfoque: Disciplina más moderna y variable, con pistas y escenarios decorados que incluyen distracciones reales (objetos, ruidos).</li>
                    <li>Objetivo: Evaluar la funcionalidad total del perro (obediencia, agilidad, protección) en situaciones impredecibles, como un "valetudo" canino.</li>
                    <li>Ejercicios: Obediencia dinámica, saltos (altura y longitud), búsqueda de objetos, búsqueda de figurante y defensa del dueño con escenarios complejos. </li>
                  </ul>
                </div>
            </ServiceCard>
          
            <ServiceCard 
            title="Modificación de conducta"
            icon ={iconPaw}
            isHome={false}
            eje={"x"}
            mov={-100}>
                <p>es un proceso para cambiar comportamientos no deseados (agresión, miedo, reactividad) usando técnicas como el refuerzo positivo, contracondicionamiento y desensibilización, que se basan en premiar lo bueno y exponer gradualmente a estímulos temidos, evitando castigos (gritos, collares de ahogo) que generan más miedo y agresividad, siendo clave la calma, la paciencia y la constancia, a menudo con ayuda de un profesional, para lograr una convivencia equilibrada. </p>
                <div>
                  <p className='font-bold'>Técnicas comunes</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Protocolo de relajación: Enseñar al perro a asociar un lugar o posición con la calma, premiándole por relajarse y luego introducir estímulos estresantes a distancia.</li>
                    <li>Sustitución: Enseñar una conducta alternativa y más adaptativa (ej: sentarse en lugar de ladrar al timbre).</li>
                    <li>Habituación: Exponer al perro repetidamente a un estímulo para que pierda su reacción (ej: ruidos). </li>
                  </ul>
                </div>
            </ServiceCard>
          
            <ServiceCard 
            title="Preparación de pruebas"
            icon ={iconCup}
            isHome={false}
            eje={"x"}
            mov={100}>
                <p>es un proceso para cambiar comportamientos no deseados (agresión, miedo, reactividad) usando técnicas como el refuerzo positivo, contracondicionamiento y desensibilización, que se basan en premiar lo bueno y exponer gradualmente a estímulos temidos, evitando castigos (gritos, collares de ahogo) que generan más miedo y agresividad, siendo clave la calma, la paciencia y la constancia, a menudo con ayuda de un profesional, para lograr una convivencia equilibrada. </p>
                <div>
                  <p className='font-bold'>Principios Clave</p>
                  <ul className='list-disc list-outside pl-5 space-y-2'>
                    <li>Salud Primero: Chequeo veterinario para descartar problemas, especialmente en cachorros y razas braquicéfalas.</li>
                    <li>Motivación Positiva: Usar comida, juguetes o pelotas para que el perro disfrute y se concentre, no para obligarlo.</li>
                    <li>Progresión Gradual: Empezar con paseos suaves y aumentar tiempo e intensidad poco a poco, evitando sobreesfuerzos.</li>
                    <li>Calentamiento y Recuperación: Sesiones siempre con calentamiento (15-20 min a ritmo lento) y enfriamiento (15-20 min a ritmo lento) para evitar lesiones.</li>
                    <li>Variedad y Constancia: Cambiar ejercicios para evitar el aburrimiento; la constancia es clave.</li>
                    <li>Descanso Pre-Competición: Una semana antes, el perro debe descansar para estar en forma física y mental. </li>
                  </ul>
                </div>
            </ServiceCard>
        </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
    )
  }
  
  if (isDesktop) {
    return (
      <div className='bg-[#1c2230]'>

          {/* Header */}
          <Header>
              <p className='font-bold text-3xl mt-5'>Servicios de adiestramiento canino deportivo</p>
              <p>Programas adaptados al nivel, desciplina y objetivos de cada perro</p>
          </Header>
            
          {/* Body */}
          <div className='w-[95%] m-auto flex gap-10 my-5 flex-wrap justify-center'>
              <ServiceCard 
              title="Obediencia deportiva"
              icon ={iconDog}
              isHome={false}
              eje={"x"}
              mov={-100}>
                  <p>Es una disciplina canina que enseña a perros y guías a trabajar juntos con precisión, realizando ejercicios útiles para la vida diaria y situaciones cotidianas, desde comandos básicos hasta habilidades más complejas como seguimiento y búsqueda, siendo apta para cualquier perro y dueño, sin importar raza o edad. </p>
                  <div>
                    <p className='font-bold'>Características</p>
                    <ul className='list-disc list-outside pl-5 space-y-2'>
                      <li>Enfoque: Desarrollar una fuerte relación y comunicación entre perro y guía, fomentando un trabajo alegre y proactivo, no forzado.</li>
                      <li>Utilidad: Los ejercicios se basan en situaciones reales, como recuperar objetos, permanecer sin distracciones, seguir al guía o ser indiferente a estímulos externos.</li>
                      <li>Inclusividad: Pueden practicarla perros de cualquier raza, tamaño o edad, con categorías para cachorros y grados que van desde debutante hasta el nivel más avanzado (Clase 3).</li>
                      <li>Motivación: Utiliza el refuerzo positivo, premiando al perro con caricias y recompensas, para que disfrute la actividad. </li>
                    </ul>
                  </div>
              </ServiceCard>
            
              <ServiceCard 
              title="IGP & Mondioring"
              icon ={iconShield}
              isHome={false}
              eje={"x"}
              mov={100}>
                  <p>Son dos disciplinas deportivas caninas de alto nivel que evalúan el trabajo, obediencia, agilidad y protección del perro, pero difieren en su enfoque: el IGP (IPO) es un reglamento más estandarizado (rastro, obediencia, protección), mientras que el Mondioring es más dinámico, con pistas y distracciones variables, buscando la funcionalidad completa del perro en obediencia, saltos y defensa.</p>
                  <div>
                    <p className='font-bold'>IGP (Internationale Gebrauchshund Prüfung)</p>
                    <ul className='list-disc list-outside pl-5 space-y-2'>
                      <li>Enfoque: Un reglamento internacional con tres secciones claras: Rastro, Obediencia y Protección.</li>
                      <li>Objetivo: Evaluar la capacidad de trabajo, obediencia y protección del perro en un entorno controlado, fortaleciendo el vínculo.</li>
                      <li>Ejercicios: Rastreos en campo, obediencia formal y ejercicios de protección. </li>
                    </ul>
                  </div>
                  <div>
                    <p className='font-bold'>Mondioring</p>
                    <ul className='list-disc list-outside pl-5 space-y-2'>
                      <li>Enfoque: Disciplina más moderna y variable, con pistas y escenarios decorados que incluyen distracciones reales (objetos, ruidos).</li>
                      <li>Objetivo: Evaluar la funcionalidad total del perro (obediencia, agilidad, protección) en situaciones impredecibles, como un "valetudo" canino.</li>
                      <li>Ejercicios: Obediencia dinámica, saltos (altura y longitud), búsqueda de objetos, búsqueda de figurante y defensa del dueño con escenarios complejos. </li>
                    </ul>
                  </div>
              </ServiceCard>
            
              <ServiceCard 
              title="Modificación de conducta"
              icon ={iconPaw}
              isHome={false}
              eje={"x"}
              mov={-100}>
                  <p>es un proceso para cambiar comportamientos no deseados (agresión, miedo, reactividad) usando técnicas como el refuerzo positivo, contracondicionamiento y desensibilización, que se basan en premiar lo bueno y exponer gradualmente a estímulos temidos, evitando castigos (gritos, collares de ahogo) que generan más miedo y agresividad, siendo clave la calma, la paciencia y la constancia, a menudo con ayuda de un profesional, para lograr una convivencia equilibrada. </p>
                  <div>
                    <p className='font-bold'>Técnicas comunes</p>
                    <ul className='list-disc list-outside pl-5 space-y-2'>
                      <li>Protocolo de relajación: Enseñar al perro a asociar un lugar o posición con la calma, premiándole por relajarse y luego introducir estímulos estresantes a distancia.</li>
                      <li>Sustitución: Enseñar una conducta alternativa y más adaptativa (ej: sentarse en lugar de ladrar al timbre).</li>
                      <li>Habituación: Exponer al perro repetidamente a un estímulo para que pierda su reacción (ej: ruidos). </li>
                    </ul>
                  </div>
              </ServiceCard>
            
              <ServiceCard 
              title="Preparación de pruebas"
              icon ={iconCup}
              isHome={false}
              eje={"x"}
              mov={100}>
                  <p>es un proceso para cambiar comportamientos no deseados (agresión, miedo, reactividad) usando técnicas como el refuerzo positivo, contracondicionamiento y desensibilización, que se basan en premiar lo bueno y exponer gradualmente a estímulos temidos, evitando castigos (gritos, collares de ahogo) que generan más miedo y agresividad, siendo clave la calma, la paciencia y la constancia, a menudo con ayuda de un profesional, para lograr una convivencia equilibrada. </p>
                  <div>
                    <p className='font-bold'>Principios Clave</p>
                    <ul className='list-disc list-outside pl-5 space-y-2'>
                      <li>Salud Primero: Chequeo veterinario para descartar problemas, especialmente en cachorros y razas braquicéfalas.</li>
                      <li>Motivación Positiva: Usar comida, juguetes o pelotas para que el perro disfrute y se concentre, no para obligarlo.</li>
                      <li>Progresión Gradual: Empezar con paseos suaves y aumentar tiempo e intensidad poco a poco, evitando sobreesfuerzos.</li>
                      <li>Calentamiento y Recuperación: Sesiones siempre con calentamiento (15-20 min a ritmo lento) y enfriamiento (15-20 min a ritmo lento) para evitar lesiones.</li>
                      <li>Variedad y Constancia: Cambiar ejercicios para evitar el aburrimiento; la constancia es clave.</li>
                      <li>Descanso Pre-Competición: Una semana antes, el perro debe descansar para estar en forma física y mental. </li>
                    </ul>
                  </div>
              </ServiceCard>
          </div>

        {/* Footer */}
        <Footer></Footer>
      </div>
    )
  }
}
