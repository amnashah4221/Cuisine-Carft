import { useNavigate } from "react-router-dom";
import '../App.css';
import { CiHeart } from "react-icons/ci";
import { VscHeartFilled } from "react-icons/vsc";
const MealCard = ({card, toggleFavorite, isFavorite}) =>{
    const navigate = useNavigate();
     return(
    <div key={card.idMeal} className="meal-card">
        <img src={card.strMealThumb} alt ={card.strMeal}/>
        <button onClick={() => toggleFavorite(card)} className="fav-btn">
  {isFavorite ? <VscHeartFilled/>: <CiHeart/> }
</button>
        <h3>{card.strMeal}</h3>
        <div className="card-feat">
        <p>{card.strCategory }</p>
        <p>{ card.strArea}</p>
        </div>
        <button onClick={()=> navigate(`/meal/${card.idMeal}`)} className="details-btn"> View Details</button>
    </div>
)}
export default MealCard;