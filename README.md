# AnK9 — Plataforma de Adiestramiento Canino

Aplicación web fullstack para una empresa de adiestramiento canino. Permite a los usuarios registrarse, gestionar sus perros, apuntarse a clases guiadas y verificar su cuenta por email. Los administradores pueden gestionar servicios, eventos del calendario y usuarios.

---

## Tecnologías

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS**
- **FullCalendar** (`@fullcalendar/react`, `daygrid`, `timegrid`, `interaction`)
- **Axios** para las peticiones HTTP
- **Framer Motion** para animaciones
- **React Router** para la navegación

### Backend
- **Symfony 7.4** (PHP 8.2)
- **API Platform 4** para la API REST
- **Doctrine ORM** + **MySQL**
- **LexikJWTAuthenticationBundle** para autenticación JWT
- **GesdinetJWTRefreshTokenBundle** para refresco de tokens
- **VichUploaderBundle** para gestión de imágenes
- **SymfonyCastsVerifyEmailBundle** para verificación de email
- **Symfony Mailer** para envío de correos
- **NelmioCorsBundle** para CORS

### Infraestructura
- **Docker** + **Nginx** para despliegue
- **AWS** (o cualquier servidor con Docker)

---

## Estructura del proyecto

```
TGF/
├── tfg_ank9_frontend/    # Aplicación React
└── tfg_ank9_backend/     # API Symfony
```

---

## Requisitos previos (desarrollo local)

- PHP 8.2+
- Composer
- Node.js 20+
- npm
- MySQL 8.0+
- Symfony CLI
- Docker (solo para despliegue)

---

## Instalación en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd TGF
```

---

### 2. Backend (Symfony)

#### Instalar dependencias

```bash
cd tfg_ank9_backend
composer install
```

#### Configurar variables de entorno

Crea un archivo `.env.local` o edita `.env` con tus valores:

```env
# Base de datos
DATABASE_URL="mysql://root:tu_password@127.0.0.1:3306/tfg_adiestramiento_canino?serverVersion=8.0.32&charset=utf8mb4"

# Mailer (Gmail con contraseña de aplicación)
MAILER_DSN=smtp://tu_email%40gmail.com:tu_contraseña_de_aplicacion@smtp.gmail.com:587

# Messenger (síncrono para envío directo de emails)
MESSENGER_TRANSPORT_DSN=sync://

# JWT
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=tu_passphrase

# URL del frontend (para redirección tras verificación de email)
FRONTEND_URL=http://localhost:5173
```

> **Nota sobre el MAILER_DSN:** El `@` del email debe escaparse como `%40`. Para Gmail necesitas una **contraseña de aplicación** (no la contraseña normal). Activa la verificación en dos pasos en tu cuenta Google y genera una en [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

#### Generar claves JWT

```bash
php bin/console lexik:jwt:generate-keypair
```

#### Crear la base de datos y ejecutar migraciones

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

#### Arrancar el servidor

```bash
symfony server:start
```

El backend estará disponible en `http://127.0.0.1:8000`.

---

### 3. Frontend (React)

#### Instalar dependencias

```bash
cd tfg_ank9_frontend
npm install
```

#### Configurar variables de entorno

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_UPLOADS_URL=http://127.0.0.1:8000
```

#### Arrancar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

---

## Variables de entorno — resumen completo

### Backend (`.env`)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `DATABASE_URL` | Conexión a MySQL | `mysql://root:1234@127.0.0.1:3306/tfg_db?serverVersion=8.0.32` |
| `MAILER_DSN` | Configuración SMTP | `smtp://user%40gmail.com:pass@smtp.gmail.com:587` |
| `MESSENGER_TRANSPORT_DSN` | Transporte de mensajes | `sync://` |
| `JWT_SECRET_KEY` | Ruta clave privada JWT | `%kernel.project_dir%/config/jwt/private.pem` |
| `JWT_PUBLIC_KEY` | Ruta clave pública JWT | `%kernel.project_dir%/config/jwt/public.pem` |
| `JWT_PASSPHRASE` | Passphrase de las claves JWT | `tu_passphrase` |
| `FRONTEND_URL` | URL del frontend (para redirección de verificación) | `http://localhost:5173` |
| `CORS_ALLOW_ORIGIN` | Origen permitido por CORS | `^https?://(localhost\|127\.0\.0\.1)(:[0-9]+)?$` |

### Frontend (`.env`)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base de la API | `http://127.0.0.1:8000/api` |
| `VITE_UPLOADS_URL` | URL base para imágenes subidas | `http://127.0.0.1:8000` |

---

## Funcionalidades principales

### Usuarios
- Registro con verificación de email obligatoria
- Login con JWT y refresco automático de token
- Edición de perfil (nombre, apellidos, email, dirección, foto)
- Registro y gestión de perros (nombre, raza, foto)
- Apuntarse a clases del calendario

### Administradores
- Gestión completa de servicios (crear, editar, eliminar)
- Gestión del calendario de eventos (crear, editar, eliminar)
- Gestión de usuarios
- Galería de fotos/vídeos

### Calendario
- Vista de dos semanas en desktop/tablet
- Vista de día en móvil (responsive automático)
- Eventos con capacidad máxima — se muestra el número de plazas libres
- Los admins pueden crear/editar/borrar eventos
- Los usuarios pueden apuntarse a eventos

### Email
- Al registrarse se envía un correo de verificación
- El usuario no puede iniciar sesión hasta verificar su email
- Limpieza automática de eventos pasados con comando de consola (`app:clean-old-events`)

---

## Endpoints principales de la API

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/login_check` | Login — devuelve JWT | No |
| POST | `/api/token/refresh` | Refresco de token JWT | No |
| POST | `/api/register-user` | Registro de usuario | No |
| GET | `/api/verify/email` | Verificación de email | No |
| GET | `/api/services` | Listar servicios | No |
| GET | `/api/galleries` | Listar galería | No |
| POST | `/api/register-dog` | Registrar perro | Sí |
| GET/POST/PATCH/DELETE | `/api/events` | Gestión de eventos | Sí |
| POST | `/api/edit-user/{id}` | Editar usuario | Sí |
| DELETE | `/api/user/{id}` | Eliminar usuario | Sí |

---

## Comandos útiles

### Limpiar eventos pasados (backend)

```bash
php bin/console app:clean-old-events
```

> Elimina eventos cuya fecha sea anterior a hace una semana. Configurable en `src/Command/CleanOldEventsCommand.php`.

### Caché de Symfony

```bash
php bin/console cache:clear
```

### Nueva migración tras cambios en entidades

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

---

## Despliegue con Docker

### Backend

```bash
cd tfg_ank9_backend
docker build \
  --build-arg FRONTEND_URL=https://tu-dominio.com \
  -t bego13/tfg-php:latest .
docker push bego13/tfg-php:latest
```

### Frontend

```bash
cd tfg_ank9_frontend
docker build \
  --build-arg VITE_API_URL=https://tu-dominio.com/api \
  --build-arg VITE_UPLOADS_URL=https://tu-dominio.com \
  -t bego13/tfg-frontend:latest .
docker push bego13/tfg-frontend:latest
```

> El frontend usa una build multistage: primero construye con Node y luego sirve los estáticos con Nginx.

### Variables de entorno en producción

En producción las variables del backend (DATABASE_URL, MAILER_DSN, JWT\_\*, etc.) se deben pasar como variables de entorno del contenedor, no desde el `.env`. En Kubernetes se hace con un `Secret` o `ConfigMap`; en Docker Compose con la sección `environment`.

---

## Estructura de entidades (base de datos)

| Entidad | Descripción |
|---|---|
| `User` | Usuario de la plataforma. Tiene `isVerified` para el control de verificación de email. |
| `Dog` | Perro vinculado a un usuario (ManyToOne). |
| `Service` | Servicio ofrecido por la empresa (agility, búsqueda, etc.). |
| `Event` | Clase/evento del calendario. ManyToOne con Service, ManyToMany con Dog. |
| `Gallery` | Fotos o vídeos vinculados a un perro. |

---

## Notas de desarrollo

- Las imágenes de usuarios y perros se gestionan con **VichUploaderBundle** y se sirven desde `/uploads/`.
- El calendario usa **FullCalendar** con vista diferenciada por dispositivo gracias al hook `useDeviceType`.
- La autenticación devuelve además del token JWT: `name`, `lastName`, `email`, `role` y `picture_route`.
- El refresco de token se gestiona automáticamente en el interceptor de Axios (`src/api/axios.js`).
- Los eventos del calendario pasados se pueden limpiar manualmente con el comando `app:clean-old-events`. Para automatizarlo en producción, añadir un cron job: `0 3 * * * php /ruta/proyecto/bin/console app:clean-old-events`.

---

## Autor

**Begoña** — Trabajo de Fin de Grado
