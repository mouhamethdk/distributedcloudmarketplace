import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Product({ product }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

export default Product;