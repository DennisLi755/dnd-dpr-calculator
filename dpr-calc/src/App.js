import {useState, useEffect, useContext} from 'react';
import './App.css';
import { DamageGraph } from './graphs/damage-graph';
import { diceAvg } from './dice-data/dice';

function App() {
  let data = [];
  for (let i = 0; i < 21; i++) {
    data.push(Math.random() * 20);
  }
  console.log(diceAvg);
  return (
    <>
      <h1>Average DPR from AC 10 - 30</h1>
      <DamageGraph damageData={data}/>
      <div className="inputs">
        <h3>Input Fields</h3>
          <input className="diceInput" type="text"/>
          <label>d4</label>
      </div>
    </>
  );
}

export default App;