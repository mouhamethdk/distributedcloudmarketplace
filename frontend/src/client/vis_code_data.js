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
  const [applications, setApplications] = useState([]);
  const [dataFiles, setDataFiles] = useState([]);
  const [hardwareList, setHardwareList] = useState([]);
  const [hoveredDescription, setHoveredDescription] = useState('');
  const [hoveredPosition, setHoveredPosition] = useState({});
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedDataFile, setSelectedDataFile] = useState("");
  const [selectedHardware, setSelectedHardware] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/application/all")
      .then((response) => response.json())
      .then((apps) => setApplications(apps))
      .catch((error) =>
        console.error("Erreur lors de la récupération des applications :", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/data/all")
      .then((response) => response.json())
      .then((files) => setDataFiles(files))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/hardware/all")
      .then((response) => response.json())
      .then((hardware) => setHardwareList(hardware))
      .catch((error) =>
        console.error("Erreur lors de la récupération des matériels :", error)
      );
  }, []);

  const handleMouseEnter = (description, event) => {
    const rect = event.target.getBoundingClientRect();
    setHoveredDescription(description);
    setHoveredPosition({ top: rect.top + window.scrollY, left: rect.right + 10 });
  };

  const handleMouseLeave = () => {
    setHoveredDescription('');
    setHoveredPosition({});
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Applications, Données et Matériels de MongoDB
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
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
              >
                {applications.map((app, index) => (
                  <MenuItem
                    key={index}
                    value={app.filename}
                    onMouseEnter={(e) => handleMouseEnter(app.description, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {app.filename}
                  </MenuItem>
                ))}
              </TextField>
              {hoveredDescription && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: hoveredPosition.top,
                    left: hoveredPosition.left,
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #ccc',
                    padding: '10px',
                    zIndex: 1000,
                  }}
                >
                  <Typography variant="h6">Description</Typography>
                  <Typography>{hoveredDescription}</Typography>
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
            <>
              <TextField
                select
                label="Sélectionner une donnée"
                fullWidth
                variant="outlined"
                margin="normal"
                value={selectedDataFile}
                onChange={(e) => setSelectedDataFile(e.target.value)}
              >
                {dataFiles.map((file, index) => (
                  <MenuItem
                    key={index}
                    value={file.filename}
                    onMouseEnter={(e) => handleMouseEnter(file.description, e)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {file.filename}
                  </MenuItem>
                ))}
              </TextField>
              {hoveredDescription && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: hoveredPosition.top,
                    left: hoveredPosition.left,
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #ccc',
                    padding: '10px',
                    zIndex: 1000,
                  }}
                >
                  <Typography variant="h6">Description</Typography>
                  <Typography>{hoveredDescription}</Typography>
                </Box>
              )}
            </>
          ) : (
            <Typography color="error">Aucune donnée trouvée.</Typography>
          )}
        </Box>

        {/* Section pour les matériels */}
        <Box mb={4}>
          <Typography variant="h5" component="h2">
            Matériels
          </Typography>
          {hardwareList.length > 0 ? (
            <>
              <TextField
                select
                label="Sélectionner un matériel"
                fullWidth
                variant="outlined"
                margin="normal"
                value={selectedHardware}
                onChange={(e) => setSelectedHardware(e.target.value)}
              >
                {hardwareList.map((hardware, index) => (
                  <MenuItem
                    key={index}
                    value={`${hardware.os}, ${hardware.cpu}`}
                    onMouseEnter={(e) =>
                      handleMouseEnter(
                        `OS: ${hardware.os}, CPU: ${hardware.cpu}, GPU: ${hardware.gpu}, RAM: ${hardware.ram}, Storage: ${hardware.storage}`,
                        e
                      )
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    {`OS: ${hardware.os}, CPU: ${hardware.cpu}`}
                  </MenuItem>
                ))}
              </TextField>
              {hoveredDescription && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: hoveredPosition.top,
                    left: hoveredPosition.left,
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #ccc',
                    padding: '10px',
                    zIndex: 1000,
                  }}
                >
                  <Typography variant="h6">Description</Typography>
                  <Typography>{hoveredDescription}</Typography>
                </Box>
              )}
            </>
          ) : (
            <Typography color="error">Aucun matériel trouvé.</Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Test;
