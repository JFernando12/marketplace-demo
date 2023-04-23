import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import { useCreateProductApiMutation } from '../state/api';
import Header from '../components/Header';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductApiMutation({
    onSuccess: () => {
      navigate('/mis productos', { replace: true });
    },
    onError: (error) => {
      console.error(error);
    },
    // Invalidar la caché de la consulta de productos después de la mutación
    refetchQueries: ['getProducts'],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct({ name, sku, quantity, price });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Header title="Crear Producto" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="400px"
        mt="50px"
      >
        <TextField
          id="name"
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="sku"
          label="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="quantity"
          label="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="price"
          label="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          mt="20px"
        >
          {isLoading ? 'Creando Producto...' : 'Crear Producto'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProduct;
