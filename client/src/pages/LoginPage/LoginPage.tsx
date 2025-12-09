/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/slices/authSlice";
import "./AuthPages.scss";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error: reduxError } = useAppSelector((state) => state.auth);

  const error = localError || reduxError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/dashboard");
    } catch (err: any) {
      setLocalError(err || "שגיאה בהתחברות");
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
          <h2 className="auth-form__title">התחברות</h2>

          {error && <div className="auth-form__error">{error}</div>}

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
              placeholder="••••••••"
              required
            />
          </div>

          <button
            className="auth-form__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "מתחבר..." : "התחבר"}
          </button>

          <p className="auth-form__link">
            אין לך חשבון? <Link to="/register">הירשם כאן</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;