import Button from "./Button";

export default function TaskCard({ task, onDelete }) {
  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
      </div>

      <Button className="bg-red-500" onClick={() => onDelete(task.id)}>
        Deletar
      </Button>
    </div>
  );
}
