import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetProductsQuery } from '../state/api';
import Header from '../components/Header';
import { DataGrid } from '@mui/x-data-grid';

const MyProducts = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProductsQuery();
  console.log('data', data);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'header-cell',
    },
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
      <Box
        mt="40px"
        height="65vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            textAlign: 'center',
          },
          '& .header-cell': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
            textAlign: 'center',
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
    </Box>
  );
};

export default MyProducts;
