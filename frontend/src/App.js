import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { themeSettings } from './theme';
import Layout from './pages/layout';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/signup';
import MyProducts from './pages/myproducts';
import Products from './pages/products';
import CreateProduct from './pages/createproduct';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" Component={Login}></Route>
            <Route path="/signup" Component={Signup}></Route>
            <Route element={<PrivateRoute Component={Layout}></PrivateRoute>}>
              <Route path="/mis productos" Component={MyProducts}></Route>
              <Route path="/productos" Component={Products}></Route>
              <Route path="/crear producto" Component={CreateProduct}></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
