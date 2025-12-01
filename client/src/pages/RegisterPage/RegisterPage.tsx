import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './AuthPages.scss';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('הסיסמאות לא תואמות');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch {
      setError('שגיאה בהרשמה');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__side">
        <div className="auth-page__brand">
          <span className="auth-page__logo">🌙</span>
          <h1 className="auth-page__title">Dream Journal</h1>
          <p className="auth-page__tagline">
            שמור את החלומות שלך.
            <br />
            גלה את עצמך.
          </p>
        </div>
        <div className="auth-page__stars">
          <span className="star star--1">✨</span>
          <span className="star star--2">⭐</span>
          <span className="star star--3">✨</span>
        </div>
      </div>

      <div className="auth-page__form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-form__title">הרשמה</h2>

          {error && <div className="auth-form__error">{error}</div>}

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="name">
              שם
            </label>
            <input
              className="auth-form__input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="השם שלך"
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="email">
              אימייל
            </label>
            <input
              className="auth-form__input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="password">
              סיסמה
            </label>
            <input
              className="auth-form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="לפחות 6 תווים"
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label" htmlFor="confirmPassword">
              אימות סיסמה
            </label>
            <input
              className="auth-form__input"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="הכנס שוב את הסיסמה"
              required
            />
          </div>

          <button
            className="auth-form__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'נרשם...' : 'הירשם'}
          </button>

          <p className="auth-form__link">
            כבר יש לך חשבון?{' '}
            <Link to="/login">התחבר כאן</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
