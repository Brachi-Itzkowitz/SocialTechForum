import api from './api';
import { MessageType } from '../types/message.types';

// פונקציה לקבלת הודעות לפי מזהה נושא
export const getMessagesByTopic = async (topicId: number | undefined): Promise<MessageType[]> => {
  if (typeof topicId !== 'number' || isNaN(topicId)) {
    // לא לקרוא לשרת אם אין topicId תקין
    return [];
  }
  const token = sessionStorage.getItem('token');
  const res = await api.get('/Message', {
    headers: { Authorization: `Bearer ${token}` },
  });
  // סינון בצד לקוח לפי topicId
  return res.data.filter((msg: any) => msg.topicId === topicId);
};



export const addMessage = async (topicId: number, content: string): Promise<MessageType> => {
  const token = sessionStorage.getItem('token');
  const formData = new FormData();
  formData.append('Id', '0'); // int, חובה לשלוח מספר כלשהו
  formData.append('Content', content);
  formData.append('TopicId', topicId.toString());

  const res = await api.post('Message', formData, {
    headers: {
      'accept': 'text/plain',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
      // אל תגדיר Content-Type כאן!
    },
  });
  return res.data;
};