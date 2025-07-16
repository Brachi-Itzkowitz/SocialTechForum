import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, CardContent, Avatar, Typography, Box, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/User');
                console.log(response.data);
                setUsers(response.data);   
            }
            catch (err) {
                setError('error in popping (grting) the users');
                console.error(err)
            }
        };
        fetchUsers();
    }, []);

    if (error) return <p>{error}</p>;

    return(
        <Box sx={{
            maxWidth: 650,
            margin: '40px auto',
            p: 4,
            borderRadius: 6,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            background: 'rgba(255,255,255,0.55)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(8px)',
            position: 'relative',
        }}>
            <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1 }}>
                רשימת משתמשים
            </Typography>
            <Stack spacing={3}>
                {users.map(user => {
                    // פונקציה שמחזירה צבע קבוע לכל אות
                    const getColorByChar = (char) => {
                        const colors = [
                            '#e57373', // אדום
                            '#f06292', // ורוד
                            '#ba68c8', // סגול
                            '#64b5f6', // כחול
                            '#4db6ac', // טורקיז
                            '#81c784', // ירוק
                            '#ffd54f', // צהוב
                            '#ffb74d', // כתום
                            '#a1887f', // חום
                            '#90a4ae', // אפור
                        ];
                        if (!char) return colors[0];
                        const code = char.toUpperCase().charCodeAt(0);
                        return colors[code % colors.length];
                    };
                    const firstChar = user.name?.charAt(0).toUpperCase();
                    const avatarBg = getColorByChar(firstChar);
                    return (
                        <Card key={user.name} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 4,
                            boxShadow: '0 2px 12px 0 rgba(80, 80, 180, 0.10)',
                            p: 2,
                            background: 'rgba(255,255,255,0.85)',
                            border: '1px solid #e0e7ff',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.025)', boxShadow: '0 4px 24px 0 rgba(80, 80, 180, 0.18)' }
                        }}>
                            <Avatar
                                src={user.profileImage || undefined}
                                sx={{
                                    bgcolor: user.profileImage ? undefined : avatarBg,
                                    color: user.profileImage ? undefined : '#fff',
                                    width: 64,
                                    height: 64,
                                    fontSize: 32,
                                    mr: 3,
                                    boxShadow: '0 2px 8px 0 rgba(80, 80, 180, 0.10)'
                                }}
                            >
                                {user.profileImage ? '' : (firstChar || <PersonIcon />)}
                            </Avatar>
                            <CardContent sx={{ flex: 1, p: 0 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                                    <span style={{ color: '#4f46e5', fontWeight: 500 }}>תפקיד:</span> {user.role}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default UserList