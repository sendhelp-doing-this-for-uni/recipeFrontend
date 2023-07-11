import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function MainMessage() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div style={{ fontSize: '50px' }}>
        Dobro došli na stranicu s receptima!
      </div>
      <Button onClick={() => navigate('/recepti')} className="my-3">
        Pogledajte recepte
      </Button>
      <Button onClick={() => navigate('/recipeform')}>
        Dodajte novi recept
      </Button>
    </div>
  );
}

export default MainMessage;
