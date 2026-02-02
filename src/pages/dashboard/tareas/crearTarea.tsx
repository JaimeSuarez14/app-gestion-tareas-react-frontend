import { useState, type ChangeEvent, type FormEvent } from "react";
import type { RootState } from "../../../lib/store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { MdAddTask } from "react-icons/md";

const CrearTarea = () => {
  const { id } = useSelector((state: RootState) => state.user);

  const [form, setForm] = useState({
    name: "",
    description: "",
    userBy: id || "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("userBy", form.userBy!);

    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await fetch("http://localhost:3000/api/tarea/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      console.log(res);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error creating task");
      }

      setMessage("Tarea creada correctamente");

      setForm({ name: "", description: "", userBy: "" });
      setFile(null);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5">
        <Link
          to={"/dashboard/tareas/lista"}
          className="w-full bg-orange-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg font-semibold transition"
        >
          Ver Tareas
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <div className="flex text-center w-full">
          <MdAddTask className="text-blue-600 text-4xl mr-2" />
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Crear Tarea
          </h2>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Nombre de la tarea"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          rows={5}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          {loading ? "Guardando..." : "Guardar Tarea"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};
export default CrearTarea;
