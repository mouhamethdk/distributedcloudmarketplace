import React, { useEffect, useState } from "react";
import { Box, CssBaseline, TextField, Typography, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from '../marketing-page/components/Footer'; // Assurez-vous que le chemin est correct

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  maxWidth: '800px',
  margin: 'auto',
}));

const Test = () => {
  const [applications, setApplications] = useState([]); // Stocker les applications
  const [dataFiles, setDataFiles] = useState([]); // Stocker les données
  const [hoveredAppDescription, setHoveredAppDescription] = useState(''); // Description de l'application survolée
  const [hoveredAppPosition, setHoveredAppPosition] = useState({}); // Position de l'application survolée

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

  const handleMouseEnter = (description, event) => {
    const rect = event.target.getBoundingClientRect();
    setHoveredAppDescription(description);
    setHoveredAppPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredAppDescription('');
    setHoveredAppPosition({});
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container> 
        <Typography variant="h4" component="h1" gutterBottom>
          Applications et Données de MongoDB
        </Typography>

        {/* Section pour les applications */}
        <Box mb={4}>
          <Typography variant="h5" component="h2">
            Applications
          </Typography>
          {applications.length > 0 ? (
            <>
              <TextField
                select
                label="Sélectionner une application"
                fullWidth
                variant="outlined"
                margin="normal"
              >
                {applications.map((app, index) => (
                  <MenuItem
                    key={index}
                    onMouseEnter={(e) => handleMouseEnter(app.description, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <strong>Nom du fichier :</strong> {app.filename}
                  </MenuItem>
                ))}
              </TextField>
              {hoveredAppDescription && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: hoveredAppPosition.top,
                    left: hoveredAppPosition.left,
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #ccc',
                    padding: '10px',
                    zIndex: 1000
                  }}
                >
                  <Typography variant="h6">Description</Typography>
                  <Typography>{hoveredAppDescription}</Typography>
                </Box>
              )}
            </>
          ) : (
            <Typography color="error">Aucune application trouvée.</Typography>
          )}
        </Box>

        {/* Section pour les données */}
        <Box mb={4}>
          <Typography variant="h5" component="h2">
            Données
          </Typography>
          {dataFiles.length > 0 ? (
            <TextField
              select
              label="Sélectionner une donnée"
              fullWidth
              variant="outlined"
              margin="normal"
            >
              {dataFiles.map((file, index) => (
                <MenuItem key={index}>
                  <strong>Nom du fichier :</strong> {file.filename}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <Typography color="error">Aucune donnée trouvée.</Typography>
          )}
        </Box>

        {/* Ajout du footer */}
       
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Test;