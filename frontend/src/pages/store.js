import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
} from '@mui/material';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { useGetProductsBuyerApiQuery } from '../state/api';

const Product = ({ id, name, sku, price }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} variant="body2">
          sku: {sku}
        </Typography>
        <Button type="submit" variant="contained" color="primary" mt="20px">
          Añadir al carrito{' '}
        </Button>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [filterPriceRange, setFilterPriceRange] = useState({});

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsBuyerApiQuery({
    key: filter,
    ...filterPriceRange,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  const handleQueryChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setFilter(searchTerm);
    }
  };

  const hangleFilterChange = (e) => {
    setFilterPriceRange({ minPrice, maxPrice });
  };

  const hanglePriceChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'maxPrice') setMaxPrice(value);
    if (name === 'minPrice') setMinPrice(value);
  };

  return (
    <>
      <Navbar></Navbar>
      <Box m="1.5rem 2.5rem">
        <Header title="Store" subtitle="See your list of products." />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleQueryChange}
            onKeyUp={handleKeyPress}
            sx={{ width: '40%' }}
          />
        </Box>
        <Box display="flex" alignItems="center" mt="20px">
          <Typography sx={{ mr: '1rem' }}>Rango precio:</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Min"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="minPrice"
            value={minPrice}
            onChange={hanglePriceChange}
            sx={{ mr: '1rem' }}
          />
          <Typography sx={{ mr: '1rem' }}>-</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Max"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            name="maxPrice"
            value={maxPrice}
            onChange={hanglePriceChange}
            sx={{ mr: '1rem' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={hangleFilterChange}
          >
            Filter
          </Button>
        </Box>
        {products || !isLoading ? (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            {products.map(({ id, name, sku, price }) => (
              <Product key={id} id={id} name={name} sku={sku} price={price} />
            ))}
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
};

export default Products;
