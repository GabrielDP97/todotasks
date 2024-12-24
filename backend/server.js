const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inicialización de la aplicación Express
const app = express();

// Middlewares
app.use(express.json()); // Permite manejar datos en formato JSON
app.use(cors()); // Permite conexiones desde diferentes dominios (CORS)

// Conexión a MongoDB Atlas
const mongoURI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority";

// Reemplaza <username>, <password> y <database> con tus credenciales de Atlas
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Modelo de Tareas
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", TaskSchema);

// Rutas de la API
// Obtener todas las tareas
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// Crear una nueva tarea
app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// Actualizar una tarea
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

// Eliminar una tarea
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
