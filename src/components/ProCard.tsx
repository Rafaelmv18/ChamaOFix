import { useNavigate } from "react-router-dom";

interface ProCardProps {
  id: string | number;
  name: string;
  spec: string;
  price: string;
  rating: number;
  reviews: number;
  distance: string;
  icon: string;
  bgGradient: string;
  isOnline?: boolean;
  orientation?: "horizontal" | "vertical";
}

export default function ProCard({
  id,
  name,
  spec,
  price,
  rating,
  reviews,
  distance,
  icon,
  bgGradient,
  isOnline = false,
  orientation = "horizontal",
}: ProCardProps) {
  const navigate = useNavigate();

  if (orientation === "horizontal") {
    return (
      <div className="pro-card-h" onClick={() => navigate(`/app/profile/${id}`)}>
        <div className="pro-card-img" style={{ background: bgGradient }}>
          {icon}
          {isOnline && <div className="pro-badge">Online</div>}
        </div>
        <div className="pro-card-body">
          <div className="pro-name">{name}</div>
          <div className="pro-spec">
            {spec} • {distance}
          </div>
          <div className="pro-meta">
            <div className="pro-rating">
              ★ {rating}{" "}
              <span style={{ color: "var(--tx3)" }}>({reviews})</span>
            </div>
            <div className="pro-price">
              a partir de <strong>R${price}/h</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pro-card-v" onClick={() => navigate(`/app/profile/${id}`)}>
      <div className="pro-avatar" style={{ background: bgGradient }}>
        {icon}
        {isOnline && <div className="online-dot"></div>}
      </div>
      <div className="pro-info">
        <div className="pro-info-top">
          <div className="pro-info-name">{name}</div>
          <div className="pro-info-price">
            <strong>R${price}</strong>/h
          </div>
        </div>
        <div className="pro-info-spec">{spec}</div>
        <div className="pro-info-meta">
          {isOnline ? (
            <span className="tag green">● Online</span>
          ) : (
            <span className="tag">● Offline</span>
          )}
          <span className="tag">
            ★ {rating} ({reviews})
          </span>
          <span className="tag">{distance}</span>
        </div>
      </div>
    </div>
  );
}
