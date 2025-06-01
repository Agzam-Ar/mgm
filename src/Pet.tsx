import Navbar from "./components/Navbar";
import "./pet.css";
import { useState } from "react";
import Icons from "./static/Icons"; // путь поправь, если не совпадает
import useScore from "./hooks/useScore";

export default function Pet() {
	const [isJumping, setIsJumping] = useState(false);
	const [isEating, setIsEating] = useState(false);
	const [showShop, setShowShop] = useState(false);
	const [isLoved, setIsLoved] = useState(false);

	const [score, setScore] = useScore('pet');

	const handlePetClick = () => {
		if (isJumping || isEating) return;
		setIsJumping(true);
		setIsLoved(true);
		setTimeout(() => {
			setIsJumping(false);
			setIsLoved(false);
		}, 600);
	};

	const handleFeedClick = () => {
		if (isEating) return;
		setIsEating(true);
		setTimeout(() => setIsEating(false), 600);
	};

	const toggleShop = () => {
		setShowShop(prev => !prev);
	};

	const petImageSrc = isEating
		? "mgm/peteat.png"
		: isLoved
		? "mgm/petinlove.png"
		: "mgm/pet.png";

	return (
		<div className="body pet">
			<Navbar />
			<div className="page-box pet">
				<img
					className={`pet-img ${isJumping ? "jump" : ""} ${isEating ? "eat" : ""}`}
					src={petImageSrc}
					alt="питомец"
					onClick={handlePetClick}
				/>

				<div className="btn-container">
					<button className="action-btn" onClick={handleFeedClick}>Покормить</button>
					<button className="action-btn" onClick={toggleShop}>Магазин</button>
				</div>

				{showShop && (
					<div className="shop-popup">
						<div className="shop-header">
							<h2>Магазин</h2>
							<button className="close-btn" onClick={toggleShop}>✖</button>
						</div>
						<p className="shop-desc">Здесь можно будет купить аксессуары и игрушки для питомца!</p>

						<div className="shop-items">
						{[
								{ img: "mgm/magaz1.png", price: 100 },
								{ img: "mgm/magaz2.png", price: 100 }
						].map((item, i) => (
								<div className="shop-item" key={i}>
								<img src={item.img} alt={`Товар ${i + 1}`} />
								<div className="price">
										{item.price} {Icons.score}
								</div>
								<button className="buy-btn" onClick={e => {
									if(score >= item.price) {
										setScore(score - item.price);
									}
								}}>Купить</button>
								</div>
						))}
						</div>


					</div>
				)}
			</div>
		</div>
	);
}
