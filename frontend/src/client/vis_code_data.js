import React, { useEffect, useState } from "react";

const Test = () => {
  const [applications, setApplications] = useState([]); // Stocker les applications
  const [dataFiles, setDataFiles] = useState([]); // Stocker les données
  const [hardwareList, setHardwareList] = useState([]); // Stocker les matériels

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

  // Charger les matériels depuis MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/hardware/all") // Endpoint pour récupérer les matériels
      .then((response) => response.json())
      .then((hardware) => {
        setHardwareList(hardware); // Stocker les matériels
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des matériels :", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Applications, Données et Matériels de MongoDB</h1>

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

      {/* Section pour les matériels */}
      <h2>Matériels</h2>
      {hardwareList.length > 0 ? (
        <ul>
          {hardwareList.map((hardware, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>OS :</strong> {hardware.os}
              <br />
              <strong>CPU :</strong> {hardware.cpu}
              <br />
              <strong>GPU :</strong> {hardware.gpu}
              <br />
              <strong>RAM :</strong> {hardware.ram}
              <br />
              <strong>Storage :</strong> {hardware.storage}
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement des matériels...</p>
      )}
    </div>
  );
};

export default Test;
