import React, { useState, useEffect } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import MealCard from "./mealcard";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (meal) => {
    const updated = favorites.some(fav => fav.idMeal === meal.idMeal)
      ? favorites.filter(fav => fav.idMeal !== meal.idMeal)
      : [...favorites, meal];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="favorites-pg">
      <div className="head-logo">
        <img src="/logo.png" className="logo" alt="Logo" />
      </div>

      <div className="home-bar">
        <button onClick={() => navigate('/')}><IoArrowBack /> Back to Home</button>
        <h1>My Favorite Recipes</h1>
      </div>

      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="results-section">
          {favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              card={meal}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
