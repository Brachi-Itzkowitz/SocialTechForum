
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import LoginRegisterPage from "../pages/LoginRegisterPage";
import NewPostPage from "../pages/NewPostPage";
import ProfilePage from "../pages/ProfilePage";
import TopicPage from "../pages/TopicPage";
import CategoryPage from '../pages/CategoryPage';
import UserListPage from '../pages/UserListPage';

export default function AppRouter() {
  // לוגים מרכזיים לניווט, טוקן, והרשאות
  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log('[AppRouter] token:', token);
    if (!token) {
      console.warn('[AppRouter] אין טוקן במערכת - המשתמש לא מחובר');
    }
  }, []);

  // לוג לכל מעבר דף (route change)
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname) {
      console.log(`[AppRouter] מעבר דף: ${location.pathname}`);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="/Login" element={<LoginRegisterPage />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/Categories/:id" element={<CategoryPage key="category-by-id" />} />
      <Route path="/Topic/:id" element={<TopicPage key="topic-by-id" />} />
      <Route path="/UserList" element={<UserListPage />} />
    </Routes>
  );
}