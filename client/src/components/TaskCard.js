function TaskCard({ task, onDragStart, canEdit }) {
  const priorityClass = {
    HIGH: 'danger',
    MEDIUM: 'warning',
    LOW: 'success',
  };

  return (
    <div
      className="card mb-2 shadow-sm task-card"
      draggable={canEdit}
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-start">
          <strong className="small">{task.title}</strong>
          <span className={`badge bg-${priorityClass[task.priority] || 'secondary'}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="small text-muted mb-1 mt-1">{task.description}</p>
        )}
        {task.labels && (
          <span className="badge bg-info text-dark me-1">{task.labels}</span>
        )}
        {task.deadline && (
          <small className="text-danger d-block">
            <i className="bi bi-calendar-event"></i> {task.deadline}
          </small>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
