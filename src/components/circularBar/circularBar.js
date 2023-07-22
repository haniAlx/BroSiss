import React, { useEffect, useRef, useState } from "react";
import "./circularBar.css";
function CircularBar({ max, color, text }) {
  const [progress, setProgress] = useState(0);
  const count = useRef(0);
  useEffect(() => {
    const timeout = setInterval(() => {
      if (count.current >= max) clearInterval(timeout);
      if (count.current < max) count.current++;
      setProgress((c) => c + 1);
    }, 10);

    return () => {
      clearInterval(timeout);
    };
  }, []);
  return (
    <div
      className="circular-bar-container"
      style={{
        backgroundImage: `conic-gradient(#2976f2 ${
          count.current * 3.6
        }deg,#70a7ff 3.6deg)`,
      }}
    >
      <div className="circular-bar">
        <div className="circular-bar-percent">
          <p>{count.current}%</p>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default CircularBar;