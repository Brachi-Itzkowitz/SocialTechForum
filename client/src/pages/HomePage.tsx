// דף הבית

import { HomeSection } from "../sections/HomeSection";
import ProfileMenu from "../components/ProfileMenu";
import CategoryList from "../components/CategoryList";

import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigateHome = window.location ? (window.location.assign ? (url: string) => window.location.assign(url) : undefined) : undefined;
  const token = sessionStorage.getItem('token');
  const userName = sessionStorage.getItem('userName') || 'משתמש';
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e3f2fd 0%, #fffde7 100%)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px 0 32px' }}>
        {token && <ProfileMenu userName={userName} />}
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ padding: '8px 18px', borderRadius: 20, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigateHome && navigateHome('/Login')}>התחברות</button>
          <button style={{ padding: '8px 18px', borderRadius: 20, background: '#43a047', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigateHome && navigateHome('/Login')}>הרשמה</button>
          <button style={{ padding: '8px 18px', borderRadius: 20, background: 'linear-gradient(90deg,#ff9800,#f44336)', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigateHome && navigateHome('/UserList')}>משתמשים מחוברים</button>
        </div>
      </div>
      <HomeSection />
      <CategoryList />
    </div>
  );
}