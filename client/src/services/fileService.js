import { apiFetch, getToken } from './api';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export async function getProjectFiles(projectId) {
  return apiFetch(`/files/project/${projectId}`);
}

export async function uploadFile(projectId, file) {
  const formData = new FormData();
  formData.append('file', file);

  const token = getToken();
  const response = await fetch(`${API_BASE}/files/upload/${projectId}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  return response.json();
}

export function getDownloadUrl(fileId) {
  return `${API_BASE}/files/download/${fileId}`;
}

export async function deleteFile(fileId) {
  return apiFetch(`/files/${fileId}`, { method: 'DELETE' });
}
