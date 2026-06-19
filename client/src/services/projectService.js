import { apiFetch } from './api';

export async function getProjects() {
  return apiFetch('/projects');
}

export async function getProject(id) {
  return apiFetch(`/projects/${id}`);
}

export async function createProject(title, description) {
  return apiFetch('/projects', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
}

export async function updateProject(id, title, description) {
  return apiFetch(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description }),
  });
}

export async function deleteProject(id) {
  return apiFetch(`/projects/${id}`, { method: 'DELETE' });
}
