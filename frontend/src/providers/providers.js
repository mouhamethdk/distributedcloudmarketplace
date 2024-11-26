import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [collection, setCollection] = useState('');
  const [importType, setImportType] = useState('dataset'); // dataset or application
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCollectionChange = (e) => {
    setCollection(e.target.value);
  };

  const handleImportTypeChange = (e) => {
    setImportType(e.target.value);
    setFile(null); // Reset file input when switching type
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    if (importType === 'dataset') {
      formData.append('collection', collection);
    }

    try {
      const endpoint =
        importType === 'dataset'
          ? 'http://localhost:5000/data/upload'
          : 'http://localhost:5000/applications/upload';

      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erreur : ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <h2>Importer un fichier</h2>
      <div>
        <label>
          <input
            type="radio"
            name="importType"
            value="dataset"
            checked={importType === 'dataset'}
            onChange={handleImportTypeChange}
          />
          Importer un jeu de données (CSV)
        </label>
        <label>
          <input
            type="radio"
            name="importType"
            value="application"
            checked={importType === 'application'}
            onChange={handleImportTypeChange}
          />
          Importer une application (Python, C, etc.)
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {importType === 'dataset' && (
          <div>
            <label>Nom de la collection :</label>
            <input
              type="text"
              value={collection}
              onChange={handleCollectionChange}
              placeholder="Nom de la collection (optionnel)"
            />
          </div>
        )}
        <div>
          <label>Fichier {importType === 'dataset' ? 'CSV' : '(Python, C, etc.)'} :</label>
          <input
            type="file"
            accept={importType === 'dataset' ? '.csv' : '.py,.c,.cpp,.java,.js'}
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Importer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
