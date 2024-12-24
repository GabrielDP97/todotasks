import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";
import db from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
      deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const App = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchTasks = useCallback(async () => {
    try {
      const tasksCollection = collection(db, "tasks");
      const querySnapshot = await getDocs(tasksCollection);

      const loadedTasks = {};
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        const dateKey = task.date;
        if (!loadedTasks[dateKey]) {
          loadedTasks[dateKey] = [];
        }
        loadedTasks[dateKey].push({ id: doc.id, ...task });
      });

      setTasks(loadedTasks);
    } catch (error) {
      console.error("Error fetching tasks from Firestore:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (date, taskTitle, taskDescription) => {
    const dateKey = date.toISOString().split("T")[0];
    const newTask = { title: taskTitle, description: taskDescription, completed: false, date: dateKey };

    try {
      const tasksCollection = collection(db, "tasks");
      const docRef = await addDoc(tasksCollection, newTask);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [dateKey]: [...(prevTasks[dateKey] || []), { id: docRef.id, ...newTask }],
      }));
    } catch (error) {
      console.error("Error adding task to Firestore:", error);
    }
  };

  const toggleTaskCompletion = async (date, taskId) => {
    const dateKey = date.toISOString().split("T")[0];
    const task = tasks[dateKey].find((t) => t.id === taskId);

    if (!task) return;

    try {
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, { completed: !task.completed });

      setTasks((prevTasks) => ({
        ...prevTasks,
        [dateKey]: prevTasks[dateKey].map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        ),
      }));
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
    }
  };

  const deleteTask = async (date, taskId) => {
    const dateKey = date.toISOString().split("T")[0];

    try {
      const taskDoc = doc(db, "tasks", taskId);
      await deleteDoc(taskDoc);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [dateKey]: prevTasks[dateKey].filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error("Error deleting task from Firestore:", error);
    }
  };

  const getTileClassName = ({ date }) => {
    const dateKey = date.toISOString().split("T")[0];
    const hasIncompleteTasks =
      tasks[dateKey] && tasks[dateKey].some((task) => !task.completed);
    return hasIncompleteTasks ? "day-with-tasks" : "";
  };

  const dateKey = selectedDate.toISOString().split("T")[0];
  const tasksForDate = tasks[dateKey] || [];

  return (
    <div className="container">
      <h1>Todotasks</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={getTileClassName}
        />
      </div>
      <h2>Tareas para el {selectedDate.toLocaleDateString()}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const taskTitle = formData.get("title");
          const taskDescription = formData.get("description");
          addTask(selectedDate, taskTitle, taskDescription);
          e.target.reset();
        }}
        className="task-form"
      >
        <input type="text" name="title" placeholder="Título de la tarea" required />
        <textarea name="description" placeholder="Descripción de la tarea"></textarea>
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {tasksForDate.map((task) => (
          <li key={task.id} className={task.completed ? "completed-task" : ""}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <div className="task-buttons">
              <button onClick={() => toggleTaskCompletion(selectedDate, task.id)}>
                {task.completed ? "Desmarcar" : "Completar"}
              </button>
              <button onClick={() => deleteTask(selectedDate, task.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
