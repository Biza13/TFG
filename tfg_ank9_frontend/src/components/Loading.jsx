import React from 'react'

export default function Loading({ children }) {
  return (
    /* en inset-0 para que ocupe toda la pantalla (top-0 right-0 bottom-0 left-0) */
    <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* defino tamaño del div size y el animate-spin hace girar el div, lo redondeamos con rounded-full, le ponemos borde con border-8,
      color del borde con border-gray y el color del borde top de azum y como esta girando con el spin el borde top se va moviendo */}
      <div className='size-16 animate-spin rounded-full border-8 border-white border-t-blue-400'></div>
      <p className="mt-4 text-xl font-bold text-white">{children}</p>
    </div>
  )
}
