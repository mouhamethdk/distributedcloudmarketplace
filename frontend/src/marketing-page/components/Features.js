import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// Icônes MUI
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import EdgeSensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';

// Composant pour afficher chaque carte de produit
const ProductCard = ({ title, description, icon: Icon }) => (
  <Card variant="outlined" sx={{ width: 300, p: 2, m: 1 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
      <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {description}
      </Typography>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default function Features() {
  const [applications, setApplications] = useState([]);
  const [dataFeatures, setDataFeatures] = useState([]);
  const [hardware, setHardware] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données depuis l'API backend
    const fetchData = async () => {
      try {
        const appResponse = await axios.get('/api/applications');
        const dataResponse = await axios.get('/api/dataFeatures');
        const hardwareResponse = await axios.get('/api/hardware');

        setApplications(appResponse.data);
        setDataFeatures(dataResponse.data);
        setHardware(hardwareResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Applications Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Applications
          </Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto' }}>
            {applications.map((app, index) => (
              <ProductCard
                key={index}
                title={app.name}
                description={app.description}
                icon={ViewQuiltRoundedIcon}
              />
            ))}
          </Box>
        </Box>

        {/* DataFeatures Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            DataFeatures
          </Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto' }}>
            {dataFeatures.map((feature, index) => (
              <ProductCard
                key={index}
                title={feature.name}
                description={feature.description}
                icon={EdgeSensorHighRoundedIcon}
              />
            ))}
          </Box>
        </Box>

        {/* Hardware Section */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Hardware
          </Typography>
          <Box sx={{ display: 'flex', overflowX: 'auto' }}>
            {hardware.map((hw, index) => (
              <ProductCard
                key={index}
                title={hw.name}
                description={hw.description}
                icon={DevicesRoundedIcon}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
