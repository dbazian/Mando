import "./scss/App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Mando from "./assets/Mando.jpg";
import Mudhorn from "./assets/Mudhorn.jpg";
import ProgressBar from "./components/ProgressBar";

const App = () => {
  const [playerHealthBar, setPlayerHealthBar] = useState(100);
  const [enemyHealthBar, setEnemyHealthBar] = useState(100);
  const [flameThrowerCount, setFlameThrowerCount] = useState(0);
  const [flameThrowerDisabled, setFlameThrowerDisabled] = useState(false);
  const [grappleCount, setGrappleCount] = useState(0);
  const [grappleDisabled, setGrappleDisabled] = useState(false);

  const reset = () => {
    setPlayerHealthBar(100);
    setEnemyHealthBar(100);
    setFlameThrowerDisabled(false);
    setGrappleDisabled(false);
  };
  const ENEMY_ATTACK = () => {
    setPlayerHealthBar(playerHealthBar - Math.floor(Math.random() * 11));
  };

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

  useEffect(() => {
    if (flameThrowerCount === 0) {
      setFlameThrowerDisabled(false);
    }
  }, [flameThrowerCount]);

  useEffect(() => {
    if (grappleCount === 0) {
      setGrappleDisabled(false);
    }
  }, [grappleCount]);

  const attackHandler = () => {
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 11));
    ENEMY_ATTACK();
    flameThrowerCounter();
    grappleCounter();
  };

  const defendHandler = () => {
    playerHealthBar <= 90
      ? setPlayerHealthBar(playerHealthBar + 3 - Math.floor(Math.random() * 11))
      : setPlayerHealthBar(100 - Math.floor(Math.random() * 11));
    flameThrowerCounter();
    grappleCounter();
  };

  const flameThrowerHandler = () => {
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 15));
    ENEMY_ATTACK();
    setFlameThrowerDisabled(true);
    grappleCounter();
  };

  const flameThrowerCounter = () => {
    if (flameThrowerCount === 4) {
      setFlameThrowerCount(0);
    } else {
      setFlameThrowerCount(flameThrowerCount + 1);
    }
  };

  const grappleHandler = () => {
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 5));
    setGrappleDisabled(true);
    flameThrowerCounter();
  };

  const grappleCounter = () => {
    if (grappleCount === 3) {
      setGrappleCount(0);
    } else {
      setGrappleCount(grappleCount + 1);
    }
  };

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
        <Button onClick={attackHandler} variant="primary">
          Attack
        </Button>
        <Button onClick={defendHandler} variant="primary">
          Defend
        </Button>
        <Button onClick={flameThrowerHandler} variant="primary" disabled={flameThrowerDisabled}>
          Flame Thrower
        </Button>
        <Button onClick={grappleHandler} variant="primary" disabled={grappleDisabled}>
          Grapple
        </Button>
      </div>
    </div>
  );
};

export default App;
