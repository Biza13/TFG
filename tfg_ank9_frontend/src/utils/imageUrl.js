export const getImageUrl = (route, folder) => {
    /* Para el cloudinary paar que se suban las imagenes alli */
  if (!route) return null;
  if (route.startsWith('http')) return route;
  return `${import.meta.env.VITE_UPLOADS_URL}/uploads/${folder}/${route}`;
};