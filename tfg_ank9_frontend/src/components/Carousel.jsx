import React from "react";
//para el carousel
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

//Si me da tiempo lo hare escalable con un array que se pueda recorrer y mostrar tantos videos como tenga el array
export default function Carousel() {

    /* Este es el hook de embla
    emblaRef se lo pondremos al div que va a ser el carousel (el que se va a mover)
    y el emblaApi tiene las funciones para mover el carousel (los botones)
    el loop: true es para que cuando llegue a la ultima tarjeta se vuelva a la primera y el autoplay es para que se mueva solo */
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    const cardStyle = "w-full md:w-[55%] lg:w-[60%] shrink-0 bg-[#21283a] h-60 md:h-70 lg:h-100 rounded-2xl flex items-center justify-center inset-shadow-sm inset-shadow-gray-500/50";

    /* Función para ir hacia atrás */
    const backwards = () => {
        /* Si esta cargado el emblaApi, hace la función que viene predefinida */
        if (emblaApi) emblaApi.scrollPrev()
    }
    
    const forwards = () => {
        if (emblaApi) emblaApi.scrollNext()
    }

  return (
    <>
      <div className="w-[90%] overflow-hidden m-auto rounded-2xl p-5 shadow-sm shadow-white my-5"ref={emblaRef}>

        {/* Div de las imgs o videos */}
        <div className="flex w-full gap-5 pl-4">

          <div className={cardStyle}>
            Tarjeta 1
          </div>

          <div className={cardStyle}>
            Tarjeta 2
          </div>

          <div className={cardStyle}>
            Tarjeta 3
          </div>

          <div className={cardStyle}>
            Tarjeta 4
          </div>

        </div>

        {/* Div de botones */}
        <div className="flex justify-center gap-5 my-5">

          {/* Botón anterior */}
          <button
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all"
            onClick={backwards}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Botón siguiente */}
          <button
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all" onClick={forwards}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

        </div>

      </div>
    </>
  );
}
