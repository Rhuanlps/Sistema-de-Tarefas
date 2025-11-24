import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ==========================
  // Load tasks
  // ==========================
  async function loadTasks() {
    setLoading(true);
    const res = await api.get("");   // <-- CORRIGIDO
    setTasks(res.data);
    setLoading(false);
  }

  // ==========================
  // Create
  // ==========================
  async function createTask(task) {
    await api.post("", task);        
    await loadTasks();
    setMessage("Tarefa criada com sucesso!");
  }

  // ==========================
  // Update
  // ==========================
  async function updateTask(id, task) {
    await api.put(`/${id}`, task);   
    await loadTasks();
    setMessage("Tarefa atualizada!");
  }

  // ==========================
  // Delete
  // ==========================
  async function deleteTask(id) {
    await api.delete(`/${id}`);      
    await loadTasks();
    setMessage("Tarefa deletada!");
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, message, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
