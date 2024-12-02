import React, { useEffect, useState } from "react";

const Test = () => {
  const [applications, setApplications] = useState([]); // Stocker les applications
  const [dataFiles, setDataFiles] = useState([]); // Stocker les données

  // Charger les applications depuis MongoDB
  useEffect(() => {
    fetch("/api/application/all") // Assurez-vous que cet endpoint fonctionne
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des applications.");
        }
        return response.json();
      })
      .then((apps) => {
        setApplications(apps);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }, []);

  // Charger les fichiers de données depuis MongoDB
  useEffect(() => {
    fetch("/api/data/all") // Assurez-vous que cet endpoint fonctionne
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        return response.json();
      })
      .then((files) => {
        setDataFiles(files);
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Applications et Données de MongoDB</h1>

      <h2>Applications</h2>
      {applications.length > 0 ? (
        <div>
          <ul>
            {applications.map((app, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>Nom du fichier :</strong> {app.filename}
                <br />
                <strong>Description :</strong> {app.description}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement des applications...</p>
      )}

      <h2>Données</h2>
      {dataFiles.length > 0 ? (
        <div>
          <ul>
            {dataFiles.map((file, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>Nom du fichier :</strong> {file.filename}
                <br />
                <strong>Description :</strong> {file.description || "Aucune description"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Chargement des fichiers de données...</p>
      )}
    </div>
  );
};

export default Test;
