import { useEffect, useState } from 'react'

export default function useDeviceType() {

    const [device, setDevice] = useState({
        //Devolvera true o false segun sea el width del navegador
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
    });

    useEffect(() => {

        const handleResize = () => {
            setDevice({
                isMobile: window.innerWidth < 768,
                isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
                isDesktop: window.innerWidth >= 1024
            });
        }

        //Cada vez que cambie de tamaño el navegador (evento -> resize) se hara el setDevice cambiando a true o false segun el tamaño
        window.addEventListener("resize", handleResize);

        //el return en unseEffect es para cerrar algo
        //este return es para que el navegador deje de estar pendiente del cambio de tamaño
        //si hay eventListener hay return
        return () => removeEventListener("resize", handleResize);

    }, []);

  return device
}
