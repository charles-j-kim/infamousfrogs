import React from 'react';

const RecipeItem = (props) => (
  <div className="col-md-3">
    title: {props.recipe.title}<br/>
    <img className="img-rounded materialboxed" src ={props.recipe.image} width="260"/><br/>
    used IngredientCount: {props.recipe.usedIngredientCount}<br/>
    missed IngredientCount: {props.recipe.missedIngredientCount}<br/>
    likes: {props.recipe.likes}
  </div>
);

export default RecipeItem;