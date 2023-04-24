import React, { useEffect, useState } from 'react';
import {
  Box,
  useTheme,
  Typography,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import {
  useGetProductsAdminApiQuery,
  useGetSellersApiQuery,
} from '../state/api';
import Header from '../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState(null); // Estado local para el ID del vendedor seleccionado

  const {
    data: productsData,
    isLoading: productsIsLoading,
    error: productsError,
    refetch: productsRefetch,
  } = useGetProductsAdminApiQuery({
    user_id: sellerId, // Incluye el ID del vendedor en la consulta de la API
  });
  const { data: sellersData, refetch: refetchSellers } =
    useGetSellersApiQuery();

  useEffect(() => {
    productsRefetch();
    refetchSellers();
  }, [productsRefetch, refetchSellers]);

  const handleLoginClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSellerChange = (event) => {
    setSellerId(event.target.value);
  };

  const columns = [
    {
      field: 'sku',
      headerName: 'SKU',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell',
    },
    {
      field: 'name',
      headerName: 'NOMBRE',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell',
    },
    {
      field: 'price',
      headerName: 'PRECIO',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell',
    },
    {
      field: 'quantity',
      headerName: 'CANTIDAD',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell',
    },
    {
      field: 'email',
      headerName: 'VENDEDOR',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell',
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Todos los Productos" />
      {productsError ? (
        <>
          <Box mt="40px">
            <Typography variant="h5" color={theme.palette.secondary[300]}>
              Solo el administrador tiene acceso a esta sección.
            </Typography>
          </Box>
          <Box mt="40px">
            <Button onClick={handleLoginClick} variant="contained">
              Iniciar sesión
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            mb={2}
            sx={{
              '& .MuiSelect-select': { color: theme.palette.secondary[100] },
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: theme.palette.secondary[100], mr: 2 }}
            >
              Filtrar por vendedor:
            </Typography>
            <Select value={sellerId || ''} onChange={handleSellerChange}>
              <MenuItem value="">Todos</MenuItem>
              {(sellersData || []).map((seller) => {
                return <MenuItem value={seller.id}>{seller.email}</MenuItem>;
              })}
            </Select>
          </Box>
          <Box
            mt="40px"
            height="60vh"
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: 'none',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme.palette.primary.light,
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: 'none',
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              loading={productsIsLoading || !productsData}
              getRowId={(row) => row.id}
              rows={productsData || []}
              columns={columns}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Products;
