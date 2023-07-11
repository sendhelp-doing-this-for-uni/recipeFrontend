import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, Col, Row } from 'reactstrap';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchAllRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/recipe');
      setRecipes(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <div>
      <div className="heading">
        <div>RECEPTI</div>
        <Button onClick={() => navigate('/recipeform')}>Dodaj recept</Button>
      </div>
      <hr />
      <Row>
        {recipes.map((recipe, i) => {
          return (
            <Col className="my-2">
              <Card
                style={{ width: '200px' }}
                className="mx-3"
                key={recipe.id}
                onClick={() => navigate(`/recepti/${recipe.id}`)}
              >
                <CardHeader style={{ fontSize: '15px' }}>
                  Recept #{i + 1}
                </CardHeader>
                <div>{recipe.name}</div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Recipes;
