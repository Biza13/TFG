import {animate, motion} from 'framer-motion'
import EditButton from './EditButton';
import { useState } from 'react';
import DeleteButton from './DeleteButton';

export default function ServiceCard({ title, icon, isHome, children, featureTitle, featureTitle2 = "", features, features2 = "", eje, mov, showEditButton = false, edit, service, deleteS }) {

  const classBox = isHome 
                        ? "relative ring-gray-600 rounded-2xl w-full md:w-[40%] lg:w-full flex flex-col items-center bg-gray-300 py-3 gap-3 shadow-2xl" 
                        : "relative ring-gray-600 rounded-2xl w-full md:w-[45%] lg:w-[40%] flex flex-col items-center gap-3 bg-[#21283a] py-3 inset-shadow-sm inset-shadow-gray-500/50 ring-1 ring-white/10" ; 

  const classIcon = isHome
                          ? "w-25 md:w-40"
                          : "w-25 md:w-40";

  const classTitle = isHome
                          ? "w-[90%] border-b border-b-[#21283a] text-2xl font-bold text-[#21283a]"
                          : "w-[80%] border-b border-b-white text-2xl font-bold text-white text-center";

  const classDesc = isHome
                          ? "text-[#21283a]"
                          : "text-white p-6 flex flex-col gap-3 flex-1 justify-evenly";

  /* Sacamos del string de las caracteristicas cada una de las caracteristicas que estn en la bd separadas por un ; y le hacemos un trim para eliminar espacios
  en caso de que no haya caracteristicas devolvera un array vacio */
  const featuresArray = features ? features.split(";").map(f => f.trim()) : [];
  const featuresArray2 = features2 ? features2.split(";").map(f => f.trim()) : [];

  /* Cogemos el rol para poner o no el boton de editar */
  const roles = sessionStorage.getItem('role');

  let isAdmin = false;

  if (roles) {
    isAdmin = roles.includes("ROLE_ADMIN")
  }

  
  console.log(isAdmin);

  return (
    <motion.div 
    initial={{opacity: 0, scale: 0.5, [eje]:mov}}
    animate={{opacity: 1, scale: 1, [eje]: 0}}
    transition={{duration: 1, ease: "easeOut"}}
    className={classBox}>

      {
        showEditButton && isAdmin && (
          <div className='w-9 flex'>
            <EditButton onClick={() => edit(service)}></EditButton>
            <DeleteButton onClick={() => deleteS(service)}></DeleteButton>
          </div>
        )
      }
      <img src={icon} alt="icon" className={classIcon} />
      <p className={classTitle}>{title}</p>
      <div className={classDesc}>
        {children}
        <div>
          <p className='font-bold text-white'>{featureTitle}</p>
          
          <ul className='list-disc list-outside pl-5 space-y-2'>
            {
              featuresArray.map((feature, index) => (
                <li key={index}>
                  {feature}
                </li>
              ))
            }
          </ul>
        </div>

        {
          featureTitle2 != "" && (
            <div>
              <p className='font-bold text-white'>{featureTitle2}</p>
              <ul className='list-disc list-outside pl-5 space-y-2'>
                {
                  featuresArray2.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }

      </div>
      

    </motion.div>
  )
}
