import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Footer from '../marketing-page/components/Footer'; // Assurez-vous que le chemin est correct

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  maxWidth: '600px',
  margin: 'auto',
}));

const DataUpload = () => {
  const [file, setFile] = useState(null); // Selected file
  const [collection, setCollection] = useState(''); // Collection name or database
  const [importType, setImportType] = useState('data'); // Import type: data, application, or hardware
  const [description, setDescription] = useState(''); // Description for applications
  const [os, setOs] = useState(''); // OS
  const [cpu, setCpu] = useState(''); // CPU
  const [gpu, setGpu] = useState(''); // GPU
  const [ram, setRam] = useState(''); // RAM
  const [storage, setStorage] = useState(''); // Memory
  const [message, setMessage] = useState(''); // Status message
  const [fileError, setFileError] = useState(''); // File validation error

  const allowedFileTypes = ['.csv', '.py', '.c', '.js', '.txt', '.json', '.html', '.css'];
  const maxFileSize = 5 * 1024 * 1024; // Max file size: 5MB

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile.name.split('.').pop();
    const fileSize = selectedFile.size;

    if (!allowedFileTypes.includes(`.${fileExtension}`)) {
      setFileError('Invalid file type. Only .csv, .py, .c, .js, .txt, .json, .html, .css are allowed.');
      setFile(null);
      return;
    }

    if (fileSize > maxFileSize) {
      setFileError('File size exceeds the 5MB limit.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setFileError('');
  };

  const handleCollectionChange = (e) => setCollection(e.target.value);
  const handleImportTypeChange = (e) => {
    setImportType(e.target.value);
    if (e.target.value !== 'application') {
      setDescription('');
    }
    if (e.target.value !== 'hardware') {
      setOs('');
      setCpu('');
      setGpu('');
      setRam('');
      setStorage('');
    }
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleOsChange = (e) => setOs(e.target.value);
  const handleCpuChange = (e) => setCpu(e.target.value);
  const handleGpuChange = (e) => setGpu(e.target.value);
  const handleRamChange = (e) => setRam(e.target.value);
  const handleStorageChange = (e) => setStorage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (importType === 'hardware') {
      formData.append('os', os);
      formData.append('cpu', cpu);
      formData.append('gpu', gpu);
      formData.append('ram', ram);
      formData.append('storage', storage);
    } else {
      if (!file) {
        setMessage('Please select a file.');
        return;
      }

      formData.append('file', file);

      if (importType === 'data') {
        formData.append('collection', collection);
      } else if (importType === 'application') {
        formData.append('description', description);
      }
    }

    try {
      const url =
        importType === 'data'
          ? 'http://localhost:5000/data/upload'
          : importType === 'application'
          ? 'http://localhost:5000/application/upload'
          : 'http://localhost:5000/hardware/upload';

      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(response.data.message || 'File uploaded successfully.');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload a File or Hardware Details
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            select
            label="Import Type"
            value={importType}
            onChange={handleImportTypeChange}
            fullWidth
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            margin="normal"
          >
            <option value="data">Import Data</option>
            <option value="application">Import Application</option>
            <option value="hardware">Import Hardware</option>
          </TextField>

          {importType === 'data' && (
            <TextField
              label="Collection Name"
              value={collection}
              onChange={handleCollectionChange}
              placeholder="Collection name (optional)"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          )}

          {importType === 'application' && (
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Add a description for the application"
              rows={3}
              multiline
              fullWidth
              variant="outlined"
              margin="normal"
            />
          )}

          {importType === 'hardware' && (
            <>
              <TextField
                label="Operating System (OS)"
                value={os}
                onChange={handleOsChange}
                placeholder="Enter the operating system"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="CPU"
                value={cpu}
                onChange={handleCpuChange}
                placeholder="Enter CPU details"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="GPU"
                value={gpu}
                onChange={handleGpuChange}
                placeholder="Enter GPU details"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="RAM"
                value={ram}
                onChange={handleRamChange}
                placeholder="Enter RAM details"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Storage"
                value={storage}
                onChange={handleStorageChange}
                placeholder="Enter storage details"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </>
          )}

          {importType !== 'hardware' && (
            <TextField
              type="file"
              accept=".csv,.py,.c,.js,.txt,.json,.html,.css"
              onChange={handleFileChange}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          {fileError && <Typography color="error">{fileError}</Typography>}

          <Button type="submit" fullWidth variant="contained" color="primary">
            Upload
          </Button>
        </Box>

        {message && (
          <Typography
            color={message.startsWith('Error') ? 'error' : 'success'}
            variant="body2"
            align="center"
            marginTop={2}
          >
            {message}
          </Typography>
        )}
      </FormContainer>

      <Footer />
    </React.Fragment>
  );
};

export default DataUpload;
