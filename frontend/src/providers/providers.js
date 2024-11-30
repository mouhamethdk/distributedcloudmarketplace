import React, { useState } from 'react';
import axios from 'axios';

const DataUpload = () => {
  const [file, setFile] = useState(null); // Fichier sélectionné
  const [collection, setCollection] = useState(''); // Nom de la collection ou de la base
  const [importType, setImportType] = useState('data'); // Type d'import : data ou application
  const [description, setDescription] = useState(''); // Description pour les applications
  const [message, setMessage] = useState(''); // Message de statut

  // Gestion des changements d'entrée utilisateur
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCollectionChange = (e) => {
    setCollection(e.target.value);
  };

  const handleImportTypeChange = (e) => {
    setImportType(e.target.value);
    if (e.target.value !== 'application') {
      setDescription(''); // Réinitialiser la description si ce n'est pas une application
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Veuillez sélectionner un fichier.');
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
      const url =
        importType === 'data'
          ? 'http://localhost:5000/data/upload'
          : 'http://localhost:5000/application/upload';

      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message || 'Fichier importé avec succès.');
    } catch (error) {
      setMessage('Erreur : ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <h2>Importer un fichier</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type d'import :</label>
          <select value={importType} onChange={handleImportTypeChange}>
            <option value="data">Importer des données</option>
            <option value="application">Importer une application</option>
          </select>
        </div>
        {importType === 'data' && (
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
        {importType === 'application' && (
          <div>
            <label>Description :</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Ajoutez une description pour l'application"
              rows="3"
            />
          </div>
        )}
        <div>
          <label>Fichier :</label>
          <input
            type="file"
            accept=".csv,.py,.c,.js,.txt,.json,.html,.css"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            color: '#FFF',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          Importer
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: '20px',
            color: message.startsWith('Erreur') ? 'red' : 'green',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DataUpload;
