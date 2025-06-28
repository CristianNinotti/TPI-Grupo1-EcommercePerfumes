# 🛍️ Perfumería Maison
Perfumería Maison es un ecommerce desarrollado para la venta de perfumes, orientado tanto a minoristas como mayoristas, con un panel administrativo completo. Este proyecto integra:

- Frontend: desarrollado con React y Tailwind CSS, brindando una interfaz moderna, responsive y de alta performance.

- Backend: construido con ASP.NET Core, asegurando escalabilidad y robustez en el manejo de la lógica de negocio y APIs.

- Base de datos: gestionada con Entity Framework Core, utilizando un enfoque Code First para el modelado de datos.

## 🎯 Características principales
- Registro e inicio de sesión de usuarios con tres roles:
    - Administrador: gestiona productos, usuarios.
    - Mayorista: accede a precios y stock exclusivos para compras al por mayor.
    - Minorista: compra productos con precios de venta al público.

- Catálogo de perfumes con filtrado y búsqueda dinámica.

- Integración con pasarela de pagos con MercadoPago para procesar compras de forma segura.

- Módulo de administración para CRUD de productos y usuarios.

## 📦 Instalación
1. Clonar el repositorio

git clone https://github.com/CristianNinotti/TPI-Grupo1-EcommercePerfumes.git

2. Instalar dependencias

npm install

### 🔒 Instalación de mkcert en Windows
Para habilitar HTTPS local en este proyecto, seguí estos pasos:

1. Descargar mkcert

- Ingresá a esta [página](https://github.com/FiloSottile/mkcert/releases)

- Descargá el archivo mkcert-vX.X.X-windows-amd64.exe (elegí la versión más reciente).
- Link directo: https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-windows-amd64.exe

2. Crear carpeta y mover el ejecutable

- Creá una carpeta en el disco C llamada Mkcert.

- Mové el archivo descargado a C:\Mkcert.

- Renombralo EXACTAMENTE como: mkcert.exe.

3. Agregar mkcert al PATH Ruta: C:\Mkcert

- Abrí el menú de inicio y buscá “Variables de entorno”.

- Seleccioná Variables de entorno….

- En “Variables del sistema” buscá la variable Path y hacé clic en Editar….

- Tocá en Nuevo y agregá:

`C:\Mkcert`

- Aceptá todos los cuadros de diálogo para guardar los cambios.

4. Instalar el CA local de mkcert

- Abrí cmd y ejecutá:

`mkcert -install`
5. Generar el certificado para localhost

- Abrí una terminal y parate en la carpeta donde se encuentra el proyecto Vite (por ejemplo, front-ecommerce):

`cd ruta\del\proyecto\front-ecommerce`
- Ejecutá:

mkcert localhost
- Si no funciona desde esa carpeta, probá moverte a la carpeta raíz deseada y ejecutar nuevamente el comando.

6. Iniciar el proyecto

- Ejecutá:

`npm run dev`

- Deberas entrar a https://localhost:5173/
