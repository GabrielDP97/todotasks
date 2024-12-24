import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase";

// Referencia a la colección de tareas
const tasksCollection = collection(db, "tasks");

// Obtener todas las tareas
export const getTasks = async () => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Crear una nueva tarea
export const createTask = async (task) => {
  const docRef = await addDoc(tasksCollection, task);
  return { id: docRef.id, ...task };
};

// Actualizar una tarea existente
export const updateTask = async (id, updatedTask) => {
  const taskDoc = doc(db, "tasks", id);
  await updateDoc(taskDoc, updatedTask);
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};
