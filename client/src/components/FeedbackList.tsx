import React from 'react';
import { Box, Typography, List, ListItem, Tooltip, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { FeedbackType } from '../types/feedback.types';
import { FeedbackImougeType } from '../types/enums/feedbackImugeEnum.types';


interface FeedbackListProps {
  feedbacks: FeedbackType[];
  userId?: number;
  onFeedbackClick?: (type: string) => void;
}


const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks, userId, onFeedbackClick }) => {
  // קיבוץ פידבקים לפי סוג ומשתמשים
  const groupFeedbacks = (feedbacks: FeedbackType[] = []) => {
    const map: { [key: string]: { type: string, count: number, userIds: number[] } } = {};
    feedbacks.forEach(fb => {
      if (!map[fb.type]) map[fb.type] = { type: fb.type, count: 0, userIds: [] };
      map[fb.type].count++;
      if (fb.userId) map[fb.type].userIds.push(fb.userId);
    });
    return map;
  };

  const grouped = groupFeedbacks(feedbacks);
  const allTypes = Object.keys(FeedbackImougeType);
  // אילו סוגים המשתמש כבר בחר
  const usedTypes = Object.keys(grouped).filter(type => grouped[type].userIds.includes(userId ?? -1));

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>פידבקים להודעה:</Typography>
      <List sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {/* הצגת כל סוגי הפידבקים (כולל לייק/דיסלייק/אימוג'ים) עם כמות */}
        {allTypes.map(type => (
          <ListItem key={type} sx={{ width: 'auto', p: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <span style={{ fontSize: 22 }}>
                {FeedbackImougeType[type as keyof typeof FeedbackImougeType]}
              </span>
              {grouped[type]?.count > 0 && (
                <Typography variant="caption" sx={{ ml: 0.5 }}>{grouped[type].count}</Typography>
              )}
              {/* כפתור הוספה אם המשתמש לא בחר */}
              {userId && !usedTypes.includes(type) && onFeedbackClick && (
                <Tooltip title={`הוסף פידבק: ${type}`}>
                  <IconButton size="small" onClick={() => onFeedbackClick(type)} sx={{ ml: 0.5 }}>
                    {type === 'Like' ? <ThumbUpIcon color="success" /> : type === 'Dislike' ? <ThumbDownIcon color="error" /> : <AddReactionIcon color="primary" />}
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FeedbackList;
