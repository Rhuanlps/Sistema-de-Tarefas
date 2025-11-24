import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function TaskList() {
  const { tasks, deleteTask, loading } = useContext(TaskContext);

  return (
    <div className="max-w-xl mx-auto mt-10">

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Suas Tarefas</h2>

        <Link to="/tasks/new">
          <Button className="bg-green-600">Nova Tarefa</Button>
        </Link>
      </div>

      {loading && <p>Carregando...</p>}

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}
