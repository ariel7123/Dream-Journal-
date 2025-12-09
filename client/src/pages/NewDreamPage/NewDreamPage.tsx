import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { createDream } from '../../redux/slices/dreamsSlice';
import './NewDreamPage.scss';

function NewDreamPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const [isLucid, setIsLucid] = useState(false);
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('כותרת ותוכן הם שדות חובה');
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(createDream({
        title: title.trim(),
        content: content.trim(),
        mood,
        isLucid,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
      })).unwrap();
      navigate('/dashboard');
    } catch {
      setError('שגיאה בשמירת החלום');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-dream">
      <div className="new-dream__container">
        <h1 className="new-dream__title">חלום חדש 🌙</h1>

        <form className="dream-form" onSubmit={handleSubmit}>
          {error && <div className="dream-form__error">{error}</div>}

          <div className="dream-form__field">
            <label className="dream-form__label" htmlFor="title">
              כותרת *
            </label>
            <input
              className="dream-form__input"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="תן שם לחלום שלך"
              required
            />
          </div>

          <div className="dream-form__field">
            <label className="dream-form__label" htmlFor="content">
              תוכן החלום *
            </label>
            <textarea
              className="dream-form__textarea"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ספר על החלום שלך..."
              rows={10}
              required
            />
          </div>

          <div className="dream-form__field">
            <label className="dream-form__label" htmlFor="mood">
              מצב רוח
            </label>
            <select
              className="dream-form__select"
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="happy">😊 שמח</option>
              <option value="sad">😢 עצוב</option>
              <option value="scared">😱 מפחד</option>
              <option value="confused">😕 מבולבל</option>
              <option value="excited">🤩 נרגש</option>
              <option value="neutral">😐 ניטרלי</option>
            </select>
          </div>

          <div className="dream-form__field">
            <label className="dream-form__label" htmlFor="tags">
              תגיות (מופרדות בפסיק)
            </label>
            <input
              className="dream-form__input"
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="למשל: טיסה, משפחה, עבודה"
            />
          </div>

          <div className="dream-form__checkbox">
            <input
              type="checkbox"
              id="isLucid"
              checked={isLucid}
              onChange={(e) => setIsLucid(e.target.checked)}
            />
            <label htmlFor="isLucid">חלום צלול (lucid dream)</label>
          </div>

          <div className="dream-form__actions">
            <button
              type="button"
              className="dream-form__button dream-form__button--secondary"
              onClick={() => navigate('/dashboard')}
            >
              ביטול
            </button>
            <button
              type="submit"
              className="dream-form__button"
              disabled={isLoading}
            >
              {isLoading ? 'שומר...' : 'שמור חלום'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDreamPage;