# Proyecto Task Manager

## Descripción General

Este proyecto es una aplicación de **Task Manager** desarrollada con tecnologías modernas para garantizar escalabilidad, alto rendimiento y una experiencia de usuario intuitiva. Ofrece funcionalidades como arrastrar y soltar (Drag & Drop), autenticación de usuarios, actualizaciones en tiempo real y un diseño limpio y responsivo.

---

## 🛠️ Tecnologías Utilizadas

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![React DnD](https://img.shields.io/badge/React%20DnD-FDB515?style=for-the-badge&logo=react&logoColor=black)](https://react-dnd.github.io/react-dnd/about)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Zustand](https://img.shields.io/badge/Zustand-007FFF?style=for-the-badge&logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

---

## Detalles de Implementación

### Frontend

- **Framework Principal**: Next.js
  - Renderizado del lado del servidor (SSR) y generación estática (SSG) para rendimiento y SEO.
  - Rutas dinámicas para manejar múltiples tableros y tareas.
- **UI y Estilos**: Chakra UI
  - Componentes accesibles y fáciles de personalizar.
  - Temas integrados para consistencia visual.
- **Estado Global**: Zustand
  - Manejo eficiente de estados compartidos, como las tareas y las columnas.
- **Drag & Drop**: React DnD o react-beautiful-dnd
  - Implementación de interacción de arrastrar y soltar para mover tareas entre columnas.

### Backend

- **Framework**: Express.js
  - Construcción de una API RESTful ligera y escalable.
  - Rutas para gestionar usuarios, tableros, columnas y tareas.
- **Autenticación**: NextAuth.js
  - Autenticación con proveedores sociales como Google y GitHub.
  - Gestión segura de sesiones y tokens JWT.
- **Base de Datos**: MongoDB (MongoDB Atlas)
  - Almacenamiento flexible para documentos JSON.
  - Diseño de esquemas para usuarios, tableros, columnas y tareas.
- **WebSockets (Opcional)**: Socket.IO
  - Sincronización en tiempo real para ediciones colaborativas.

---

## Funcionalidades

1. **Autenticación de Usuarios**

   - Inicio de sesión seguro con proveedores sociales (Google, GitHub).
   - Control de acceso basado en roles (Administrador, Usuario).

2. **Funcionalidad Kanban**

   - Crear, editar y eliminar tableros, columnas y tareas.
   - Arrastrar y soltar tareas entre columnas.
   - Actualizaciones en tiempo real para edición colaborativa.

3. **Diseño Responsivo**

   - Totalmente funcional en dispositivos de escritorio, tabletas y móviles.

4. **API Backend**

   - API REST para gestionar usuarios, tableros y tareas.
   - Eventos en tiempo real usando WebSockets (opcional).

5. **Gestión de Errores**

   - Seguimiento centralizado de errores con Sentry.

6. **Escalabilidad**
   - Arquitectura modular con potencial para expansión a microservicios.

---

## Instrucciones de Configuración

### Requisitos Previos

- Node.js >= 16.x
- Cuenta en MongoDB Atlas
- Cuenta en Vercel para el despliegue

### Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-repo/task-manager.git
   cd task-manager
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Variables de Entorno**:
   Crea un archivo `.env` en el directorio raíz con las siguientes variables:

   ```env
   # Configuración de NextAuth
   NEXTAUTH_SECRET=tu_secreto
   NEXTAUTH_URL=http://localhost:3000

   # Configuración de Base de Datos
   MONGODB_URI=tu_cadena_de_conexion_mongodb

   # Otras configuraciones (Opcional)
   SOCKET_IO_ENABLED=true
   ```

4. **Ejecutar la aplicación**:
   ```bash
   npm run dev
   ```
   Accede a la aplicación en `http://localhost:3000`.

### Pruebas

Ejecutar las pruebas:

```bash
npm run test
```

---

## Despliegue

1. **Frontend y API**:

   - Despliega la aplicación en **Vercel**.
   - Asegúrate de configurar las variables de entorno en el panel de Vercel.

2. **Base de Datos**:
   - Utiliza **MongoDB Atlas** para el alojamiento de la base de datos en la nube.

---

## Mejoras Futuras

- Crear una versión móvil usando React Native.
- Integrar priorización de tareas basada en inteligencia artificial.
- Soporte para exportar tableros a formatos como PDF o Excel.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
