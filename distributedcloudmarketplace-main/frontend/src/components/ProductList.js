import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import Grid from '@mui/material/Grid';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid item key={product._id} xs={12} sm={6} md={4}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;