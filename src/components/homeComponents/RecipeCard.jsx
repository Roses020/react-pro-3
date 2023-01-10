import React from "react";
import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";


function RecipeCard(props) {
  const { recipe_name, image_url, recipe_id } = props.recipe
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe_id}`)
  } 
  
return (
    <div className="recipe_card" >
      <img alt='' src={ image_url }></img>
      <h1 className="card1">{ recipe_name }</h1>
     <button onClick={() => handleClick() } className="btn1">See More</button>
    </div>
  );
}

export default RecipeCard;

