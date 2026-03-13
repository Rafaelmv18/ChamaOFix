import { useNavigate } from "react-router-dom";

interface CategoryPillProps {
  icon: string;
  label: string;
  selected?: boolean;
}

export default function CategoryPill({
  icon,
  label,
  selected = false,
}: CategoryPillProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`cat-pill ${selected ? "selected" : ""}`}
      onClick={() => navigate("/app/search")}
    >
      <div className="cat-pill-icon">{icon}</div>
      <div className="cat-pill-label">{label}</div>
    </div>
  );
}
