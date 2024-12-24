
# Todotasks

Todotasks es una aplicación de lista de tareas que utiliza un calendario interactivo para gestionar y visualizar tareas diarias. Las tareas se guardan de forma persistente en Firebase Firestore, asegurando que no pierdas tus datos incluso tras recargar la página.

## Características principales
- **Calendario interactivo**: Visualiza qué días tienen tareas pendientes con un color destacado.
- **Gestión de tareas**:
  - Añade nuevas tareas con un título y descripción.
  - Marca tareas como completadas o pendientes.
  - Elimina tareas que ya no necesitas.
- **Persistencia de datos**: Las tareas se guardan de forma segura en Firebase Firestore.
- **Estilo personalizado**: Una interfaz limpia y responsiva, diseñada para ser intuitiva y atractiva.

## Requisitos previos
Asegúrate de tener instalado lo siguiente:
- [Node.js](https://nodejs.org/) (v14.17.0 o superior)
- Una cuenta en [Firebase](https://firebase.google.com/)
- Un navegador web moderno (Google Chrome, Firefox, Edge, etc.)

## Instalación y configuración

1. **Clonar el repositorio**
   
   git clone https://github.com/GabrielDP97/todotasks.git
   cd todotasks
   

2. **Instalar dependencias**
   Navega a la carpeta raíz del proyecto y ejecuta:
   
   npm install
   

3. **Configurar Firebase**
   - Ve a la [consola de Firebase](https://console.firebase.google.com/) y crea un nuevo proyecto.
   - Habilita Firestore Database en modo de prueba o establece las reglas adecuadas para producción.
   - Copia las credenciales de configuración de Firebase proporcionadas por la consola.
   - Crea un archivo `firebase.js` en `frontend/src` con el siguiente contenido:
     
     import { initializeApp } from "firebase/app";
     import { getFirestore } from "firebase/firestore";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     const db = getFirestore(app);

     export default db;
     

4. **Iniciar la aplicación**
   Inicia el servidor de desarrollo con:
   
   npm start
   
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Uso de la aplicación
1. **Calendario**:
   - Navega por el calendario para seleccionar un día.
   - Los días con tareas pendientes se resaltan en color.

2. **Añadir tareas**:
   - Escribe un título y descripción de la tarea.
   - Haz clic en el botón "Añadir" para guardar la tarea.

3. **Gestionar tareas**:
   - Marca una tarea como completada o desmárcala según corresponda.
   - Elimina una tarea cuando ya no sea necesaria.

4. **Persistencia**:
   - Las tareas se guardan automáticamente en Firestore y se recuperan al recargar la página.

## Estructura del proyecto

.
├── frontend
│   ├── src
│   │   ├── App.js          # Lógica principal de la aplicación
│   │   ├── firebase.js     # Configuración de Firebase (no incluida en el repositorio)
│   │   ├── styles.css      # Estilos personalizados
│   └── public
│       ├── index.html      # Punto de entrada de la aplicación
├── .gitignore              # Archivos y carpetas ignorados por Git
├── package.json            # Configuración del proyecto y dependencias
├── README.md               # Documentación del proyecto


## Tecnologías utilizadas
- **Frontend**:
  - React.js
  - React Calendar
  - CSS personalizado para estilos responsivos
- **Backend**:
  - Firebase Firestore para almacenamiento de datos

## Personalización
- Modifica `styles.css` para cambiar la apariencia de la aplicación.
- Actualiza las reglas de seguridad de Firestore para ajustarlas a tus necesidades específicas.

## Consideraciones de seguridad
- **Variables sensibles**:
  - Nunca incluyas directamente tu archivo `firebase.js` en el repositorio público.
  - Utiliza `.gitignore` para excluir `firebase.js` y proporciona un archivo `firebase.example.js` como plantilla.

- **Reglas de Firestore**:
  Asegúrate de configurar reglas adecuadas para proteger tu base de datos. Por ejemplo:
  
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /tasks/{taskId} {
        allow read, write: if request.auth != null;
      }
    }
  }
  

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
