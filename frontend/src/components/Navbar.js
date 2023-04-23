import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import { useTheme, AppBar, Toolbar, IconButton, MenuItem } from '@mui/material';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClose = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
