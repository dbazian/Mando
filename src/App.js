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
  const [defendCount, setDefendCount] = useState();
  const [flameThrowerCount, setFlameThrowerCount] = useState();
  const [flameThrowerDisabled, setFlameThrowerDisabled] = useState(false);
  const [grappleCount, setGrappleCount] = useState();
  const [grappleDisabled, setGrappleDisabled] = useState(false);
  const [babyYodaDisabled, setBabyYodaDisabled] = useState(false);
  const [mandoImage, setMandoImage] = useState(Mando);
  const [playerTurn, setPlayerTurn] = useState(":");
  const [enemyTurn, setEnemyTurn] = useState(":");

  const reset = () => {
    setPlayerHealthBar(100);
    setEnemyHealthBar(100);
    setFlameThrowerDisabled(false);
    setGrappleDisabled(false);
    setBabyYodaDisabled(false);
    setGrappleCount(0);
    setFlameThrowerCount(0);
    setDefendCount(0);
    setPlayerTurn(":");
    setEnemyTurn(":");
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

  const PlayerAction = (PImage, PAction, PValue, PDescription) => {
    setMandoImage(PImage);
    let pValue = Math.floor(Math.random() * PValue);
    if (PDescription === " damage") {
      setEnemyHealthBar(enemyHealthBar - pValue);
    } else if (PDescription === " health") {
      setPlayerHealthBar(playerHealthBar + pValue);
    }
    if (grappleCount > 0 && grappleCount < 4) {
      setGrappleCount(grappleCount + 1);
    } else {
      setGrappleCount(0);
      setGrappleDisabled(false);
    }
    if (flameThrowerCount > 0 && flameThrowerCount < 4) {
      setFlameThrowerCount(flameThrowerCount + 1);
    } else {
      setFlameThrowerCount(0);
      setFlameThrowerDisabled(false);
    }
    if (defendCount > 0 && defendCount < 4) {
      setDefendCount(defendCount + 1);
    } else {
      setDefendCount(0);
      setDefendDisabled(false);
    }
    setPlayerTurn(PAction + pValue + PDescription);
  };

  const EnemyAction = (EAction, EAttack, EDescription) => {
    let eAttack = Math.floor(Math.random() * EAttack);
    setPlayerHealthBar(playerHealthBar - eAttack);
    setEnemyTurn(EAction + eAttack + EDescription);
  };

  const attackHandler = () => {
    PlayerAction(Attack, "attacks for ", 10, " damage");
    EnemyAction("attacks for ", 25, " damage");
  };

  const defendHandler = () => {
    PlayerAction(Defend, "heals for ", 10, " health");
    setEnemyTurn(" prepares for next attack");
    setDefendDisabled(true);
    setDefendCount(1);
  };

  const flameThrowerHandler = () => {
    PlayerAction(FlameThrower, "uses flamethrower for ", 15, " damage");
    EnemyAction(" attacks for ", 25, " damage");
    setFlameThrowerDisabled(true);
    setFlameThrowerCount(1);
  };

  const grappleHandler = () => {
    PlayerAction(Grapple, "grapples for ", 5, " damage");
    setEnemyTurn(" is grappled and can't attack");
    setGrappleDisabled(true);
    setGrappleCount(1);
  };

  const babyYodaHandler = () => {
    setMandoImage(BabyYoda);
    setPlayerTurn(" is saved by the child");
    setEnemyTurn(" can't attack");
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
        <h1>Mando {playerTurn}</h1>
        <h1>Mudhorn {enemyTurn}</h1>
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
