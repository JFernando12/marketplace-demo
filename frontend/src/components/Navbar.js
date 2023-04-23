import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, isAdmin }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClose = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleOpen = () => {
    navigate('/mis productos');
  };

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isAdmin ? (
              <MenuIcon />
            ) : (
              <Typography variant="h4" fontWeight="bold">
                MAGIC LOG
              </Typography>
            )}
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        {isAdmin ? (
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlined sx={{ fontSize: '25px' }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: '25px' }} />
              )}
            </IconButton>
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
          </FlexBetween>
        ) : (
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlined sx={{ fontSize: '25px' }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: '25px' }} />
              )}
            </IconButton>
            <MenuItem onClick={handleOpen}>Ingresar</MenuItem>
          </FlexBetween>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
