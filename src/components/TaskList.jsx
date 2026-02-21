import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 p-6 text-slate-300">
        Henüz görev yok. Filtre/arama yüzünden görünmüyor olabilir 😄
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}