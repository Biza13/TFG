FROM node:20-alpine AS build
# El as build es una apodo al que haremos referencia en la segunda etapa (el segundo From)

WORKDIR /app

# URL del backend que la pondremos cuando hagamos el build del dockerfile (docker build --build-arg VITE_API_URL=urlQueSea)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copiamos los archivos de configuración de paquetes
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de React el primer punto es lo copias de la raiz y el segundo es lo pegas en el workdir de arriba
COPY . .

# Hacemos el build de la aplicación que nos crea la carpeta dist, que el la pagina web lista para deplegar
RUN npm run build

FROM nginx:stable-alpine
# Copiamos los archivos estáticos desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#Esto se llama multiStage y es que se construye en varias etapas, en mi caso, primero construyo con el build la pagina (carpeta dist)
#después solo subo la pagina ya preparada para el despliegue, sin necesidad de subir cosas inecesarias que harian que la imagen pesase mucho más