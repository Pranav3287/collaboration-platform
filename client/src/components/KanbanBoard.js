import { useState } from 'react';
import TaskColumn from './TaskColumn';
import { updateTaskStatus } from '../services/taskService';

const COLUMNS = [
  { title: 'To Do', status: 'TODO' },
  { title: 'In Progress', status: 'IN_PROGRESS' },
  { title: 'Done', status: 'DONE' },
];

function KanbanBoard({ projectId, tasks, setTasks, canEdit }) {
  const [draggedTask, setDraggedTask] = useState(null);

  function handleDragStart(e, task) {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  }

  async function handleDrop(newStatus) {
    if (!draggedTask || !canEdit) return;
    if (draggedTask.status === newStatus) return;

    try {
      const updated = await updateTaskStatus(projectId, draggedTask.id, newStatus);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      alert(err.message);
    }
    setDraggedTask(null);
  }

  return (
    <div className="row g-3">
      {COLUMNS.map((col) => (
        <TaskColumn
          key={col.status}
          title={col.title}
          status={col.status}
          tasks={tasks}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          canEdit={canEdit}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
