import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7147/api', // הכתובת של ה-API
  // אל תגדיר Content-Type ברמת ברירת מחדל! זה שובר שליחת FormData
});

export default api;
