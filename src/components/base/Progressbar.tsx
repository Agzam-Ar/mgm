import React, { useEffect, useState } from "react";
import Icons from "../../static/Icons";

type ProgressbarProps = {
  min: number;
  max: number;
  value: number;
};

export default function Progressbar({ min, max, value }: ProgressbarProps) {
  const range = max - min > 0 ? max - min : 1;
  const percent = Math.min(Math.max(((value - min) / range) * 100, 0), 100);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= percent) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= percent) {
          clearInterval(interval);
          return percent;
        }
        return Math.min(prev + 5, percent);
      });
    }, 20);
    return () => clearInterval(interval);
  }, [percent, progress]);

  const step = 1000;
  const stepsCount = max > 1000 ? Math.floor((max - min) / step) : 0;
  const checkpoints = Array.from({ length: stepsCount }).map((_, i) => min + (i + 1) * step);

  return (
    <div className="progress-bar-box" style={{ width: "100%", padding: "20px" }}>
      {/* Центрированный процент прогресса */}
      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "8px",
          color: "#222",
        }}
      >
        {`${Math.round(progress)}%`}
      </div>

      {/* Прогресс-бар с чекпоинтами */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "24px",
          backgroundColor: "#e0e0e0",
          borderRadius: "12px",
          overflow: "visible",
          userSelect: "none",
        }}
      >
        {/* Заполненная часть прогресс-бара */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, var(--color-main) 0%, rgb(81, 238, 255) 50%, #60a5fa 100%)",
            clipPath: `inset(0 ${100 - progress}% 0 0)`,
            transition: "clip-path 0.3s ease-in-out",
            borderRadius: "12px 0 0 12px",
            zIndex: 1,
          }}
        />

        {/* Чекпоинты внутри прогресс-бара */}
{stepsCount > 0 &&
  checkpoints.map((tickValue, i) => {
    const leftPercent = ((tickValue - min) / range) * 100;
    const reached = value >= tickValue;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: "50%",
          left: `${leftPercent}%`,
          transform: "translate(-50%, -50%)",
          width: "36px", // ⬆ больше кружок
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#fff", // непрозрачный фон
          border: "3px solid #3b82f6", // яркая синяя рамка
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 700,
          color: reached ? "#3b82f6" : "#fff",
          zIndex: 5, // ⬆ поверх всего
          boxSizing: "border-box",
          pointerEvents: "none", // чтобы не мешали кликам
        }}
      >
        {reached ? Icons.score : ""}
      </div>
    );
  })}
      </div>
    </div>
  );
}
