import React, { useEffect, useState } from "react";

const Test = () => {
  const [applications, setApplications] = useState([]); // Stocker les applications
  const [dataFiles, setDataFiles] = useState([]); // Stocker les données

  // Charger les applications depuis MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/application/all") // Endpoint pour récupérer les applications
      .then((response) => response.json())
      .then((apps) => {
        setApplications(apps); // Stocker les applications
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des applications :", error);
      });
  }, []);

  // Charger les fichiers de données depuis MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/data/all") // Endpoint pour récupérer les données
      .then((response) => response.json())
      .then((files) => {
        setDataFiles(files); // Stocker les données
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Applications et Données de MongoDB</h1>

      {/* Section pour les applications */}
      <h2>Applications</h2>
      {applications.length > 0 ? (
        <ul>
          {applications.map((app, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>Nom du fichier :</strong> {app.filename}
              <br />
              <strong>Description :</strong> {app.description || "Aucune description"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement des applications...</p>
      )}

      {/* Section pour les données */}
      <h2>Données</h2>
      {dataFiles.length > 0 ? (
        <ul>
          {dataFiles.map((file, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>Nom du fichier :</strong> {file.filename}
              <br />
              <strong>Description :</strong> {file.description || "Aucune description"}
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement des fichiers de données...</p>
      )}
    </div>
  );
};

export default Test;
