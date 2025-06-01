import React, { useEffect, useState } from "react";
import Icons from "../../static/Icons";
import "./Progressbar.css";

type ProgressbarProps = {
  min?: number;
  max?: number;
  value?: number;
  checkpointsCount?: number;
  checkpointsMessages?: string[];
};

export default function Progressbar({
  min = 0,
  max = 5000,
  value = 5000,
  checkpointsCount = 3,
  checkpointsMessages = [ //это массив с фразами 
    "Покормите ребёнка",
    "Покормите ребёнка ещё раз",
    "Последняя кормёжка!",
  ],
}: ProgressbarProps) {
  const range = max - min > 0 ? max - min : 1;
  const percent = Math.min(Math.max(((value - min) / range) * 100, 0), 100);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

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

  const cpCount = Math.min(Math.max(checkpointsCount, 1), 4);

  const checkpoints = Array.from({ length: cpCount }).map((_, i) => {
    const fraction = (i + 1) / (cpCount + 1);
    return min + fraction * range;
  });

  const handleClick = (i: number, reached: boolean) => {
    if (!reached) return;
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div className="progress-bar-box">
      <div className="progress-text">
        Текущий прогресс: <span className="progress-percent">{Math.round(progress)}%</span>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
        />

        {/* Checkpoints */}
        {checkpoints.map((tickValue, i) => {
          const leftPercent = ((tickValue - min) / range) * 100;
          const reached = value >= tickValue;
          const tooltipText = checkpointsMessages[i] || "";

          return (
            <div
              key={i}
              className={`checkpoint ${reached ? "reached" : ""}`}
              style={{ left: `${leftPercent}%` }}
              onClick={() => handleClick(i, reached)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {reached ? <span className="checkpoint-icon">{Icons.check}</span> : null}
              {activeIndex === i && hoverIndex === i && tooltipText && (
                <div className="tooltip">
                  {tooltipText}
                  <div className="tooltip-arrow" />
                </div>
              )}
            </div>
          );
        })}
        <div
          className={`checkpoint final ${value >= max ? "reached" : ""}`}
          style={{ left: "100%" }}
        >
          {value >= max ? (
            <span className="checkpoint-icon final-checkpoint-icon">{Icons.check}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
