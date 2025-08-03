import React, { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import MealCard from "./mealcard";
const Mainpage = () => {
    const navigate = useNavigate();
    const [query, setquery] = useState("");
    const [meal, setmeal] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allArea, setAllAreas] = useState([]);
    const [Favorites, setFavorites] = useState([]);
    useEffect(()=>{
        const fetchAllMeals = async () => {
            try {
                const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
                const data = await res.json();
                setmeal(data.meals || []);
                console.log("Fetched Meals:", data.meals);
            } catch (err) {
                console.error("Error fetching all meals:", err);
            }
        };
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then(res=>res.json())
        .then(data=>{
            if(data.meals){
                setAllCategories(data.meals.map(m=>m.strCategory));
            }
    });

    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        .then(res=>res.json())
        .then(data=>{
            if(data.meals){
                setAllAreas(data.meals.map(m=>m.strArea));
            }
    });
    fetchAllMeals();

    }    
    ,[]
    )
    const handlesearch = async() =>{
        if(!query){
            return; 
        }
        try{
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            console.log("Fetched Meals:", data);
            setmeal(data.meals || []);
        }
        catch(error){
            alert("Error fetching meals");
            console.error(error);
        }
    }
    const removefilter = async()=>{
        setquery("");
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const data = await res.json();
        setmeal(data.meals || []);
        document.querySelectorAll("select").forEach(sel => sel.selectedIndex = 0);

    }
    const filterbycategory = async (category) =>{
        if(!category) return;
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await res.json();

        if(data.meals){
            const detailedmeals = await Promise.all(
                data.meals.map(async(meal)=>{
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                    const detail = await res.json();
                    return detail.meals[0];
                })
            )
            
        setmeal(detailedmeals);
        };

    }

    const filterbyarea = async (area) =>{
        if(!area) return;
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const data = await res.json();

        if(data.meals){
            const detailedmeals = await Promise.all(
                data.meals.map(async (meal) => {
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                    const detail = await res.json();
                    return detail.meals[0];
                })
            );
            setmeal(detailedmeals);
        }
    }
    useEffect(()=>{
        const storedfavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedfavorites);
    },[])
    const toggleFavorite = (meal) =>{
        const isfavorite = Favorites.some(fav => fav.idMeal === meal.idMeal);
        let updatedFavorites;
        if(isfavorite){
            updatedFavorites = Favorites.filter(fav => fav.idMeal !== meal.idMeal);
        }
        else{
            updatedFavorites = [...Favorites, meal];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }


    return(
        <div className="main-page">
            <div className="head-logo">
                <img  src="/logo.png" className="logo"/>
            </div>

            <div className="home-bar">
                <button onClick={()=>navigate('/')}><IoArrowBack /> Back to Home</button>
                <h1>Search Recipe</h1>
            </div>

            <div className="search-bar">
                <div className="search">
                    <CiSearch/>
                    <input placeholder="Search for recipes ..." className="search-recipe" value={query} onChange={(e)=> setquery(e.target.value)}/>
                </div>
                    <button className="search-button" onClick={handlesearch}>Search</button>
            </div>

            <div className="filters">
                <select onChange={ (e) => filterbycategory(e.target.value)}>
                    <option value="">Filter By Category</option>
                    {allCategories.map((cat)=>(<option value={cat} key={cat}>{cat}</option>))}
                </select>

                <select onChange={(e)=>filterbyarea(e.target.value)}>
                     <option value="">Filter by Area</option>
                     {allArea.map((area)=>(<option value={area} key={area}>{area}</option>))}
                </select>

                <button className="remove-filter" onClick={removefilter}>Remove Filters</button>

            </div>

        
            <div className="results-section">
                {meal.length > 0 ? (
        meal.map((item) => (
            <MealCard key={item.idMeal} card = {item} toggleFavorite = {toggleFavorite} isFavorite={Favorites.some(fav=>fav.idMeal === item.idMeal)}/>
        ))): (
            <p className="sorry-msg">Sorry! No meals found. Try another search!</p>
       )}
    </div>
        </div>
)}
export default Mainpage;