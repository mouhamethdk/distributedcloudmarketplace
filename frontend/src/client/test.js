import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const CsvPreview = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [maxRows, setMaxRows] = useState(5); // Nombre maximum de lignes à afficher

  useEffect(() => {
    // Charger le fichier CSV depuis le dossier public
    fetch("/features_14.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier CSV");
        }
        return response.text();
      })
      .then((text) => {
        // Parser le contenu du CSV
        Papa.parse(text, {
          header: true, // Inclure les en-têtes
          skipEmptyLines: true, // Ignorer les lignes vides
          complete: (results) => {
            setHeaders(Object.keys(results.data[0])); // Récupérer les en-têtes
            setCsvData(results.data); // Récupérer les données
          },
        });
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }, []);

  return (
    <div>
      <h1>Aperçu du fichier features.csv</h1>

      {csvData.length > 0 ? (
        <div>
          <table border="1" style={{ marginTop: "20px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(0, maxRows).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex}>{row[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Affichage des {Math.min(maxRows, csvData.length)} premières lignes sur un total de{" "}
            {csvData.length} lignes.
          </p>

          {/* Bouton pour charger plus de lignes */}
          {maxRows < csvData.length && (
            <button onClick={() => setMaxRows(maxRows + 5)} style={{ marginTop: "10px" }}>
              Charger 5 lignes supplémentaires
            </button>
          )}
        </div>
      ) : (
        <p>Chargement des données en cours...</p>
      )}
    </div>
  );
};

export default CsvPreview;