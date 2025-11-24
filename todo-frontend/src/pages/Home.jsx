import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">To-Do App</h1>

      <Link to="/tasks">
        <Button>Ver Tarefas</Button>
      </Link>
    </div>
  );
}
