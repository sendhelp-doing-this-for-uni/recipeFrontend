import React, { useState } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';

function AddIngredinet({ addIngredient }) {
  const [name, setName] = useState();
  return (
    <>
      <div>Dodaj Novi Sastojak</div>
      <Row className="d-flex flex-row  wrap">
        <Col md="4">Ime</Col>
        <Col md="4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col md="4">
          <Button
            onClick={() => {
              addIngredient(name);
            }}
          >
            Dodaj
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default AddIngredinet;
