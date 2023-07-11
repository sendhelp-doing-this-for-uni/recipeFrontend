import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import Recipes from './Recipes';
import MainMessage from './MainMessage';
import RecipeForm from './RecipeForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/recepti" element={<Recipes />} />
        <Route path="recepti/:id" element={<Recipe />} />
        <Route path="/" element={<MainMessage />} />
        <Route path="/recipeform" element={<RecipeForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
