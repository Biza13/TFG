import React, { useEffect, useState } from "react";
//para el carousel
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import api from '../api/axios';
import VideoCard from "./VideoCard";

//Si me da tiempo lo hare escalable con un array que se pueda recorrer y mostrar tantos videos como tenga el array
export default function Carousel({isAdmin, handleDelete}) {

    /* Este es el hook de embla
    emblaRef se lo pondremos al div que va a ser el carousel (el que se va a mover)
    y el emblaApi tiene las funciones para mover el carousel (los botones)
    el loop: true es para que cuando llegue a la ultima tarjeta se vuelva a la primera y el autoplay es para que se mueva solo */
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

    /* Función para ir hacia atrás */
    const backwards = () => {
        /* Si esta cargado el emblaApi, hace la función que viene predefinida */
        if (emblaApi) emblaApi.scrollPrev()
    }
    
    const forwards = () => {
        if (emblaApi) emblaApi.scrollNext()
    }

    /* Para coger los videos */
    const [videos, setVideos] = useState([]);

    const fetchVideos = async () => {
      try{
        const response = await api.get("/galleries");

        // Los videos y las fotos estan en response.data.member
        // si es undefined (??) devolvera un array vacio. para que no de error en caso de estar la bd vacía
        const elements = response.data.member ?? [];

        const onlyVideos = elements.filter(item => item.type === 'video');
            setVideos(onlyVideos);

      }catch (error) {
        console.error("Error cargando la galeria ", error);
      }
    }

    useEffect(() => {
      fetchVideos();
    }, []);

  return (
    <>
      <div className="w-[95%] md:w-[90%] lg:w-[85%] overflow-hidden m-auto rounded-2xl p-3 md:p-5 shadow-sm shadow-white my-5" ref={emblaRef}>

        {/* Div de las imgs o videos */}
        <div className="flex w-full gap-5">

          {
            videos.map( (video) =>(
              <VideoCard 
                key={video.id} 
                video={video} 
                isAdmin={isAdmin} 
                handleDelete={() => handleDelete(video.id)}>
              </VideoCard>
             ) )
          }

        </div>

        {/* Div de botones */}
        <div className="flex justify-center gap-5 my-5">

          {/* Botón anterior */}
          <button
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all"
            onClick={backwards}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>

          {/* Botón siguiente */}
          <button
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all" 
            onClick={forwards}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>

        </div>

      </div>
    </>
  );
}
