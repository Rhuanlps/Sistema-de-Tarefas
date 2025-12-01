import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-container fade-in">
      <h1 className="section-title">To-Do App</h1>

      <Link to="/tasks">
        <Button>Ver Tarefas</Button>
      </Link>
    </div>
  );
}
