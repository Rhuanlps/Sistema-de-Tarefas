import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const { createTask, updateTask, getTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const params = useParams();
  const editingId = params.id || null;

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PENDING",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingId) {
      (async () => {
        setLoading(true);
        const t = await getTask(editingId);
        if (t) {
          setForm({
            title: t.title ?? "",
            description: t.description ?? "",
            status: t.status ?? "PENDING",
          });
        }
        setLoading(false);
      })();
    }
  }, [editingId]);

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? "DONE" : "PENDING") : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await updateTask(editingId, form);
    } else {
      await createTask(form);
    }

    navigate("/tasks");
  }

  return (
    <div className="page-container fade-in">
      <h2 className="section-title">
        {editingId ? "Editar Tarefa" : "Criar Tarefa"}
      </h2>

      {loading ? (
        <p>Carregando tarefa...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Título"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            label="Descrição"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          {editingId && (
            <label className="input-label" style={{ marginTop: 8 }}>
              <input
                type="checkbox"
                checked={form.status === "DONE"}
                onChange={handleChange}
                name="status"
                style={{ marginRight: 8 }}
              />
              Marcar como concluída
            </label>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <Button type="submit">
              {editingId ? "Salvar alterações" : "Salvar"}
            </Button>

            <Button
              type="button"
              className="btn-red"
              onClick={() => navigate("/tasks")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
