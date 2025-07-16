import api from './api';
import { FeedbackType } from '../types/feedback.types';
import { MessageType } from '../types/message.types';


export const getFeedbacks = async (): Promise<FeedbackType[]> => {
  const token = sessionStorage.getItem('token');
  const res = await api.get('/feedback', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getFeedbackById = async (id: number): Promise<FeedbackType> => {
  const token = sessionStorage.getItem('token');
  const res = await api.get(`/feedback/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// הוספת פידבק חדש להודעה
export const addFeedback = async (messageId: number, type: string, userId?: number): Promise<FeedbackType> => {
  const token = sessionStorage.getItem('token');
  const formData = new FormData();
  formData.append('Id', '0'); // מזהה ריק (int, חובה לשלוח מספר כלשהו)
  formData.append('MessageId', messageId.toString());
  formData.append('Type', type);
  if (userId) formData.append('UserId', userId.toString());

  const res = await api.post('Feedback', formData, {
    headers: {
      'accept': 'text/plain',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
      // אל תגדיר Content-Type כאן!
    },
  });
  return res.data;
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
