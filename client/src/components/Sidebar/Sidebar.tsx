import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.scss';

function Sidebar() {
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'דף הבית' },
    { path: '/dreams', icon: '📝', label: 'כל החלומות' },
    { path: '/favorites', icon: '⭐', label: 'מועדפים' },
    { path: '/stats', icon: '📊', label: 'סטטיסטיקות' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">🌙</span>
        <span className="sidebar__logo-text">Dream Journal</span>
      </div>

      <nav className="sidebar__nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span className="sidebar__link-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__user">
        <div className="sidebar__user-info">
          <span className="sidebar__user-icon">👤</span>
          <span className="sidebar__user-name">{user?.name}</span>
        </div>
        <button className="sidebar__logout" onClick={logout}>
          יציאה
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
