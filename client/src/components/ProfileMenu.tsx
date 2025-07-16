import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton, Typography, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  userName: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userName }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/Profile');
    handleClose();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
    handleClose();
    window.location.reload(); // רענון הדף אחרי התנתקות
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton onClick={handleMenu} size="large" sx={{ p: 0 }}>
        <Avatar sx={{ bgcolor: '#ffe066', color: '#222', width: 48, height: 48, fontWeight: 700 }}>
          {userName?.charAt(0).toUpperCase() || <PersonIcon />}
        </Avatar>
      </IconButton>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#222' }}>{userName}</Typography>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem onClick={handleProfile}>
          <PersonIcon sx={{ mr: 1 }} />
          פרופיל
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          התנתקות
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
