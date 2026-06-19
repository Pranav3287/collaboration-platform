import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../services/projectService';
import { getTasks, createTask, deleteTask } from '../services/taskService';
import { useAuth } from '../context/AuthContext';
import KanbanBoard from '../components/KanbanBoard';
import FileUpload from '../components/FileUpload';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [labels, setLabels] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const { canEdit } = useAuth();

  // useEffect: load project and tasks
  useEffect(() => {
    loadData();
  }, [id]);

  // useEffect: real-time polling - refresh tasks every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshTasks();
    }, 5000);
    return () => clearInterval(interval);
  }, [id]);

  async function loadData() {
    try {
      const [proj, taskList] = await Promise.all([
        getProject(id),
        getTasks(id),
      ]);
      setProject(proj);
      setTasks(taskList);
    } catch (err) {
      setError(err.message);
    }
  }

  async function refreshTasks() {
    try {
      const taskList = await getTasks(id);
      setTasks(taskList);
    } catch (err) {
      // silent fail on background refresh
    }
  }

  async function handleCreateTask(e) {
    e.preventDefault();
    try {
      const task = await createTask(id, {
        title: taskTitle,
        description: taskDesc,
        priority,
        labels,
        deadline,
        status: 'TODO',
      });
      setTasks((prev) => [task, ...prev]);
      setTaskTitle('');
      setTaskDesc('');
      setLabels('');
      setDeadline('');
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDeleteTask(taskId) {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id, taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      alert(err.message);
    }
  }

  if (!project && !error) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="container alert alert-danger mt-4">{error}</div>;
  }

  return (
    <div className="container">
      <Link to="/" className="btn btn-link mb-2 ps-0">
        <i className="bi bi-arrow-left"></i> Back to Projects
      </Link>

      <h2>{project.title}</h2>
      <p className="text-muted">{project.description}</p>

      {canEdit && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5>Add Task</h5>
            <form onSubmit={handleCreateTask}>
              <div className="row g-2">
                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Description"
                    value={taskDesc}
                    onChange={(e) => setTaskDesc(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <input
                    className="form-control"
                    placeholder="Labels"
                    value={labels}
                    onChange={(e) => setLabels(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
              <button className="btn btn-primary mt-2">Add Task</button>
            </form>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4>Kanban Board</h4>
        <small className="text-muted">
          <i className="bi bi-arrow-repeat"></i> Auto-refreshes every 5 seconds
        </small>
      </div>

      {/* Prop drilling: pass tasks and setTasks down to KanbanBoard */}
      <KanbanBoard
        projectId={id}
        tasks={tasks}
        setTasks={setTasks}
        canEdit={canEdit}
      />

      {canEdit && tasks.length > 0 && (
        <div className="mt-3">
          <h6>Quick Delete Tasks</h6>
          <div className="d-flex flex-wrap gap-2">
            {tasks.map((t) => (
              <button
                key={t.id}
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteTask(t.id)}
              >
                Delete: {t.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <FileUpload projectId={id} canEdit={canEdit} />
    </div>
  );
}

export default ProjectDetail;
