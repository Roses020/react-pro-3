import { React, useEffect, useState } from 'react'
import axios from "axios";
import './DetailScreen.css';
import { useParams } from 'react-router-dom';

const DetailScreen = () => {  
  const [Recipe, setRecipe] = useState({});
  const { id } = useParams()

  const getRecipe = () => {
    axios.get(`https://recipes.devmountain.com/recipes/${id}`).then((res) => {
      console.log(res.data)
      setRecipe(res.data);
    });
  };

  useEffect(() => {
    getRecipe();
  }, {});
  
  const { prep_time, image_url, recipe_name, cook_time, serves, ingredients, type, instructions } = Recipe

  return (
    <div>
       <div
      className="mainBanner"
      style={{
        background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.8)),
          url(${ image_url })`,
        backgroundSize: "cover",
      }}
    >
      <div >
        <h1 className="title">{ recipe_name }</h1>
      </div>
    </div>
    <section className='detailsSection'>
      <div className='recipe_ingredients'>
        <h2>Recipe</h2>
        <ul>
          <li>Prep Time: { prep_time }</li>
          <li>Cook Time: { cook_time }</li>
          <li>Serves: { serves }</li>
          <li>Type: { type }</li>
        </ul>
        <h2>Ingredients</h2>
        <ul>
          {ingredients && ingredients.map((element) => {
            return <li>{element.quantity} {element.ingredient}</li>
          })}
        </ul>
      </div>
      <div className='instructions'>
        <h2>Instructions</h2>
        <p>
          {instructions && JSON.parse(instructions)}
        </p>
      </div>
    </section>
    </div>
  );
};

export default DetailScreen;
