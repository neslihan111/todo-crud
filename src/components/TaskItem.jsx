import { useEffect, useState } from "react";

export default function TaskItem({ task, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  useEffect(() => {
    setValue(task.title);
  }, [task.title]);

  const save = () => {
    const t = value.trim();
    if (!t) return;
    onUpdate(task.id, t);
    setIsEditing(false);
  };

  const cancel = () => {
    setValue(task.title);
    setIsEditing(false);
  };

  const badge =
    task.priority === "high"
      ? "bg-red-500/20 text-red-300 border-red-500/30"
      : task.priority === "low"
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      : "bg-amber-500/20 text-amber-300 border-amber-500/30";

  const priorityText = task.priority || "medium";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          {isEditing ? (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 outline-none focus:border-blue-500"
            />
          ) : (
            <button
              onClick={() => onToggle(task.id)}
              className="text-left text-base font-semibold text-slate-100 hover:text-white"
              title="Tamamlandı durumunu değiştir"
            >
              <div className="flex items-center gap-3">
                <span className={task.completed ? "line-through text-slate-400" : ""}>
                  {task.title}
                </span>

                <span className={`text-xs border rounded-full px-2 py-0.5 ${badge}`}>
                  {priorityText}
                </span>
              </div>
            </button>
          )}

          <div className="mt-2 text-xs text-slate-500">
            {task.completed ? "Durum: Tamamlandı" : "Durum: Açık"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <>
              <button
                onClick={save}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
              >
                Kaydet
              </button>
              <button
                onClick={cancel}
                className="rounded-xl border border-slate-700 bg-transparent px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
              >
                Vazgeç
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-400"
            >
              Düzenle
            </button>
          )}

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}