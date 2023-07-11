import React, { useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';

function Ingredient({ addIngredientToRecipe, deleteIngredient, ing }) {
  const [amount, setAmount] = useState(null);
  const [scale, setScale] = useState(null);
  return (
    <Row className="d-flex justify-content-between align-items-center border my-1">
      <Col md="4">{ing.name}</Col>
      <Col md="4" className="d-flex flex-row my-2">
        <Input
          placeholder="Količina"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <Input
          placeholder="Jedinica"
          value={scale}
          onChange={(e) => {
            setScale(e.target.value);
          }}
        />
      </Col>
      <Col md="4">
        <Button
          onClick={() => addIngredientToRecipe(ing.id, amount, scale)}
          className="m-2"
        >
          Dodaj u recept
        </Button>
        <Button onClick={() => deleteIngredient(ing.id)}>
          Obriši sastojak
        </Button>
      </Col>
    </Row>
  );
}

export default Ingredient;
