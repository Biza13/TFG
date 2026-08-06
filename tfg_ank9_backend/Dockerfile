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

ARG FRONTEND_URL
ENV FRONTEND_URL=$FRONTEND_URL

WORKDIR /var/www/symfony
# Copiamos el código de Symfony a la imagen
COPY . .

# Instalamos Composer con copy en vez de con run, leyendolo de un docker ya creado en dockerHub y damos permisos a las carpetas
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader --no-scripts \
    && chown -R www-data:www-data /var/www/symfony \
    && chmod -R 777 /var/www/symfony/var

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000

CMD ["/usr/local/bin/docker-entrypoint.sh"]