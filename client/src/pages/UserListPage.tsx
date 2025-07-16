import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, Avatar, CircularProgress } from '@mui/material';
import ProfileMenu from '../components/ProfileMenu';
import { getAllUsers } from '../services/userService';

import { useNavigate } from 'react-router-dom';
export default function UserListPage() {
  const navigateHome = window.location ? (window.location.assign ? (url: string) => window.location.assign(url) : undefined) : undefined;
  const [users, setUsers] = useState<{ id: number, name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('token');
  const userName = sessionStorage.getItem('userName') || 'משתמש';

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data.map(u => ({ id: u.id, name: u.name })));
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fffde7' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px 0 32px' }}>
        {token && <ProfileMenu userName={userName} />}
        <button style={{ padding: '8px 18px', borderRadius: 20, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigateHome && navigateHome('/')}>חזרה לדף הבית</button>
      </div>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 700, color: '#f44336', textAlign: 'center' }}>
        משתמשים מחוברים
      </Typography>
      {loading ? (
        <Box textAlign="center" mt={6}><CircularProgress /></Box>
      ) : (
        <List sx={{ maxWidth: 400, mx: 'auto', bgcolor: '#fff', borderRadius: 4, boxShadow: 4, border: '1.5px solid #222', mt: 2 }}>
          {users.map(u => (
            <ListItem key={u.id} sx={{ gap: 2 }}>
              <Avatar sx={{ bgcolor: '#ffe066', color: '#222', fontWeight: 700 }}>{u.name.charAt(0).toUpperCase()}</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{u.name}</Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
