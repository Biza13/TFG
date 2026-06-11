FROM php:8.2-fpm-alpine

# Actualizar e instalar dependencias y libreria para las imagenes
RUN apk update && apk add --no-cache \
    git curl icu-dev libxml2-dev g++ make autoconf \
    libjpeg-turbo-dev libpng-dev libwebp-dev freetype-dev \
    zlib-dev libzip-dev shadow

# Instalamos las extensiones PHP para mysql
RUN docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype \
    && docker-php-ext-install pdo_mysql intl gd zip

# PAra que se puedan subir los vides sino son demasiado grandes
COPY uploads.ini /usr/local/etc/php/conf.d/uploads.ini

WORKDIR /var/www/symfony
# Copiamos el código de Symfony a la imagen
COPY . .

# Instalamos Composer con copy en vez de con run, leyendolo de un docker ya creado en dockerHub y damos permisos a las carpetas
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader --no-scripts \
    && php bin/console cache:warmup --env=prod \
    && chown -R www-data:www-data /var/www/symfony \
    && chmod -R 777 /var/www/symfony/var

# Exponemos el 8000 para desarrollo (PHP Server) y el 9000 para producción (FPM)
#EXPOSE 8000
EXPOSE 9000

# --- CONFIGURACIÓN DE ARRANQUE ---

# OPCIÓN A: DESARROLLO LOCAL (Servidor interno de PHP)
# Permite ver la API directamente en localhost:8000 sin configurar Nginx
#CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]

# OPCIÓN B: KUBERNETES / PRODUCCIÓN (PHP-FPM)
# Descomenta esta línea y comenta la de arriba cuando lo despliegue en AWS EKS.
# Kubernetes usará un Ingress (Nginx) para comunicarse con este puerto 9000.
CMD ["php-fpm"]