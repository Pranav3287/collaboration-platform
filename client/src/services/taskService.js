import { apiFetch } from './api';

export async function getTasks(projectId) {
  return apiFetch(`/projects/${projectId}/tasks`);
}

export async function createTask(projectId, task) {
  return apiFetch(`/projects/${projectId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export async function updateTask(projectId, taskId, task) {
  return apiFetch(`/projects/${projectId}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
}

export async function updateTaskStatus(projectId, taskId, status) {
  return apiFetch(`/projects/${projectId}/tasks/${taskId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function deleteTask(projectId, taskId) {
  return apiFetch(`/projects/${projectId}/tasks/${taskId}`, {
    method: 'DELETE',
  });
}
