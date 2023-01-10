import { useState } from "react";
// import "./NewRecipe.module.css";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './NewRecipeScreen.css';

const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const addIngredient = () => {
    setIngredients([...ingredients, { name, quantity }]);
    setName("");
    setQuantity("");
  };

  const initialValues = {
    type: "",
    recipeName: "",
    imageURL: "",
    prepTime: "",
    cookTime: "",
    serves: "",
    ingredients: [],
    instructions: "",
  };

  const onSubmit = (values) => {
    values.ingredients = ingredients;

    axios
      .post("https://recipes.devmountain.com/recipes", values)
      .then((res) => {
        console.log(res.data);
        navigate(`/recipe/${res.data[0][0].recipe_id}`);
      })
      .catch((err) => console.log(err));
  };

  const ingredientsDisplay = ingredients.map((ing) => {
    return (
      <li>
        {ing.quantity} {ing.name}
      </li>
    );
  });

  return (
    <section id="add-form-container">
      <h1>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="name-img-container">
                <input
                  placeholder="Name"
                  value={values.recipeName}
                  onChange={handleChange}
                  name="recipeName"
                />

                <input
                  placeholder="Image URL"
                  value={values.imageURL}
                  onChange={handleChange}
                  name="imageURL"
                />
              </div>

              <div id="radio-container">
                <span>
                  <input
                    type="radio"
                    value="Cook"
                    onChange={handleChange}
                    name="type"
                  />
                  <label>Cook</label>
                </span>
                <span>
                  <input
                    type="radio"
                    value="Bake"
                    onChange={handleChange}
                    name="type"
                  />
                  <label>Bake</label>
                </span>
                <span>
                  <input
                    type="radio"
                    value="Drink"
                    onChange={handleChange}
                    name="type"
                  />
                  <label>Drink</label>
                </span>
              </div>

              <div className="time-serves-container">
                <input
                  placeholder="Prep Time"
                  value={values.prepTime}
                  onChange={handleChange}
                  name="prepTime"
                />
                <input
                  placeholder="Cook Time"
                  value={values.cookTime}
                  onChange={handleChange}
                  name="cookTime"
                />
                <input
                  placeholder="Serves"
                  value={values.serves}
                  onChange={handleChange}
                  name="serves"
                />
              </div>

              <div id="ingredients-container">
                <div id="ingredients-inputs-container">
                <input
                  placeholder="Ingredient"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                </div>
                

                <ul className="ingredientsList">{ingredientsDisplay}</ul>
              </div>
                <button className="addButton" type="button" onClick={() => addIngredient()}>
                  Add Another
                </button>
              <textarea
                className="textArea"
                placeholder="Type your instructions"
                value={values.instructions}
                onChange={handleChange}
                name="instructions"
              ></textarea>

              <button className="submitButton" type="Submit">Save</button>
            </form>
          );
        }}
      </Formik>
    </section>
  );
};

export default NewRecipeScreen;
