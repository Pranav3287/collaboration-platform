import TaskCard from './TaskCard';

function TaskColumn({ title, status, tasks, onDragStart, onDrop, canEdit }) {
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    onDrop(status);
  }

  const columnTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="col-md-4">
      <div
        className="kanban-column p-3 rounded"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h6 className="text-center mb-3">
          {title}
          <span className="badge bg-secondary ms-2">{columnTasks.length}</span>
        </h6>
        {columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            canEdit={canEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;
