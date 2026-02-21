import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, priority);
    setTitle("");
    setPriority("medium");
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yeni görev yaz..."
        className="w-full flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-blue-500"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full sm:w-44 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400 transition"
      >
        Ekle
      </button>
    </form>
  );
}