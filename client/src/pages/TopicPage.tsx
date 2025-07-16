// דף עם הודעות בתוך נושא 
import TopicMessagesList from '../components/TopicMessagesList';
import ProfileMenu from '../components/ProfileMenu';

import { useNavigate } from 'react-router-dom';
export default function TopicPage() {
    const navigateHome = window.location ? (window.location.assign ? (url: string) => window.location.assign(url) : undefined) : undefined;
    const token = sessionStorage.getItem('token');
    let userName = 'משתמש';
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        userName = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || decoded.name || 'משתמש';
      } catch {}
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px 0 32px' }}>
                {token && <ProfileMenu userName={userName} />}
                <button style={{ padding: '8px 18px', borderRadius: 20, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigateHome && navigateHome('/')}>חזרה לדף הבית</button>
            </div>
            <TopicMessagesList />
        </div>
    );
}