import { useNavigate } from "react-router-dom";

interface CategoryPillProps {
  icon: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function CategoryPill({
  icon,
  label,
  selected = false,
  onClick,
}: CategoryPillProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/app/search?cat=${label}`);
    }
  };

  return (
    <div
      className={`cat-pill ${selected ? "selected" : ""}`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="cat-pill-icon">{icon}</div>
      <div className="cat-pill-label">{label}</div>
    </div>
  );
}
