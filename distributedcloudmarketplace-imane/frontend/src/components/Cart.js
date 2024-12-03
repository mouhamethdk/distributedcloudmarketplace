import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CssBaseline, TextField, Typography, MenuItem, Button } from '@mui/material';
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

const Cart = () => {
  const [applications, setApplications] = useState([]); // Stocker les applications
  const [dataFiles, setDataFiles] = useState([]); // Stocker les données
  const [hoveredAppDescription, setHoveredAppDescription] = useState(''); // Description de l'application survolée
  const [hoveredAppPosition, setHoveredAppPosition] = useState({}); // Position de l'application survolée
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [selectedApplication, setSelectedApplication] = useState('');

  // Charger les applications depuis MongoDB
  useEffect(() => {
    axios.get('http://localhost:5000/application/all')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Erreur lors de la récupération des applications :', error));
  }, []);

  // Charger les fichiers de données depuis MongoDB
  useEffect(() => {
    axios.get('http://localhost:5000/data/all')
      .then(response => setDataFiles(response.data))
      .catch(error => console.error('Erreur lors de la récupération des données :', error));
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

  const handleAddToCart = () => {
    if (selectedData && selectedApplication) {
      setCart([...cart, { data: selectedData, application: selectedApplication }]);
      setSelectedData('');
      setSelectedApplication('');
    }
  };

  const handleCheckout = () => {
    console.log('Initiating checkout with cart:', cart);
    axios.post('http://localhost:5000/api/cart/checkout', { cart })
      .then(response => {
        console.log('Checkout successful:', response.data);
        setMessage('Checkout successful!');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Checkout error:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        setMessage('Checkout failed.');
      });
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
                value={selectedApplication}
                onChange={(e) => setSelectedApplication(e.target.value)}
              >
                {applications.map((app, index) => (
                  <MenuItem
                    key={index}
                    value={app.filename}
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
              value={selectedData}
              onChange={(e) => setSelectedData(e.target.value)}
            >
              {dataFiles.map((file, index) => (
                <MenuItem key={index} value={file.filename}>
                  <strong>Nom du fichier :</strong> {file.filename}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <Typography color="error">Aucune donnée trouvée.</Typography>
          )}
        </Box>

        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Ajouter au panier
        </Button>

        <Typography variant="h4">Votre Panier</Typography>
        {cart.map((item, index) => (
          <Typography key={index} variant="body1">
            {item.data} - {item.application}
          </Typography>
        ))}
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
        {message && <Typography variant="body1">{message}</Typography>}
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Cart;