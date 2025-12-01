import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function TaskList() {
  const { tasks, deleteTask, loading, toggleComplete } = useContext(TaskContext);

  const ordered = [...tasks].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "DONE" ? 1 : -1;
  });

  return (
    <div className="page-container fade-in">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="section-title">Suas Tarefas</h2>

        <Link to="/tasks/new">
          <Button className="btn-green">Nova Tarefa</Button>
        </Link>
      </div>

      {loading && <p>Carregando...</p>}

      <div className="flex flex-col gap-4">
        {ordered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
