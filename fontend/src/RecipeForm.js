import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Input, Row } from 'reactstrap';
import Ingredient from './Ingredient';
import AddIngredinet from './AddIngredinet';

function RecipeForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [allIngredients, setAllIngerients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [newRecipeName, setNewRecipeName] = useState();

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/recipe/${state}`);
      setRecipe(res.data);
      setNewRecipeName(res.data.name);
      return;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchAllIngredients = async () => {
    try {
      const res = await axios.get('http://localhost:3001/ingredient');
      setAllIngerients(res.data);
      return;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteIngredientFromRecipe = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/recipe/${state}/ingredient/${id}`
      );
      window.location.reload();
      return;
    } catch (e) {
      console.log(e);
    }
  };
  const addIngredientToRecipe = async (id, amount, unit) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/recipe/${state}/ingredient`,
        {
          ingredientId: id,
          amount: amount,
          unit: unit,
        }
      );
      window.location.reload();
      return;
    } catch (e) {
      console.log(e);
    }
  };
  const changeNameOfRecipe = async () => {
    try {
      const res = await axios.patch(`http://localhost:3001/recipe/${state}`, {
        name: newRecipeName,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const addNewIngredient = async (name) => {
    try {
      const res = await axios.post('http://localhost:3001/ingredient', {
        name: name,
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteIngredient = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/ingredient/${id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const addNewRecipe = async () => {
    try {
      const res = await axios.post('http://localhost:3001/recipe', {
        name: newRecipeName,
      });
      navigate('/recipeform', { state: res.data.id });
    } catch (e) {
      console.log(e);
    }
  };
  const allRemainingIngredients = allIngredients.filter((el) => {
    return (
      recipe?.RecipeIngredients.length === 0 ||
      !recipe?.RecipeIngredients.some((f) => {
        return f.ingredient.name === el.name;
      })
    );
  });

  const findIdFromAll = (name) => {
    return allIngredients.filter((el) => el.name === name);
  };

  useEffect(() => {
    fetchAllIngredients();
    state && fetchRecipe();
  }, []);

  return (
    <>
      <div className="d-flex flex-column  justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <div>Ime Recepta</div>
          <Row className="d-flex align-items-center mx-2">
            <Col md="6">
              <Input
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                className="my-2"
              />
            </Col>
            <Col md="6">
              <Button
                className="mx-3"
                onClick={() => (state ? changeNameOfRecipe() : addNewRecipe())}
              >
                Spremi
              </Button>
            </Col>
          </Row>
        </div>
        <hr />
        {state && (
          <>
            <div className="mx-5">
              Sastojci za moj recept
              {recipe?.RecipeIngredients.map((ing) => (
                <Row className="d-flex justify-content-between">
                  <Col md="6">
                    {ing.ingredient.name} {ing.amount} {ing.unit}
                  </Col>
                  <Col md="6">
                    <Button
                      onClick={() =>
                        deleteIngredientFromRecipe(
                          findIdFromAll(ing.ingredient.name)[0].id
                        )
                      }
                    >
                      Obriši sa recepta
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>
            <hr />
            <div className="mx-5">
              <div>Ostali Dostupni Sastojci</div>
              {allRemainingIngredients.map((ing) => (
                <Ingredient
                  addIngredientToRecipe={addIngredientToRecipe}
                  deleteIngredient={deleteIngredient}
                  ing={ing}
                />
              ))}
            </div>
            <hr />
            <div className="d-flex flex-column align-items-center my-2">
              <AddIngredinet addIngredient={addNewIngredient} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RecipeForm;
