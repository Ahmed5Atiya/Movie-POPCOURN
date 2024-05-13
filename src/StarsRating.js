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

export default function StarRate({
  MaxRating = 10,
  color = "#fcc419",
  size = "48",
}) {
  const [rate, setRate] = useState(0);
  const [temprate, setTempRate] = useState(0);
  function handelRate(i) {
    setRate(i);
  }
  const single = {
    cursor: "pointer",
    fontSize: `${size}px`,
    color,
  };
  const P = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size}px`,
    color,
  };

  return (
    <div style={StarsStyle}>
      <div style={StarStyle}>
        {Array.from({ length: MaxRating }, (_, i) => (
          <Star
            onRate={() => handelRate(i + 1)}
            rate={rate}
            full={temprate >= i + 1 || rate >= i + 1}
            onHoverIn={() => setTempRate(i + 1)}
            onHoverout={() => setTempRate(0)}
            single={single}
          />
        ))}
      </div>
      <p style={P}>{temprate || rate || ""}</p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverout, single }) {
  return (
    <>
      {" "}
      <span
        style={single}
        onClick={onRate}
        full={full}
        role="button"
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverout}
      >
        {full ? (
          <i class="fa-solid fa-star"></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}
      </span>
    </>
  );
}
// fill <i class="fa-solid fa-star"></i>
