import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FcPlanner } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import '../App.css'
const Landing = () => {

        const navigate = useNavigate();
    return(
        <div className="landing">
            <h1>Discover, Cook, and Enjoy Great Food</h1>
            <h2>Find curated recipes, plan meals, 
                and bring inspiration to your kitchen.</h2>

            <div className="land-buttons">
                <button className="srch" onClick={()=> navigate('/main')}><CiSearch /> Start Searching</button>
                <button className="like" onClick={()=>navigate('/favorites')}><CiHeart />My Favorites</button>
            </div>

            <div className="land-cards">
                <div className="land-card">
                    <CiSearch className="land-icon"/>
                    <h2>Smart Search</h2>
                    <p>Find recipes by name, ingredient, 
                       or cuisine with intelligent filtering
                    </p>
                </div>

                <div className="land-card">
                    <CiHeart className="land-icon"/>
                    <h2>Save Favorites</h2>
                    <p>Keep track of recipes 
                       you love and access them anytime</p>
                </div>

                <div className="land-card">
                    <FcPlanner className="land-icon"/>
                    <h2>Meal Planning</h2>
                    <p>Organize your weekly 
                       meals with our simple meal planner</p>
                </div>
            </div>
        </div>
    
)}
export default Landing;