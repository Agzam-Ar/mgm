import React, { useEffect, useState } from "react";
import Icons from "../../static/Icons";
import Net from "../../utils/Net";
import "./Progressbar.css";

type ProgressbarProps = {
	min?: number;
	max?: number;
	value?: number;
	points?: string[];
	edit?:boolean;
};

export default function Progressbar({min = 0, max = 5000, value = 2000,	points = [], edit=false}: ProgressbarProps) {

	const clampedValue = Math.max(min, Math.min(value, max));
	const val = clampedValue / Math.max(1, (max - min));
	
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [hoverIndex, setHoverIndex] = useState<number | null>(null);

	// useEffect(() => {
	// 	if (progress >= percent) return;
	// 	const interval = setInterval(() => {
	// 		setProgress((prev) => {
	// 			if (prev >= percent) {
	// 				clearInterval(interval);
	// 				return percent;
	// 			}
	// 			return Math.min(prev + 5, percent);
	// 		});
	// 	}, 20);
	// 	return () => clearInterval(interval);
	// }, [percent, progress]);


	const checkpoints = Array.from({ length: points.length }).map((_, i) => {
		return (i+1) / (points.length);
	});

	const handleClick = (i: number, reached: boolean) => {
		if (!reached) return;
		setActiveIndex(activeIndex === i ? null : i);
	};

	return (
		<div className="progress-bar-box">
			<div className="progress-text">
				Текущий прогресс: <span className="progress-percent">{Math.round(val*100)}%</span>
			</div>
			<div className="progress-bar-container">
				<div className="progress-bar-fill" style={{ clipPath: `inset(0 ${100 - val*100}% 0 0)` }}/>
				{checkpoints.map((tickValue, i) => {
					const leftPercent = tickValue;
					const reached = val >= tickValue;
					const tooltipText = points[i] || "";
					return (
						<div key={i} className={`checkpoint ${reached ? "reached" : ""}`} style={{ left: `${leftPercent*100}%` }}
							onMouseEnter={() => setHoverIndex(i)}
							onMouseLeave={() => setHoverIndex(null)}
						>
							<span className={`checkpoint-icon ${reached ? "reached" : ""}`}>{Icons.check}</span>
							<div className={`tooltip ${hoverIndex === i && tooltipText ? 'visible' : ''}`}>
								{edit ? <input value={tooltipText} onChange={e => {
									points[i] = e.target.value;
									Net.sendJson('progressbar-marks', points); 
								}}/> : tooltipText}
								<div className="tooltip-arrow" />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

