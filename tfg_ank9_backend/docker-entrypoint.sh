#!/bin/sh
set -e

# Escribir las claves JWT desde variables de entorno a ficheros
mkdir -p config/jwt
echo "$JWT_SECRET_KEY" > config/jwt/private.pem
echo "$JWT_PUBLIC_KEY" > config/jwt/public.pem
chmod 600 config/jwt/private.pem
chmod 644 config/jwt/public.pem

# Calentar caché
php bin/console cache:warmup --env=prod

# Ejecutar migraciones
php bin/console doctrine:migrations:migrate --no-interaction --env=prod

# Arrancar servidor PHP
exec php -S 0.0.0.0:8000 -t public
