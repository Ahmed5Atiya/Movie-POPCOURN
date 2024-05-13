import { useState } from "react";

const StarsStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};
const StarStyle = {
  display: "flex",
  gap: "5px",
};
const P = {
  lineHeight: "1",
  margin: "0",
  fontSize: `18px`,
  color: "yellow",
};
const single = {
  cursor: "pointer",
  fontSize: `18px`,
  color: "yellow",
};
export default function Stars() {
  const [Rate, setRate] = useState(6);
  const [hover, sethover] = useState(0);

  function handelRate(i) {
    setRate(i);
  }
  return (
    <div style={StarsStyle}>
      <div style={StarStyle}>
        {Array.from({ length: 10 }, (_, i) => (
          <Star
            key={i}
            Full={hover >= i + 1 || Rate >= i + 1}
            Rate={Rate}
            onRate={() => handelRate(i + 1)}
            signal={single}
            onHoverIn={() => sethover(i + 1)}
            onHoverOut={() => sethover(0)}
          />
        ))}
      </div>
      <p style={P}>{hover || Rate}</p>
    </div>
  );
}

function Star({ Full, signal, onRate, onHoverIn, onHoverOut }) {
  return (
    <>
      <span
        style={signal}
        onClick={onRate}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
      >
        {Full ? (
          <i class="fa-solid fa-star"></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}
      </span>
    </>
  );
}
