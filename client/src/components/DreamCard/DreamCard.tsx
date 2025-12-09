import { Link } from "react-router-dom";
import { Dream } from "../../types";
import "./DreamCard.scss";

interface DreamCardProps {
  dream: Dream;
}

function DreamCard({ dream }: DreamCardProps) {
  // Format date to Hebrew
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Mood emoji mapping
  const moodEmojis: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    scared: "😱",
    confused: "😕",
    excited: "🤩",
    neutral: "😐",
  };

  // Truncate content
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <Link to={`/dreams/${dream._id}`} className="dream-card">
      <div className="dream-card__content">
        <h3 className="dream-card__title">{dream.title}</h3>
        <p className="dream-card__text">
          {truncateContent(dream.content || "")}
        </p>
        <span className="dream-card__date">{formatDate(dream.date)}</span>
      </div>

      <div className="dream-card__meta">
        <span className="dream-card__mood">{moodEmojis[dream.mood]}</span>
        {dream.isFavorite && <span className="dream-card__favorite">⭐</span>}
        {dream.isLucid && <span className="dream-card__lucid">💭 צלול</span>}
      </div>
    </Link>
  );
}

export default DreamCard;
