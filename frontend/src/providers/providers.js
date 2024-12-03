import React, { useState } from 'react';
import axios from 'axios';

const DataUpload = () => {
  const [file, setFile] = useState(null); // Selected file
  const [collection, setCollection] = useState(''); // Collection name or database
  const [importType, setImportType] = useState('data'); // Import type: data, application, or hardware
  const [description, setDescription] = useState(''); // Description for applications
  const [message, setMessage] = useState(''); // Status message
  const [fileError, setFileError] = useState(''); // File validation error
  const [os, setOs] = useState(''); // OS 
  const [cpu, setCpu] = useState(''); // CPU
  const [gpu, setGpu] = useState(''); // GPU
  const [ram, setRam] = useState(''); // RAM
  const [storage, setStorage] = useState(''); // Memory

  const allowedFileTypes = ['.csv', '.py', '.c', '.js', '.txt', '.json', '.html', '.css'];
  const maxFileSize = 5 * 1024 * 1024; 

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

  // Handle form field changes for hardware
  const handleOsChange = (e) => setOs(e.target.value);
  const handleCpuChange = (e) => setCpu(e.target.value);
  const handleGpuChange = (e) => setGpu(e.target.value);
  const handleRamChange = (e) => setRam(e.target.value);
  const handleStorageChange = (e) => setStorage(e.target.value);

  // Handle form field changes
  const handleCollectionChange = (e) => setCollection(e.target.value);
  const handleImportTypeChange = (e) => {
    setImportType(e.target.value);
    // Clear the message, file error, and reset hardware details when changing import type
    setMessage('');
    setFileError('');
    if (e.target.value !== 'hardware') {
      setOs('');
      setCpu('');
      setGpu('');
      setRam('');
      setStorage('');
    }
    if (e.target.value !== 'application') {
      setDescription('');
    }
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Hardware details without file if the upload type is hardware
    if (importType === 'hardware') {
      formData.append('os', os);
      formData.append('cpu', cpu);
      formData.append('gpu', gpu);
      formData.append('ram', ram);
      formData.append('storage', storage);
    } else {

    // Add file for data or application types
      if (!file) {
        setMessage('Please select a file.');
        return;
      }

      formData.append('file', file);

      // Add other data depending on import type
      if (importType === 'data') {
        formData.append('collection', collection);
      } else if (importType === 'application') {
        if (!description) {
          setMessage('Please provide a description for the application.');
          return;
        }
        formData.append('description', description);
      }
    }

    // Define the URL for the request based on import type
    const url =
      importType === 'data'
        ? 'http://localhost:5000/data/upload'
        : importType === 'hardware'
        ? 'http://localhost:5000/hardware/upload' 
        : 'http://localhost:5000/application/upload';

    try {
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, 
      });

      setMessage(response.data.message || 'Resource uploaded successfully.');
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
            <option value="hardware">Import Hardware</option>
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

        {importType !== 'hardware' && (
          <div>
            <label>File:</label>
            <input
              type="file"
              accept=".csv,.py,.c,.js,.txt,.json,.html,.css"
              onChange={handleFileChange}
            />
            {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
          </div>
        )}

        {importType === 'hardware' && (
          <div>
            <h3>Hardware Details</h3>
            <div>
              <label>Operating System (OS):</label>
              <input
                type="text"
                value={os}
                onChange={handleOsChange}
                placeholder="Enter the operating system"
              />
            </div>
            <div>
              <label>CPU:</label>
              <input
                type="text"
                value={cpu}
                onChange={handleCpuChange}
                placeholder="Enter the CPU details"
              />
            </div>
            <div>
              <label>GPU:</label>
              <input
                type="text"
                value={gpu}
                onChange={handleGpuChange}
                placeholder="Enter the GPU details"
              />
            </div>
            <div>
              <label>RAM:</label>
              <input
                type="text"
                value={ram}
                onChange={handleRamChange}
                placeholder="Enter the RAM details"
              />
            </div>
            <div>
              <label>Storage:</label>
              <input
                type="text"
                value={storage}
                onChange={handleStorageChange}
                placeholder="Enter the storage details"
              />
            </div>
          </div>
        )}

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