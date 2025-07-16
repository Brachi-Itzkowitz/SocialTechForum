import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
// @ts-ignore
import Grid from '@mui/material/Grid';
import { TopicType } from '../types/topic.types';
import CategoryIcon from '@mui/icons-material/Category';

import { getTopics } from '../services/topicService';
import { getMessagesByTopic } from '../services/messageService';

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [messagesCount, setMessagesCount] = useState<{ [topicId: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTopics()
      .then(async (topics) => {
        console.log('[TopicList] topics from server:', topics);
        setTopics(topics);
        // טען כמות הודעות לכל נושא
        const counts: { [topicId: number]: number } = {};
        await Promise.all(
          topics.map(async (topic, idx) => {
            if (!topic.id) {
              console.warn(`[TopicList] נושא ללא id!`, topic, 'index:', idx);
            }
            try {
              const messages = await getMessagesByTopic(topic.id);
              counts[topic.id] = Array.isArray(messages) ? messages.length : 0;
            } catch {
              counts[topic.id] = 0;
            }
          })
        );
        setMessagesCount(counts);
      })
      .catch(() => setError('שגיאה בטעינת נושאים'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;
  if (error) return <Box textAlign="center" color="error.main">{error}</Box>;

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#1a237e', letterSpacing: 1, textShadow: '0 2px 8px #e3e3e3' }}>
        נושאים חמים בפורום
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 2 }}>
        {topics.map((topic, idx) => {
          if (!topic.id) {
            console.warn(`[TopicList] נושא ללא id ברינדור!`, topic, 'index:', idx);
          }
          return (
            <Card key={topic.id ?? `no-id-${idx}`} sx={{ borderRadius: 4, boxShadow: 4, bgcolor: 'linear-gradient(90deg, #e3f2fd 60%, #fffde7 100%)', mb: 3, width: '100%', transition: '0.2s', ':hover': { boxShadow: 8, bgcolor: '#fffde7' } }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <CategoryIcon color="primary" />
                  <Typography variant="h6" fontWeight={700} color="#283593">{topic.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {messagesCount[topic.id] > 0
                    ? `מספר הודעות: ${messagesCount[topic.id]}`
                    : 'אין הודעות'}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default TopicList;
