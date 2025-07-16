import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemButton, ListItemText, CircularProgress, IconButton, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useParams, useNavigate } from 'react-router-dom';
import { TopicType } from '../types/topic.types';
import { getTopics, addTopic } from '../services/topicService';
import { getAllCategories } from '../services/categoryService';

const CategoryTopicsList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [addError, setAddError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getTopics(),
      getAllCategories()
    ])
      .then(([allTopics, allCategories]) => {
        setTopics(allTopics.filter(t => String(t.categoryId) === id));
        const cat = allCategories.find((c) => String(c.id) === id);
        setCategoryName(cat?.nameCategory || '');
      })
      .catch(() => setError('שגיאה בטעינת נושאים או קטגוריה'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress /></Box>;
  if (error) return <Box textAlign="center" color="error.main">{error}</Box>;

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600, justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'red', letterSpacing: 1, textShadow: '0 2px 8px #fff' }}>
          {categoryName ? `קטגוריה: ${categoryName}` : 'נושאים בקטגוריה'}
        </Typography>
        <IconButton color="primary" onClick={() => setAdding(true)} sx={{ ml: 2 }}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      <Typography variant="h5" sx={{ mb: 3, color: '#222', fontWeight: 400 }}>{categoryName && 'רשימת נושאים'}</Typography>
      {/* טופס הוספת נושא */}
      {adding && (
        <Box sx={{ width: '100%', maxWidth: 600, mb: 2, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 3, boxShadow: 2, p: 2, border: '1px solid #1976d2' }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>הוסף נושא חדש:</Typography>
          <TextField
            label="כותרת הנושא"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={async () => {
              setAddError(null);
              if (!newTitle.trim()) {
                setAddError('יש להזין כותרת לנושא');
                return;
              }
              try {
                await addTopic(Number(id), newTitle.trim());
                // רענון רשימת הנושאים מהשרת כדי להציג כותרת תקינה
                const allTopics = await getTopics();
                setTopics(allTopics.filter(t => String(t.categoryId) === id));
                setNewTitle('');
                setAdding(false);
              } catch (err) {
                setAddError('שגיאה בהוספת נושא');
                console.error('[CategoryTopicsList] שגיאה בהוספת נושא:', err);
              }
            }}>הוסף</Button>
            <Button variant="outlined" color="secondary" onClick={() => { setAdding(false); setNewTitle(''); setAddError(null); }}>ביטול</Button>
          </Box>
          {addError && <Typography color="error" sx={{ mt: 1 }}>{addError}</Typography>}
        </Box>
      )}
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2 }}>
        <List sx={{ bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 4, boxShadow: 4, border: '1.5px solid #222' }}>
          {topics.length === 0 && (
            <ListItem key="no-topics">
              <ListItemText primary="אין נושאים בקטגוריה זו" sx={{ color: '#888' }} />
            </ListItem>
          )}
          {topics.map(topic => (
            <ListItem key={topic.id} sx={{ pl: 2 }}>
              <Card sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 3, boxShadow: 2, border: '1px solid #f44336', ':hover': { boxShadow: 8, bgcolor: '#fff' }, transition: '0.2s', p: 1 }}>
                <CardContent>
                  <ListItemButton onClick={() => navigate(`/Topic/${topic.id}`)} sx={{ borderRadius: 2, ':hover': { bgcolor: '#f44336', color: '#fff' } }}>
                    <ListItemText primary={topic.title} />
                  </ListItemButton>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CategoryTopicsList;
