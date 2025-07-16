// דף הוספת פוסט חדש

import ProfileMenu from '../components/ProfileMenu';

import { useNavigate } from 'react-router-dom';
export default function NewPostPage(){
    const navigateHome = window.location ? (window.location.assign ? (url: string) => window.location.assign(url) : undefined) : undefined;
    const token = sessionStorage.getItem('token');
    const userName = sessionStorage.getItem('userName') || 'משתמש';
    return(
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px 0 32px' }}>
                {token && <ProfileMenu userName={userName} />}
                <button style={{ padding: '8px 18px', borderRadius: 20, background: '#1976d2', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 16 }} onClick={() => navigateHome && navigateHome('/')}>חזרה לדף הבית</button>
            </div>
            <div>page for add a new post</div>
        </div>
    )
}