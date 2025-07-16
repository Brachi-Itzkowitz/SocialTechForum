
import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, IconButton, Tooltip, TextField, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getPrivateUser, updateUser } from '../services/userService';
import { parseJwt } from '../services/jwtService';
import { UserType } from '../types/user.types';

const ProfilePage: React.FC = () => {
  const navigate = window.location ? (window.location.assign ? (url: string) => window.location.assign(url) : undefined) : undefined;
  const [user, setUser] = useState<UserType | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Partial<UserType>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    // פענוח ה־id מהטוקן
    const payload = parseJwt(token);
    const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    if (!userId) {
      setLoading(false);
      return;
    }
    // קריאה לשרת לפי id
    import('../services/userService').then(({ getUserById }) => {
      getUserById(userId)
        .then((u) => {
          setUser(u);
          setForm(u);
        })
        .catch((err) => {
          console.error('getUserById error:', err);
        })
        .finally(() => setLoading(false));
    });
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    if (user) setForm(user);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSave = async () => {
    if (!user) return;
    try {
      // שליחת רק השדות המותרים לעדכון
      const dataToSend: any = {
        name: form.name || user.name,
        email: form.email || user.email,
        password: form.password || undefined,
        imageProfileUrl: user.imageProfileUrl || ''
      };
      const updated = await updateUser(user.id, dataToSend);
      setUser(updated);
      setEditMode(false);
      // ניווט אוטומטי לדף הפרופיל
      window.location.reload();
    } catch (err) {
      // אפשר להציג הודעת שגיאה למשתמש
      console.error('עדכון משתמש נכשל:', err);
    }
  };

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress /></Box>;

  // טיפול במקרה שהשדות לא קיימים (תמיכה גם באותיות גדולות וגם קטנות)
  // תמיכה גם באותיות גדולות וגם קטנות (למקרה שהשרת מחזיר אות גדולה)
  // תמיכה בשדות מהשרת (PascalCase) בלבד, לפי ה-entity
  const email = user?.email || '';
  const countMessages = user?.countMessages ?? '';
  const role = user?.role || '';
  const registrationDate = user?.registrationDate
    ? new Date(user.registrationDate).toLocaleDateString()
    : '';


  // Debug: הדפסת user ל-console
  console.log('user:', user);
  if (!user) return <Box textAlign="center" mt={6}>לא נמצא משתמש</Box>;

  return (
    <Box maxWidth={420} mx="auto" mt={6} p={3} borderRadius={4} boxShadow={3} bgcolor="#fff" textAlign="center">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <div></div>
        <button style={{ padding: '8px 18px', borderRadius: 20, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigate && navigate('/')}>חזרה לדף הבית</button>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar src={user.imageProfileUrl} sx={{ width: 80, height: 80, mb: 1 }} />
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h5" fontWeight={700}>{user.name}</Typography>
          <Tooltip title="עדכן" arrow>
            <IconButton onClick={handleEdit} size="small" color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {editMode ? (
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField label="שם משתמש" name="name" value={form.name || ''} onChange={handleChange} fullWidth />
          <TextField label="אימייל" name="email" value={form.email || ''} onChange={handleChange} fullWidth />
          <TextField label="סיסמה" name="password" value={form.password || ''} onChange={handleChange} fullWidth type="password" />
          <Box display="flex" gap={2} justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSave}>שמור</Button>
            <Button variant="outlined" onClick={handleCancel}>ביטול</Button>
          </Box>
        </Box>
      ) : (
        <>
          <Typography variant="body1" mt={1}>אימייל: {email}</Typography>
          <Typography variant="body1">רמת משתמש: {role}</Typography>
          <Typography variant="body1">מספר הודעות: {countMessages}</Typography>
          <Typography variant="body1">נרשם בתאריך: {registrationDate}</Typography>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;



