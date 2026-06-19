import { Link } from 'react-router-dom';

function ProjectCard({ project, onDelete, canEdit }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text text-muted">{project.description || 'No description'}</p>
        <small className="text-muted">
          Owner: {project.owner?.name || 'Unknown'}
        </small>
      </div>
      <div className="card-footer bg-white d-flex gap-2">
        <Link to={`/projects/${project.id}`} className="btn btn-primary btn-sm">
          Open Board
        </Link>
        {canEdit && (
          <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(project.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
