import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemButton, ListItemText, CircularProgress } from '@mui/material';
import { CategoryType } from '../types/category.types';
import { TopicType } from '../types/topic.types';
import { getAllCategories } from '../services/categoryService';
import { getTopics } from '../services/topicService';
import { useNavigate } from 'react-router-dom';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories()
      .then((cats) => {
        setCategories(cats);
      })
      .catch(() => setError('שגיאה בטעינת קטגוריות'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress /></Box>;
  if (error) return <Box textAlign="center" color="error.main">{error}</Box>;

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
      <Typography variant="h3" sx={{ mb: 3, fontWeight: 800, color: 'red', letterSpacing: 1, textShadow: '0 2px 8px #fff' }}>
        קטגוריות הפורום
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2 }}>
        <List sx={{ bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 4, boxShadow: 4, border: '1.5px solid #222' }}>
          {categories.map((cat) => (
            <ListItem key={cat.id} alignItems="flex-start" disablePadding sx={{ mb: 2, borderBottom: '1px solid #eee' }}>
              <Card sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.85)', borderRadius: 3, boxShadow: 2, border: '1px solid #f44336', ':hover': { boxShadow: 8, bgcolor: '#fff' }, transition: '0.2s', p: 1 }}>
                <CardContent>
                  <ListItemButton onClick={() => navigate(`/Categories/${cat.id}`)}>
                    <Typography variant="h5" fontWeight={700} color="#222" sx={{ mb: 1, letterSpacing: 1 }}>{cat.nameCategory}</Typography>
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

export default CategoryList;
