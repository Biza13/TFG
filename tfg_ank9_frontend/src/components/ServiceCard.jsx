import {animate, motion} from 'framer-motion'

export default function ServiceCard({ title, icon, isHome, children, eje, mov }) {

  const classBox = isHome 
                        ? "ring-gray-600 rounded-2xl w-full md:w-[40%] lg:w-[24%] flex flex-col items-center bg-gray-300 py-3 gap-3 shadow-2xl" 
                        : "ring-gray-600 rounded-2xl w-full md:w-[40%] flex flex-col items-center gap-3 bg-[#21283a] py-3 shadow-2xl" ; 

  const classIcon = isHome
                          ? "w-40"
                          : "w-40";

  const classTitle = isHome
                          ? "w-[90%] border-b border-b-[#21283a] text-2xl font-bold text-[#21283a]"
                          : "w-[80%] border-b border-b-white text-2xl font-bold text-white text-center";

  const classDesc = isHome
                          ? "text-[#21283a]"
                          : "text-white";

  return (
    /* quiero hacer una card que me sirva tanto para la parte de home como para la de services */
    <motion.div 
    initial={{opacity: 0, scale: 0.5, [eje]:mov}}
    animate={{opacity: 1, scale: 1, [eje]: 0}}
    transition={{duration: 1, ease: "easeOut"}}
    className={classBox}>

      <img src={icon} alt="icon" className={classIcon} />
      <p className={classTitle}>{title}</p>
      <p className={classDesc}>{children}</p>

    </motion.div>
  )
}
