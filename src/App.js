import "./scss/App.css";
import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Button from "react-bootstrap/Button";
import Mando from "./assets/Mando.jpg";
import Mudhorn from "./assets/Mudhorn.jpg";
import Attack from "./assets/Attack.jpg";
import Defend from "./assets/Defend.jpg";
import FlameThrower from "./assets/FlameThrower.jpg";
import Grapple from "./assets/Grapple.jpg";
import BabyYoda from "./assets/BabyYoda.jpg";

const App = () => {
  const [playerHealthBar, setPlayerHealthBar] = useState(100);
  const [enemyHealthBar, setEnemyHealthBar] = useState(100);
  const [flameThrowerCount, setFlameThrowerCount] = useState(0);
  const [flameThrowerDisabled, setFlameThrowerDisabled] = useState(false);
  const [grappleCount, setGrappleCount] = useState(0);
  const [grappleDisabled, setGrappleDisabled] = useState(false);
  const [babyYodaDisabled, setBabyYodaDisabled] = useState(false);
  const [mandoImage, setMandoImage] = useState(Mando);

  const reset = () => {
    setPlayerHealthBar(100);
    setEnemyHealthBar(100);
    setFlameThrowerDisabled(false);
    setGrappleDisabled(false);
    setBabyYodaDisabled(false);
    setGrappleCount(0);
    setFlameThrowerCount(0);
  };

  const ENEMY_ATTACK = () => {
    setPlayerHealthBar(playerHealthBar - Math.floor(Math.random() * 25));
  };

  useEffect(() => {
    if (playerHealthBar <= 0 && enemyHealthBar > 0) {
      alert("You Lost");
    } else if (enemyHealthBar <= 0 && playerHealthBar > 0) {
      alert("You Won");
    } else if (playerHealthBar <= 0 && enemyHealthBar <= 0) {
      alert("draw:");
    }
    if (playerHealthBar <= 0 || enemyHealthBar <= 0) {
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
    setMandoImage(Attack);
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 11));
    ENEMY_ATTACK();
    flameThrowerCounter();
    grappleCounter();
  };

  const defendHandler = () => {
    setMandoImage(Defend);
    playerHealthBar <= 90
      ? setPlayerHealthBar(playerHealthBar + 3 - Math.floor(Math.random() * 11))
      : setPlayerHealthBar(100 - Math.floor(Math.random() * 11));
    flameThrowerCounter();
    grappleCounter();
  };

  const flameThrowerHandler = () => {
    setMandoImage(FlameThrower);
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 15));
    ENEMY_ATTACK();
    setFlameThrowerDisabled(true);
    setFlameThrowerCount(flameThrowerCount + 1);
    grappleCounter();
  };

  const flameThrowerCounter = () => {
    if (flameThrowerCount === 4) {
      setFlameThrowerCount(0);
    } else if (flameThrowerCount > 0) {
      setFlameThrowerCount(flameThrowerCount + 1);
    } else {
      return;
    }
  };

  const grappleHandler = () => {
    setMandoImage(Grapple);
    setEnemyHealthBar(enemyHealthBar - Math.floor(Math.random() * 5));
    setGrappleDisabled(true);
    setGrappleCount(grappleCount + 1);
    flameThrowerCounter();
  };

  const grappleCounter = () => {
    if (grappleCount === 3) {
      setGrappleCount(0);
    } else if (grappleCount > 0) {
      setGrappleCount(grappleCount + 1);
    } else {
      return;
    }
  };

  const babyYodaHandler = () => {
    setMandoImage(BabyYoda);
    setPlayerHealthBar(100);
    setBabyYodaDisabled(true);
  };

  return (
    <div className="full">
      <div className="containers">
        <div className="container">
          <h1>Mando</h1>
          <img src={mandoImage} alt="The Mandalorian" />
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
        <Button onClick={attackHandler} variant="light">
          Attack
        </Button>
        <Button onClick={defendHandler} variant="light">
          Defend
        </Button>
        <Button onClick={flameThrowerHandler} variant="light" disabled={flameThrowerDisabled}>
          Flame Thrower
        </Button>
        <Button onClick={grappleHandler} variant="light" disabled={grappleDisabled}>
          Grapple
        </Button>
        <Button onClick={babyYodaHandler} variant="light" disabled={babyYodaDisabled}>
          Baby Yoda
        </Button>
      </div>
    </div>
  );
};

export default App;
