import { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { canEdit, isAdmin } = useAuth();

  // useEffect: fetch projects when page loads
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    try {
      const project = await createProject(title, description);
      setProjects((prev) => [project, ...prev]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">My Projects</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {canEdit && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5>Create New Project</h5>
            <form onSubmit={handleCreate} className="row g-2">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Project title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <button className="btn btn-success w-100">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="row g-3">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4">
            <ProjectCard
              project={project}
              onDelete={handleDelete}
              canEdit={isAdmin}
            />
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-muted text-center mt-4">No projects yet. Create one to get started!</p>
      )}
    </div>
  );
}

export default Dashboard;
