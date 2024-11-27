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
  const AC = Array.apply(null, Array(21)).map((x, idx) => 10 + idx);

  const [atkBonus, setAtkBonus] = useState(0);
  const [atkNum, setAtkNum] = useState(0);
  const [critNum, setCritNum] = useState(20);
  const [diceNum, setDiceNum] = useState([0, 0, 0, 0, 0]);
  const [mod, setMod] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    //console.log(diceNum);
  }, [diceNum]);

  const calculateDPR = () => {
    const avgArray = diceNum.map((num, idx) => num * diceAvg[idx]);
    const totalAvg = avgArray.reduce((a, b) => a + b);
    const dpr = AC.map(val => {
      let C = (21 - critNum) / 20;
      let P = (21 - val + atkBonus) / 20;
      let DPH = totalAvg + mod;
      let DPC = totalAvg;
      if (P >= 1.0) {
        P = 0.95;
      } else if (P <= 0) {
        P = 0.05;
      }
      return ((P * DPH) + (C * DPC)) * atkNum;
    });
    console.log(dpr);
    setData(dpr);
  }

  return (
    <>
      <h1>Average DPR from AC 10 - 30</h1>
      <DamageGraph damageData={data}/>
      <div className="inputs">
        <h3>Input Fields</h3>
        <label>Attack Bonus</label>
        <input className="atkBonus" type="number" onChange={e => setAtkBonus(parseInt(e.target.value))} />
        <label>Num. Attacks</label>
        <input className="atkBonus" type="number" onChange={e => setAtkNum(parseInt(e.target.value))} />
        <label>Crit</label>
        <input className="atkBonus" type="number" value={critNum} onChange={e => setCritNum(parseInt(e.target.value))} />
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