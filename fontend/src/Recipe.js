import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';

function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/recipe/${id}`);
      setRecipe(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteRecipe = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/recipe/${id}`);
      navigate('/recepti');
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchRecipe();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mx-2">
        <div style={{ fontSize: '3.5vw' }}>{recipe?.name}</div>
        <div>
          <Button
            onClick={() => navigate('/recipeform', { state: id })}
            className="mx-2"
          >
            Uredi Recept
          </Button>
          <Button onClick={() => deleteRecipe()}>Obrisi Recept</Button>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-column mx-3 align-items-start">
        <div>Sastojci:</div>
        <div>
          {recipe?.RecipeIngredients.map((ing) => (
            <div key={ing.id}>
              {ing.ingredient.name} {ing.amount} {ing.unit}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recipe;
