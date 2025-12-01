import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load tasks
  async function loadTasks() {
    try {
      setLoading(true);
      const res = await api.get("");
      setTasks(res.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  }

  // Create
  async function createTask(task) {
    try {
      await api.post("", {
        ...task,
        status: "PENDING",
      });
      await loadTasks();
      setMessage("Tarefa criada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
    }
  }

  // Update
  async function updateTask(id, task) {
    try {
      await api.put(`/${id}`, task);
      await loadTasks();
      setMessage("Tarefa atualizada!");
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  }

  // Delete
  async function deleteTask(id) {
    try {
      await api.delete(`/${id}`);
      await loadTasks();
      setMessage("Tarefa deletada!");
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  }

  // Toggle complete
  async function toggleComplete(id) {
    try {
      const task = tasks.find((t) => t.id === id);
      const newStatus = task.status === "DONE" ? "PENDING" : "DONE";

      await api.put(`/${id}`, {
        ...task,
        status: newStatus,
      });

      await loadTasks();
    } catch (err) {
      console.error("Erro ao alternar conclusão:", err);
    }
  }

  // Get single task
  async function getTask(id) {
    const found = tasks.find((t) => String(t.id) === String(id));
    if (found) return found;
    try {
      const res = await api.get(`/${id}`);
      return res.data;
    } catch (err) {
      console.error("Erro ao obter tarefa:", err);
      return null;
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        message,
        createTask,
        updateTask,
        deleteTask,
        toggleComplete,
        getTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
