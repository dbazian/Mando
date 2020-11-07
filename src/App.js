import "./scss/App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Mando from "./assets/Mando.jpg";
import Mudhorn from "./assets/Mudhorn.jpg";
import ProgressBar from "./components/ProgressBar";

const App = () => {
  const [playerHealthBar, setPlayerHealthBar] = useState(100);
  const [enemyHealthBar, setEnemyHealthBar] = useState(100);

  useEffect(() => {
    if (playerHealthBar <= 0 && enemyHealthBar > 0) {
      alert("You Lost");
      reset();
    } else if (enemyHealthBar <= 0 && playerHealthBar > 0) {
      alert("You Won");
      reset();
    } else if (playerHealthBar <= 0 && enemyHealthBar <= 0) {
      alert("draw:");
      reset();
    }
  }, [playerHealthBar, enemyHealthBar]);

  const reset = () => {
    setPlayerHealthBar(100);
    setEnemyHealthBar(100);
  };

  const attackHandler = () => {
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 11));
    setPlayerHealthBar(playerHealthBar - Math.floor(Math.random() * 11));
  };

  const defendHandler = () => {
    playerHealthBar <= 90
      ? setPlayerHealthBar(playerHealthBar + 6 - Math.floor(Math.random() * 11))
      : setPlayerHealthBar(100 - Math.floor(Math.random() * 5));
  };

  const flamethrowerHandler = () => {
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 21));
    setPlayerHealthBar(playerHealthBar - Math.floor(Math.random() * 11));
  };

  const grappleHandler = () => {};

  return (
    <div className="app">
      <div className="containers">
        <div className="container">
          <h1>The Mandalorian</h1>
          <img src={Mando} alt="The Mandalorian" />
          <ProgressBar percentage={playerHealthBar} />
        </div>
        <div className="center-container">
          <h1>VS</h1>
        </div>
        <div className="container">
          <h1>Mudhorn</h1>
          <img className="mudhorn" src={Mudhorn} alt="The Mudhorn" />
          <ProgressBar percentage={enemyHealthBar} />
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
