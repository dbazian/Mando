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
  const [defendDisabled, setDefendDisabled] = useState(false);
  const [defendCount, setDefendCount] = useState(0);
  const [flameThrowerCount, setFlameThrowerCount] = useState(0);
  const [flameThrowerDisabled, setFlameThrowerDisabled] = useState(false);
  const [grappleCount, setGrappleCount] = useState(0);
  const [grappleDisabled, setGrappleDisabled] = useState(false);
  const [babyYodaDisabled, setBabyYodaDisabled] = useState(false);
  const [mandoImage, setMandoImage] = useState(Mando);
  const [playerAction, setPlayerAction] = useState("");
  const [playerActionNumber, setPlayerActionNumber] = useState();
  const [enemyActionNumber, setEnemyActionNumber] = useState();

  const reset = () => {
    setPlayerHealthBar(100);
    setEnemyHealthBar(100);
    setFlameThrowerDisabled(false);
    setGrappleDisabled(false);
    setBabyYodaDisabled(false);
    setGrappleCount(0);
    setFlameThrowerCount(0);
    setPlayerActionNumber();
    setPlayerAction();
    setEnemyActionNumber();
    setDefendCount(0);
  };

  const ENEMY_ATTACK = () => {
    let attack = 5 + Math.floor(Math.random() * 25);
    setPlayerHealthBar(playerHealthBar - attack);
    setEnemyActionNumber("attacks for " + attack + " damage");
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
    if (playerHealthBar > 100) {
      setPlayerHealthBar(100);
    }
  }, [playerHealthBar, enemyHealthBar]);

  const attackHandler = () => {
    setMandoImage(Attack);
    setPlayerAction("attacks for ");
    let attack = Math.floor(Math.random() * 11);
    setPlayerActionNumber(attack + " damage");
    setEnemyHealthBar(enemyHealthBar - attack);
    ENEMY_ATTACK();
    flameThrowerCounter();
    grappleCounter();
    defendCounter();
  };

  const defendHandler = () => {
    setMandoImage(Defend);
    setPlayerAction("heals ");
    let heal = Math.floor(Math.random() * 10);
    setPlayerHealthBar(playerHealthBar + heal);
    setPlayerActionNumber("for " + heal + " health");
    setDefendDisabled(true);
    setDefendCount(defendCount + 1);
    flameThrowerCounter();
    grappleCounter();
    setEnemyActionNumber();
  };

  const defendCounter = () => {
    if (defendCount === 4) {
      setDefendCount(0);
      setDefendDisabled(false);
    } else if (defendCount > 0) {
      setDefendCount(defendCount + 1);
    } else {
      return;
    }
  };

  const flameThrowerHandler = () => {
    setMandoImage(FlameThrower);
    setPlayerAction("uses flamethrower for ");
    let attack = Math.floor(Math.random() * 15);
    setPlayerActionNumber(attack + " damage");
    setEnemyHealthBar(enemyHealthBar - attack);
    ENEMY_ATTACK();
    setFlameThrowerDisabled(true);
    setFlameThrowerCount(flameThrowerCount + 1);
    grappleCounter();
    defendCounter();
  };

  const flameThrowerCounter = () => {
    if (flameThrowerCount === 4) {
      setFlameThrowerCount(0);
      setFlameThrowerDisabled(false);
    } else if (flameThrowerCount > 0) {
      setFlameThrowerCount(flameThrowerCount + 1);
    } else {
      return;
    }
  };

  const grappleHandler = () => {
    setMandoImage(Grapple);
    setPlayerAction("grapples for ");
    let attack = Math.floor(Math.random() * 5);
    setEnemyHealthBar(enemyHealthBar - attack);
    setPlayerActionNumber(attack + " damage");
    setEnemyActionNumber("Is grappled and can't attack");
    setGrappleDisabled(true);
    setGrappleCount(grappleCount + 1);
    flameThrowerCounter();
    defendCounter();
  };

  const grappleCounter = () => {
    if (grappleCount === 3) {
      setGrappleCount(0);
      setGrappleDisabled(false);
    } else if (grappleCount > 0) {
      setGrappleCount(grappleCount + 1);
    } else {
      return;
    }
  };

  const babyYodaHandler = () => {
    setMandoImage(BabyYoda);
    setPlayerAction("is saved by the child");
    setPlayerActionNumber();
    setEnemyActionNumber("can't attack");
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
      <div>
        <h1>
          Mando {playerAction} {playerActionNumber}
        </h1>
        <h1>Mudhorn {enemyActionNumber}</h1>
      </div>
      <div className="buttons">
        <Button onClick={attackHandler} variant="light">
          Attack
        </Button>
        <Button onClick={defendHandler} variant="light" disabled={defendDisabled}>
          Defend
        </Button>
        <Button onClick={flameThrowerHandler} variant="light" disabled={flameThrowerDisabled}>
          Flames
        </Button>
        <Button onClick={grappleHandler} variant="light" disabled={grappleDisabled}>
          Grapple
        </Button>
        <Button onClick={babyYodaHandler} variant="light" disabled={babyYodaDisabled}>
          Child
        </Button>
      </div>
    </div>
  );
};

export default App;
