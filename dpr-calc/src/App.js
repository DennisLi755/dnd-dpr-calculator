import {useState, useEffect, useContext} from 'react';
import './App.css';
import { DamageGraph } from './graphs/damage-graph';
import { diceAvg, diceTitles } from './dice-data/dice';

function App() {
  //testing stuff
  // let data = [];
  // for (let i = 0; i < 21; i++) {
  //   data.push(Math.random() * 20);
  // }

  const [diceNum, setDiceNum] = useState([0, 0, 0, 0, 0]);
  const [mod, setMod] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    //console.log(diceNum);
  }, [diceNum]);

  const calculateDPR = () => {
    const flatAverage = diceNum.map((num, idx) => num * diceAvg[idx]);
    //tentative
    const dpr = flatAverage.reduce((a, b) => a + b) + mod;
    console.log(dpr);
  }

  return (
    <>
      <h1>Average DPR from AC 10 - 30</h1>
      <DamageGraph damageData={data}/>
      <div className="inputs">
        <h3>Input Fields</h3>
          {diceTitles.map((title, idx) => (
            <>
              <input className="diceInput" type="number" onChange={e => setDiceNum(diceNum.map((num, id) => id === idx ? num + e.target.value : num))}/>
              <label>{title}</label>
            </>
          ))}
        +
        <input className="diceInput" type="number" onChange={e => setMod(parseInt(e.target.value))} />
        <button onClick={calculateDPR}>Calculate DPR</button>
      </div>
    </>
  );
}

export default App;