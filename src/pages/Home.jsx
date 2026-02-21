import { useEffect, useMemo, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all"); // all | open | done
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    return { total, done, open: total - done };
  }, [tasks]);

  const addTask = (title, priority = "medium") => {
    const t = title.trim();
    if (!t) return;

    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: t,
      completed: false,
      priority, // ✅ özgün: öncelik
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const updateTask = (id, newTitle) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle.trim() } : t))
    );

  const clearAll = () => setTasks([]);

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tasks.filter((t) => {
      const passFilter =
        filter === "all" ? true : filter === "open" ? !t.completed : t.completed;

      const passQuery = q ? t.title.toLowerCase().includes(q) : true;

      return passFilter && passQuery;
    });
  }, [tasks, filter, query]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Todo CRUD App
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Ekle • Listele • Güncelle • Sil • localStorage • Priority • Filtre
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                  Toplam: <b>{stats.total}</b>
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                  Açık: <b>{stats.open}</b>
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                  Biten: <b>{stats.done}</b>
                </span>
              </div>
            </div>

            <button
              onClick={clearAll}
              className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800 sm:w-auto"
              title="Tüm görevleri sil"
            >
              Tümünü Temizle
            </button>
          </div>

          {/* Filtre + Arama */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border ${
                  filter === "all"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-transparent border-slate-700 hover:bg-slate-800"
                }`}
              >
                Hepsi
              </button>

              <button
                onClick={() => setFilter("open")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border ${
                  filter === "open"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-transparent border-slate-700 hover:bg-slate-800"
                }`}
              >
                Açık
              </button>

              <button
                onClick={() => setFilter("done")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold border ${
                  filter === "done"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-transparent border-slate-700 hover:bg-slate-800"
                }`}
              >
                Tamamlandı
              </button>
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara…"
              className="w-full sm:w-64 rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-6">
            <TaskForm onAdd={addTask} />
          </div>

          <div className="mt-6">
            <TaskList
              tasks={visibleTasks}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onUpdate={updateTask}
            />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          İpucu: Görev adına tıklayınca tamamlandı olur. Düzenle ile metni güncelle.
        </p>
      </div>
    </div>
  );
}