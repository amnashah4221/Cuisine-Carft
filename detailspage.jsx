import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loading from "./loading";
import '../App.css'

const DetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals ? data.meals[0] : null))
      .catch((err) => console.error("Error fetching meal:", err));
  }, [id]);

  if (!meal) return (
     <div className="loading-wrapper">
    <Loading />
  </div>
  )

  let ingredients = [];
  for(let i = 1; i <= 20; i++){
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if(ingredient && ingredient.trim()){
        ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="details-pg">
      <div className="head-logo">
        <img src="/logo.png" className="logo" />
      </div>

      <div className="home-bar">
        <button onClick={() => navigate("/main")}>
          <IoArrowBack /> Back to Recipes
        </button>
        <h1>{meal ? meal.strMeal : <Loading/>}</h1>
      </div>
    <div className="display-box">
      <div className="display-box-left">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="img-display"/>
       <div className="features">
        <p><strong>Category: {meal.strCategory }</strong></p>
        <p><strong>Area: { meal.strArea}</strong></p>
       </div>

       {meal.strYoutube && (
        <div className="video-con">
            <h2>Watch Recipe</h2>
            <iframe
            className="video"
            src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
            title="Youtube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            >
            </iframe>
        </div>
       )}
      </div>

    <div className="display-box-right">
        <h2>Ingredients</h2>
        <ul className="ingredient-list"> 
            { ingredients.map((item, index)=>(
                <li key={index}>{item}</li>
            ))}
        </ul>

        <h2>Instructions</h2>
        <p className="instruction">{meal.strInstructions}</p>
    </div>
    </div>
    </div>
  );
};

export default DetailsPage;
