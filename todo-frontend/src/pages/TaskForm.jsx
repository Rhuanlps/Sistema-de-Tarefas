import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const { createTask } = useContext(TaskContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createTask(form);
    navigate("/tasks");
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Criar Tarefa</h2>

      <form onSubmit={handleSubmit}>
        <Input label="Título" name="title" value={form.title} onChange={handleChange} />
        <Input label="Descrição" name="description" value={form.description} onChange={handleChange} />

        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
