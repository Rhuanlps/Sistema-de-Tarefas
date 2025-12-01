import Button from "./Button";
import { Link } from "react-router-dom";

export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="task-card fade-in">
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={task.status === "DONE"}
          onChange={() => onToggle(task.id)}
          aria-label={`Marcar ${task.title} como concluída`}
          style={{ width: 18, height: 18, marginTop: 6 }}
        />

        <div>
          <h3
            className={`font-bold ${
              task.status === "DONE" ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </h3>

          <p
            className={`${
              task.status === "DONE" ? "line-through text-gray-400" : ""
            }`}
          >
            {task.description}
          </p>
        </div>
      </div>

      <div className="task-actions">
        <Link to={`/tasks/${task.id}/edit`}>
          <Button className="!bg-yellow-400 !text-black">Editar</Button>
        </Link>

        <Button className="btn-red" onClick={() => onDelete(task.id)}>
          Deletar
        </Button>
      </div>
    </div>
  );
}
