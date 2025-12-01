import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { dreamsAPI } from '../../services/api';
import { Dream, ApiResponse } from '../../types';
import DreamCard from '../../components/DreamCard/DreamCard';
import './DashboardPage.scss';

function DashboardPage() {
  const { user } = useAuth();
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dreams on mount
  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const response = await dreamsAPI.getAll() as ApiResponse<Dream[]>;
        if (response.success && response.data) {
          setDreams(response.data);
        }
      } catch {
        setError('שגיאה בטעינת החלומות');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDreams();
  }, []);

  // Calculate stats
  const totalDreams = dreams.length;
  const lucidDreams = dreams.filter((d) => d.isLucid).length;
  const favoriteDreams = dreams.filter((d) => d.isFavorite).length;

  // Get most common mood
  const getMostCommonMood = () => {
    if (dreams.length === 0) return '😐';
    
    const moodCounts: Record<string, number> = {};
    dreams.forEach((d) => {
      moodCounts[d.mood] = (moodCounts[d.mood] || 0) + 1;
    });
    
    const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    
    const moodEmojis: Record<string, string> = {
      happy: '😊',
      sad: '😢',
      scared: '😱',
      confused: '😕',
      excited: '🤩',
      neutral: '😐',
    };
    
    return moodEmojis[mostCommon?.[0]] || '😐';
  };

  // Get recent dreams (last 5)
  const recentDreams = dreams.slice(0, 5);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__greeting">שלום, {user?.name}! 👋</h1>
        <Link to="/dreams/new" className="dashboard__add-btn">
          + חלום חדש
        </Link>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard__stats">
        <div className="stat-card">
          <span className="stat-card__number stat-card__number--primary">
            {totalDreams}
          </span>
          <span className="stat-card__label">סה״כ חלומות</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__number stat-card__number--success">
            {lucidDreams}
          </span>
          <span className="stat-card__label">חלומות צלולים</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__number stat-card__number--warning">
            {favoriteDreams}
          </span>
          <span className="stat-card__label">מועדפים</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__number">{getMostCommonMood()}</span>
          <span className="stat-card__label">מצב רוח נפוץ</span>
        </div>
      </div>

      <section className="dashboard__recent">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">חלומות אחרונים</h2>
          <Link to="/dreams" className="dashboard__view-all">
            הצג הכל ←
          </Link>
        </div>

        {recentDreams.length === 0 ? (
          <div className="dashboard__empty">
            <p>עדיין אין לך חלומות 🌙</p>
            <Link to="/dreams/new">הוסף את החלום הראשון שלך!</Link>
          </div>
        ) : (
          <div className="dashboard__dreams-list">
            {recentDreams.map((dream) => (
              <DreamCard key={dream._id} dream={dream} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
