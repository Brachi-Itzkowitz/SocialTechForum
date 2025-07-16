import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, CircularProgress, IconButton, Tooltip, Menu, MenuItem, TextField, Button } from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useParams } from 'react-router-dom';
import { MessageType } from '../types/message.types';
import { TopicType } from '../types/topic.types';
import { getMessagesByTopic, addMessage } from '../services/messageService';
import { addFeedback, getFeedbacks } from '../services/feedbackService';
import FeedbackList from './FeedbackList';
import { FeedbackImougeType } from '../types/enums/feedbackImugeEnum.types';
import { UserType } from '../types/user.types';
import { getTopics } from '../services/topicService';


const mapServerEnum = (value: number): keyof typeof FeedbackImougeType =>
  Object.keys(FeedbackImougeType)[value] as any;

const TopicMessagesList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [allFeedbacks, setAllFeedbacks] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [adding, setAdding] = useState(false);
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: null | HTMLElement }>({});
  const [user, setUser] = useState<UserType | null>(null);
  // שליפת משתמש נוכחי מה-sessionStorage (בהנחה שיש שם)
  // שליפת שם משתמש מה-token (JWT)
  useEffect(() => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
      const decoded: any = jwtDecode(token);
        // שם המשתמש מה-token (בהנחה שיש claim כזה)
        const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.name || '';
        const idValue = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? decoded.id;
        setUser({
          id: isNaN(Number(idValue)) ? -1 : Number(idValue),
          name,
          password: '',
          email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || '',
          imageProfileUrl: '',
          role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'user',
          countMessages: 0,
          registrationDate: '',
        });
      }
    } catch { }
  }, []);
  const [topic, setTopic] = useState<TopicType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    console.log(`[TopicMessagesList] טעינת נושא id=${id}`);
    Promise.all([
      getMessagesByTopic(Number(id)),
      getTopics(),
      getFeedbacks()
    ])
      .then(([msgs, topics, feedbacks]) => {
        console.log(`[TopicMessagesList] הודעות נטענו לנושא ${id}:`, msgs);
        setMessages(msgs);
        setAllFeedbacks(feedbacks);
        const foundTopic = topics.find(t => String(t.id) === id);
        setTopic(foundTopic || null);
        if (foundTopic) console.log(`[TopicMessagesList] נושא נטען:`, foundTopic);
        msgs.forEach(msg => {
          const msgFeedbacks = feedbacks.filter(fb => fb.messageId === msg.id);
          console.log(`[TopicMessagesList] הודעה ${msg.id} פידבקים:`, msgFeedbacks);
        });
      })
      .catch((err) => {
        console.error('שגיאה בטעינת הודעות או נושא', err);
        setError('שגיאה בטעינת הודעות או נושא');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box textAlign="center" mt={6}><CircularProgress /></Box>;
  if (error) return <Box textAlign="center" color="error.main">{error}</Box>;

  // קיבוץ פידבקים לפי סוג ומשתמש
  const groupFeedbacks = (feedbacks: any[] = []) => {
    const map: { [key: string]: { type: string, userIds: number[], count: number } } = {};
    feedbacks.forEach(fb => {
      if (!map[fb.type]) map[fb.type] = { type: fb.type, userIds: [], count: 0 };
      if (fb.userId) map[fb.type].userIds.push(fb.userId);
      map[fb.type].count++;
    });
    return map;
  };

  // כל האימוג'ים האפשריים (ללא לייק ודיסלייק)
  const allEmojis = [FeedbackImougeType.Happy, FeedbackImougeType.Lought, FeedbackImougeType.Sad, FeedbackImougeType.Angry, FeedbackImougeType.Shock];

  // הוספת פידבק
  const handleAddFeedback = async (messageId: number, type: string) => {
    if (!user) return;
    console.log('➡️ שולחת פידבק לשרת:', { messageId, type });

    try {
      const res = await addFeedback(messageId, type, user?.id);
      console.log('✅ פידבק נוסף:', res);
      const feedbacks = await getFeedbacks(); // ← הוסיפי את זה כדי לבדוק אם הוא נוסף
      setAllFeedbacks(feedbacks);
    } catch (err) {
      console.error('❌ שגיאה בשליחת פידבק:', err);
    }

    // console.log('הולך לשלוח פידבק:', { messageId, type });
    // try {
    //   const res = await addFeedback(messageId, type);
    //   console.log('פידבק נוסף בהצלחה:', res);
    //   // רענון הודעות
    //   if (id) {
    //     const msgs = await getMessagesByTopic(Number(id));
    //     setAllFeedbacks(prev => [...prev, res]);

    //   }
    // } catch (err) {
    //   console.error('שגיאה בשליחת פידבק:', err);
    // }
  };

  // פתיחת תפריט אימוג'ים
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, msgId: number) => {
    setAnchorEl(prev => ({ ...prev, [msgId]: event.currentTarget }));
  };
  const handleCloseMenu = (msgId: number) => {
    setAnchorEl(prev => ({ ...prev, [msgId]: null }));
  };

  // הוספת הודעה חדשה
  const handleAddMessage = async () => {
    if (!id || !newMsg.trim()) return;
    setAdding(true);
    try {
      await addMessage(Number(id), newMsg);
      setNewMsg('');
      // רענון הודעות אחרי הוספה
      const msgs = await getMessagesByTopic(Number(id));
      setMessages(msgs);
      // גלילה אוטומטית לתחתית הרשימה
      setTimeout(() => {
        const list = document.getElementById('messages-list');
        if (list) list.scrollTop = list.scrollHeight;
      }, 100);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'red', letterSpacing: 1, textShadow: '0 2px 8px #fff' }}>
        {topic?.title || 'נושא'}
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2 }}>
        <List id="messages-list" sx={{ bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 4, boxShadow: 4, border: '1.5px solid #222', maxHeight: 500, overflowY: 'auto' }}>
          {messages.length === 0 && (
            <ListItem key="no-messages">
              <ListItemText primary="אין הודעות בנושא זה" sx={{ color: '#888' }} />
            </ListItem>
          )}
          {/* מיון הודעות – ישנה ביותר ראשונה */}
          {[...messages]
            .map(msg => ({
              ...msg,
              timeSend: msg.timeSend ? new Date(msg.timeSend) : new Date(Date.now() - Math.floor(Math.random() * 10 + 1) * 60000)
            }))
            .sort((a, b) => a.timeSend.getTime() - b.timeSend.getTime())
            .map((msg, idx) => {
              // לוג הודעה ופידבקים
              console.log(`[TopicMessagesList] הודעה ${msg.id}:`, msg);
              const msgFeedbacks = allFeedbacks
                .filter(fb => fb.messageId === msg.id)
                .map(fb => ({ ...fb, type: mapServerEnum(fb.type as unknown as number) }));
              console.log(`[TopicMessagesList] פידבקים להודעה ${msg.id}:`, msgFeedbacks);
              const grouped = groupFeedbacks(msgFeedbacks);
              const userId = user?.id ?? -1;
              const usedTypes = Object.keys(grouped).filter(type => grouped[type].userIds.includes(userId));
              const available = allEmojis.filter(e => !usedTypes.includes(e));
              return (
                <ListItem key={msg.id} sx={{ p: 0, mb: 2, alignItems: 'flex-start', bgcolor: 'transparent' }}>
                  <Card sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.97)', borderRadius: 3, boxShadow: 2, border: '1px solid #f44336', display: 'flex', flexDirection: 'row', p: 0 }}>
                    {/* צד ימין: פרופיל */}
                    <Box sx={{ width: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', pt: 2, pr: 1 }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: getColorByChar(msg.user?.name), overflow: 'hidden', mb: 1, border: '2px solid #f44336', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff', fontWeight: 700 }}>
                        {msg.user?.imageProfileUrl ? (
                          <img src={msg.user.imageProfileUrl} alt={msg.user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>{msg.user?.name?.charAt(0) || '?'}</span>
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ color: '#222', fontWeight: 600, textAlign: 'center', wordBreak: 'break-word' }}>{msg.user?.name}</Typography>
                    </Box>
                    {/* גוף ההודעה */}
                    <Box sx={{ flex: 1, p: 2, pt: 1, position: 'relative', minHeight: 80 }}>
                      {/* מספר סידורי */}
                      <Typography variant="caption" sx={{ position: 'absolute', left: 0, top: 8, color: '#aaa', fontWeight: 700 }}>#{idx + 1}</Typography>
                      {/* תאריך */}
                      <Typography variant="caption" sx={{ position: 'absolute', right: 8, top: 8, color: '#888', fontSize: 13 }}>{msg.timeSend ? new Date(msg.timeSend).toLocaleDateString() : ''}</Typography>
                      {/* תוכן */}
                      <Typography variant="body1" fontWeight={600} color="#222" sx={{ mb: 1, whiteSpace: 'pre-line' }}>{msg.content}</Typography>
                      {/* פידבקים להודעה */}
                      <FeedbackList feedbacks={msgFeedbacks} onFeedbackClick={type => handleAddFeedback(msg.id, type)} />
                      {/* קו אפור + פעולות */}
                      <Box sx={{ borderTop: '1px solid #eee', mt: 2, pt: 1, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {/* לייק */}
                        <Tooltip title="אהבתי">
                          <IconButton onClick={() => handleAddFeedback(msg.id, 'Like')}>
                            <ThumbUpIcon />
                          </IconButton>
                        </Tooltip>

                        {/* דיסלייק */}
                        <Tooltip title="לא אהבתי">
                          <IconButton onClick={() => handleAddFeedback(msg.id, 'Dislike')}>
                            <ThumbDownIcon />
                          </IconButton>
                        </Tooltip>

                        {/* כפתור הוסף אימוג'י */}
                        <Tooltip title="הוסף אימוג'י">
                          <IconButton onClick={(e) => handleOpenMenu(e, msg.id)}>
                            <AddReactionIcon />
                          </IconButton>
                        </Tooltip>

                        {/* תפריט פופאפ לכל האימוג'ים */}
                        <Menu
                          anchorEl={anchorEl[msg.id]}
                          open={Boolean(anchorEl[msg.id])}
                          onClose={() => handleCloseMenu(msg.id)}
                        >
                          {Object.entries(FeedbackImougeType)
                            .filter(([key]) => !['Like', 'Dislike'].includes(key))
                            .map(([key, emoji]) => (
                              <MenuItem key={key} onClick={() => {
                                handleAddFeedback(msg.id, key);
                                handleCloseMenu(msg.id);
                              }}>
                                <span style={{ fontSize: 22 }}>{emoji}</span>
                                <Typography variant="body2" sx={{ ml: 1 }}>{key}</Typography>
                              </MenuItem>
                            ))}
                        </Menu>
                      </Box>


                    </Box>
                  </Card>
                </ListItem>
              );
            })}
        </List>
        {/* טופס הוספת הודעה בתחתית */}
        <Box sx={{ mt: 2, width: '100%' }}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={6}
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="כתוב הודעה חדשה..."
            sx={{ bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 2 }}
          />
          <Button variant="contained" color="error" sx={{ mt: 1, float: 'left' }} onClick={handleAddMessage} disabled={adding || !newMsg.trim()}>
            שלח
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


// פונקציה לצבע רקע לפי אות
const getColorByChar = (name?: string): string => {
  if (!name) return '#bdbdbd';
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#009688', '#4caf50', '#ff9800', '#795548', '#607d8b'];
  const char = name.trim().charAt(0).toUpperCase();
  const code = char.charCodeAt(0);
  return colors[code % colors.length];
};

export default TopicMessagesList;
