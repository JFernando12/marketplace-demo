import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../components/Header';
import { useGetProductsQuery } from '../state/api';

const MyProducts = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetProductsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleLoginClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSignupClick = () => {
    localStorage.removeItem('token');
    navigate('/signup');
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
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Mis Productos" />
      {error ? (
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
      ) : (
        <Box
          mt="40px"
          height="70vh"
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
            loading={isLoading || !data}
            getRowId={(row) => row.id}
            rows={data || []}
            columns={columns}
          />
        </Box>
      )}
    </Box>
  );
};

export default MyProducts;
