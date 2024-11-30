import React, { useState } from 'react';
import axios from 'axios';

const DataUpload = () => {
  const [file, setFile] = useState(null); // Selected file
  const [collection, setCollection] = useState(''); // Collection name or database
  const [importType, setImportType] = useState('data'); // Import type: data or application
  const [description, setDescription] = useState(''); // Description for applications
  const [message, setMessage] = useState(''); // Status message
  const [fileError, setFileError] = useState(''); // File validation error

  const allowedFileTypes = ['.csv', '.py', '.c', '.js', '.txt', '.json', '.html', '.css'];
  const maxFileSize = 5 * 1024 * 1024; // Max file size: 5MB

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile.name.split('.').pop();
    const fileSize = selectedFile.size;

    // File type validation
    if (!allowedFileTypes.includes(`.${fileExtension}`)) {
      setFileError('Invalid file type. Only .csv, .py, .c, .js, .txt, .json, .html, .css are allowed.');
      setFile(null);
      return;
    }

    // File size validation
    if (fileSize > maxFileSize) {
      setFileError('File size exceeds the 5MB limit.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileError('');
  };

  // Handle form field changes
  const handleCollectionChange = (e) => setCollection(e.target.value);
  const handleImportTypeChange = (e) => {
    setImportType(e.target.value);
    if (e.target.value !== 'application') {
      setDescription('');
    }
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (importType === 'data') {
      formData.append('collection', collection);
    } else if (importType === 'application') {
      formData.append('description', description);
    }

    try {
      const url = importType === 'data'
        ? 'http://localhost:5000/data/upload'
        : 'http://localhost:5000/application/upload';

      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(response.data.message || 'File uploaded successfully.');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <h2>Upload a File</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Import Type:</label>
          <select value={importType} onChange={handleImportTypeChange}>
            <option value="data">Import Data</option>
            <option value="application">Import Application</option>
          </select>
        </div>

        {importType === 'data' && (
          <div>
            <label>Collection Name:</label>
            <input
              type="text"
              value={collection}
              onChange={handleCollectionChange}
              placeholder="Collection name (optional)"
            />
          </div>
        )}

        {importType === 'application' && (
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Add a description for the application"
              rows="3"
            />
          </div>
        )}

        <div>
          <label>File:</label>
          <input
            type="file"
            accept=".csv,.py,.c,.js,.txt,.json,.html,.css"
            onChange={handleFileChange}
          />
          {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 15px',
            color: '#FFF',
            backgroundColor: '#4CAF50',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Upload
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: '20px',
            color: message.startsWith('Error') ? 'red' : 'green',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DataUpload;
