import Navbar from "./components/Navbar";
import "./pet.css";
import { useState } from "react";
import Icons from "./static/Icons";
import useScore from "./hooks/useScore";
import Net from "./utils/Net";

// Интерфейс для аксессуаров
interface Accessory {
  id: number;
  img: string;
  price: number;
  name: string;
}

export default function Pet() {
  const [isJumping, setIsJumping] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);

  const [score, setScore] = useScore("pet");

  console.log('pet', JSON.parse(Net.get('pet-accessories', "[]")));
  const [ownedAccessories, setOwnedAccessories] = useState<Accessory[]>(JSON.parse(Net.get('pet-accessories', "[]")));

  const itemsPositions:any = {
    1: {
        x: 70, y: 41,
    },
    2: {
        x: 50, y: 10,
    },
  };
  const defItems = [
    { id: 1, img: "mgm/magaz1.png", price: 100, name: "Шляпа"},
    { id: 2, img: "mgm/magaz2.png", price: 150, name: "Очки" },
  ];
  const [shopItems, setShopItems] = useState<Accessory[]>(JSON.parse(Net.get('shop-accessories', JSON.stringify(defItems))));

  const [equippedAccessories, setEquippedAccessories] = useState<Accessory[]>(JSON.parse(Net.get('equipped-pet-accessories', "[]")));

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
    setShowShop((prev) => {
      if (!prev) setShowAccessories(false);
      return !prev;
    });
  };

  const openAccessories = () => {
    setShowAccessories(true);
    setShowShop(false);
  };

  const handleBuy = (itemId: number) => {
    const item = shopItems.find((el) => el.id === itemId);
    if (!item || score < item.price) return;

    setScore(score - item.price);
    setOwnedAccessories(ownedAccessories => {
        const n = [...ownedAccessories, item];
        Net.set('pet-accessories', JSON.stringify(n));
        console.log(Net.get('pet-accessories', "none"));
        return n;
    });
    setShopItems(shopItems => {
        const n = shopItems.filter((el) => el.id !== itemId);
        Net.set('shop-accessories', JSON.stringify(n));
        return n;
    });
  };

  const toggleEquip = (acc: Accessory) => {
    const isEquipped = equippedAccessories.some((a) => a.id === acc.id);
    if (isEquipped) {
      setEquippedAccessories(equippedAccessories => {
        const n = equippedAccessories.filter((a) => a.id !== acc.id);
        Net.set('equipped-pet-accessories', JSON.stringify(n));
        return n;
      });
    } else {
      setEquippedAccessories(equippedAccessories => {
        const n = [...equippedAccessories, acc];
        Net.set('equipped-pet-accessories', JSON.stringify(n));
        return n;
      });
    }
  };

  const petImageSrc = isEating
    ? "mgm/peteat.png"
    : isLoved
    ? "mgm/petinlove.png"
    : "mgm/pet.png";

  return (
    <div className="body pet">
      <Navbar />
      <div className="page-box pet" style={{ position: "relative" }}>
        <div className={`pet-img ${isJumping ? "jump" : ""} ${isEating ? "eat" : ""}`}>
            <img
                className="pet-img"
                src={petImageSrc}
                alt="питомец"
                onClick={handlePetClick}
                style={{ position: "relative", zIndex: 1 }}
            />
            {/* Отрисовка надетых аксессуаров */}
            {/* <div className="pet-accessories" style={{ position: "absolute", top: 180, left: "50%", zIndex: 2 }}> */}
            {equippedAccessories.map((acc) => (
                <img
                    key={acc.id}
                    src={acc.img}
                    alt={acc.name}
                    className="equipped-accessory"
                    style={{ position: "absolute", width: 100, pointerEvents: "none",
                        left: `${itemsPositions[acc.id].x}%`,
                        top: `${itemsPositions[acc.id].y}%`,
                    }}
                />
            ))}
        {/* </div> */}
        </div>


        <div className="btn-container">
          <button className="action-btn" onClick={handleFeedClick}>
            Покормить
          </button>
          <button className="action-btn" onClick={toggleShop}>
            Магазин
          </button>
        </div>

        <div className="accessory-button-container" style={{ marginTop: "30px" }}>
          <button className="action-btn accessory-btn" onClick={openAccessories}>
            Аксессуары
          </button>
        </div>

        {showShop && (
          <div className="shop-popup">
            <div className="shop-header">
              <h2>Магазин</h2>
              <button className="close-btn" onClick={toggleShop}>
                ✖
              </button>
            </div>
            <p className="shop-desc">
              Здесь можно будет купить аксессуары и игрушки для питомца!
            </p>

            <div className="shop-items">
              {shopItems.map((item) => (
                <div className="shop-item" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <div className="price">
                    {item.price} {Icons.score}
                  </div>
                  <button className="buy-btn" onClick={() => handleBuy(item.id)}>
                    Купить
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAccessories && (
          <div className="accessories-popup">
            <div className="popup-header">
              <h3>Аксессуары</h3>
              <button className="close-btn" onClick={() => setShowAccessories(false)}>
                ✖
              </button>
            </div>

            {ownedAccessories.length === 0 ? (
              <p>У тебя пока нет аксессуаров 🐾</p>
            ) : (
              <>
                <div className="accessory-list" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {ownedAccessories.map((acc, index) => (
                    <div
                      key={index}
                      className="accessory-item"
                      style={{ cursor: "pointer", border: equippedAccessories.some(a => a.id === acc.id) ? "2px solid green" : "2px solid transparent", padding: "5px", borderRadius: "5px" }}
                      onClick={() => toggleEquip(acc)}
                      title={acc.name}
                    >
                      <img src={acc.img} alt={acc.name} width={60} />
                      <span>{acc.name}</span>
                    </div>
                  ))}
                </div>
                <button className="action-btn remove-btn" style={{ marginTop: "15px" }} onClick={() => setEquippedAccessories([])}>
                  Снять все аксессуары
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
