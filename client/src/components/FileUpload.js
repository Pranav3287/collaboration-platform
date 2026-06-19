import { useState, useEffect } from 'react';
import { getProjectFiles, uploadFile, getDownloadUrl, deleteFile } from '../services/fileService';
import { getToken } from '../services/api';

function FileUpload({ projectId, canEdit }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState({});

 useEffect(() => {
  fetchData(projectId); 
}, [projectId, fetchData]);

  useEffect(() => {
    files.forEach((file) => {
      if (isImage(file.fileType) && !imageUrls[file.id]) {
        loadImagePreview(file.id);
      }
    });
  }, [files]);

  async function loadFiles() {
    try {
      const data = await getProjectFiles(projectId);
      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadImagePreview(fileId) {
    try {
      const token = getToken();
      const response = await fetch(getDownloadUrl(fileId), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrls((prev) => ({ ...prev, [fileId]: url }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadFile(projectId, file);
      await loadFiles();
    } catch (err) {
      alert(err.message);
    }
    setUploading(false);
    e.target.value = '';
  }

  async function handleDelete(fileId) {
    if (!window.confirm('Delete this file?')) return;
    try {
      await deleteFile(fileId);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (err) {
      alert(err.message);
    }
  }

  function isImage(type) {
    return type && type.startsWith('image/');
  }

  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-paperclip me-2"></i>Files
        </h5>
        {canEdit && (
          <label className="btn btn-sm btn-primary mb-0">
            {uploading ? 'Uploading...' : 'Upload File'}
            <input type="file" hidden onChange={handleUpload} disabled={uploading} />
          </label>
        )}
      </div>
      <div className="card-body">
        {files.length === 0 ? (
          <p className="text-muted mb-0">No files uploaded yet.</p>
        ) : (
          <div className="row g-3">
            {files.map((file) => (
              <div key={file.id} className="col-md-4">
                <div className="border rounded p-2 text-center">
                  {isImage(file.fileType) && imageUrls[file.id] ? (
                    <img
                      src={imageUrls[file.id]}
                      alt={file.fileName}
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: '120px' }}
                    />
                  ) : (
                    <i className="bi bi-file-earmark fs-1 text-primary"></i>
                  )}
                  <p className="small mb-1 text-truncate">{file.fileName}</p>
                  <div className="d-flex gap-1 justify-content-center">
                    <a
                      href={getDownloadUrl(file.id)}
                      className="btn btn-sm btn-outline-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download
                    </a>
                    {canEdit && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(file.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
