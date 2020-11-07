import "./scss/App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Mando from "./assets/Mando.jpg";
import Mudhorn from "./assets/Mudhorn.jpg";

const App = () => {
  const [mandoHealth, setMandoHealth] = useState(25);
  const [mudhornHealth, setMudhornHealth] = useState(50);

  const attackHandler = () => {
    setMudhornHealth(mudhornHealth - 10);
  };

  const defendHandler = () => {
    setMandoHealth(mandoHealth + 10);
  };

  const flamethrowerHandler = () => {
    setMudhornHealth(mudhornHealth - 20);
  };

  const grappleHandler = () => {
    setMudhornHealth(mudhornHealth - 5);
  };
  return (
    <div className="app">
      <div className="containers">
        <div className="container">
          <h1>The Mandalorian</h1>
          <p>
            Health: <span>{mandoHealth}</span>
          </p>
          <img src={Mando} />
        </div>
        <div className="center-container">
          <h1>VS</h1>
        </div>
        <div className="container">
          <h1>Mudhorn</h1>
          <p>
            Health: <span>{mudhornHealth}</span>
          </p>
          <img className="mudhorn" src={Mudhorn} />
        </div>
      </div>
      <div className="buttons">
        <Button onClick={attackHandler} variant="dark">
          Attack
        </Button>
        <Button onClick={defendHandler} variant="dark">
          Defend
        </Button>
        <Button onClick={flamethrowerHandler} variant="dark">
          Flame Thrower
        </Button>
        <Button onClick={grappleHandler} variant="dark">
          Grapple
        </Button>
      </div>
    </div>
  );
};

export default App;
