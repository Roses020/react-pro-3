import React from "react";
import AdBanner from "./AdBanner";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import "./HomeScreen.css";


const HomeScreen = () => {
  const [Recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  const getRecipes = () => {
    axios.get("https://recipes.devmountain.com/recipes").then((res) => {
      // console.log(res.data);
      setRecipes(res.data);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <AdBanner />
      <div className="recipeSearchDiv">
        <div className="recipe_search">
      <i class="fa fa-search icon"></i>
        <input
          className="searchInput"
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          name="Search for a recipe"
        />
        </div>
      </div>
      <div className="recipeCardContainer">
      {Recipes.filter((recipe) => {
        const moddedRecipeName = recipe.recipe_name.toLowerCase();
        const moddedSearch = search.toLowerCase();
        return moddedRecipeName.includes(moddedSearch);
      }).map((recipe, index) => {
        return <RecipeCard recipe={ recipe } />;
      })}
      </div>
    </div>
  );
};

export default HomeScreen;
