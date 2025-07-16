import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import CategoryTopicsList from '../components/CategoryTopicsList';
import ProfileMenu from '../components/ProfileMenu';

const CategoryPage: React.FC = () => {
  const navigateHome = window.location ? (window.location.assign ? (url: string) => window.location.assign(url) : undefined) : undefined;
  const { id } = useParams();
  const token = sessionStorage.getItem('token');
  const userName = sessionStorage.getItem('userName') || 'משתמש';
  // אם יש id בנתיב, מציגים רק את הנושאים של אותה קטגוריה
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px 0 32px' }}>
        {token && <ProfileMenu userName={userName} />}
        <button style={{ padding: '8px 18px', borderRadius: 20, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigateHome && navigateHome('/')}>חזרה לדף הבית</button>
      </div>
      {id ? <CategoryTopicsList /> : <CategoryList />}
    </div>
  );
};

export default CategoryPage;
