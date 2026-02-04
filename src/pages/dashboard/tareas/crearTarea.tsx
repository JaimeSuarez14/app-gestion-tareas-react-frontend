import { useState, type ChangeEvent, type FormEvent } from "react";
import type { RootState } from "../../../lib/store/store";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { MdAddTask } from "react-icons/md";
import { FaEye } from "react-icons/fa";

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
          className="w-fit gap-2 items-center bg-orange-600 hover:bg-blue-700 text-white px-2 py-1 rounded-lg font-semibold transition flex"
        >
          <FaEye /> <span>Ver Tareas</span>
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

        <div className="col-span-full text-black">
          <label htmlFor="cover-photo" className="block text-sm/6 font-medium ">Agregar Imagen</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10">
            <div className="text-center">
              <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" className="mx-auto size-12 text-gray-600">
                <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" fill-rule="evenodd" />
              </svg>
              <div className="mt-4 flex text-sm/6 text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300">
                  <span>Upload a file</span>
                  <input id="file-upload" type="file" name="file-upload" className="sr-only" accept="image/*"
                  onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

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
