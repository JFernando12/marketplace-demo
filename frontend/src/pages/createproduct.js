import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { useCreateProductApiMutation } from '../state/api';
import Header from '../components/Header';

const CreateProduct = () => {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const [errors, setErrors] = useState(null);
  const [createProduct, { isLoading }] = useCreateProductApiMutation({
    // Invalidar la caché de la consulta de productos después de la mutación
    refetchQueries: ['getProducts'],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await createProduct({ name, sku, quantity, price });

    if (error) {
      setErrors(error.data);
      return;
    }

    navigate('/mis productos');
  };

  const handleLoginClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSignupClick = () => {
    localStorage.removeItem('token');
    navigate('/signup');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
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
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          id="price"
          label="Precio"
          type="number"
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
        {errors && (
          <>
            <Box mt="40px">
              <Typography variant="h5" color={theme.palette.secondary[300]}>
                No estas autorizado para esta sección.
              </Typography>
            </Box>
            <Box mt="40px">
              <Button onClick={handleLoginClick} variant="contained">
                Iniciar sesión
              </Button>
              <Box display="inline" mx={1} />
              <Button onClick={handleSignupClick} variant="outlined">
                Registrarse
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default CreateProduct;
