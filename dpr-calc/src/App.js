import {useState, useEffect} from 'react';
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
  const [firstHitBonus, setFirstHitBonus] = useState([0, 0, 0, 0, 0]);
  const [firstHitMod, setFirstHitMod] = useState(0);
  const [mod, setMod] = useState(0);
  const [data, setData] = useState([]);
  const [adv, setAdv] = useState([]);
  const [disadv, setDisadv] = useState([]);
  useEffect(() => {
    console.log(diceNum);
  }, [diceNum]);

  const calculateP = (armorClass, bonus, C, adv = false, disadv = false, firstHit) => {
    let P = (21 - armorClass + bonus) / 20;
    if (P >= 1.0) {
      P = 0.95;
    } else if (P <= 0) {
      P = 0.05;
    }
    if (adv) {P = 1 - (Math.pow(1 - P, 2))}
    if (disadv) {P = Math.pow(P, 2)}
    let returnP = {"P": P,}
    if (firstHit) {
      returnP["OneHit"] = 1 - (Math.pow(1 - P, atkNum));
    }
    return returnP;
  }

  const calculateC = (crit, adv = false, disadv = false) => {
    let C = (21 - crit) / 20;
    if (adv) {C = 1 - (Math.pow(1 - C, 2))}
    if (disadv) {C = Math.pow(C, 2)}
    return C;
  }

  const calculateDPR = () => {
    const avgArray = diceNum.map((num, idx) => num * diceAvg[idx]);
    const avgFirstHit = firstHitBonus.map((num, idx) => num * diceAvg[idx]);
    const totalAvg = avgArray.reduce((a, b) => a + b);
    const firstHitAvg = avgFirstHit.reduce((a, b) => a + b);
    let DPH = totalAvg + mod;
    let DPC = totalAvg;
    const dpr = AC.map(val => {
      let C = calculateC(critNum);
      let probability = calculateP(val, atkBonus, C, false, false, firstHitAvg !== 0);
      let D1 = 0;
      let D2 = 0;
      if (firstHitAvg !== 0) {
        console.log(probability["OneHit"]);
        D1 = probability["OneHit"] * (firstHitAvg + firstHitMod);
        D2 = probability["OneHit"] * (C / probability["P"]) * firstHitAvg;
      }
      return Math.round((((probability["P"] * DPH) + (C * DPC)) * atkNum + D1 + D2) * 10) / 10;
    });
    const dprAdv = AC.map(val => {
      let C = calculateC(critNum, true);
      let probability = calculateP(val, atkBonus, C, true, false, firstHitAvg !== 0);
      let D1 = 0;;
      let D2 = 0;
      if (firstHitAvg !== 0) {
        D1 = probability["OneHit"] * (firstHitAvg + firstHitMod);
        D2 = probability["OneHit"] * (C / probability["P"]) * firstHitAvg;
      }
      return Math.round((((probability["P"] * DPH) + (C * DPC)) * atkNum + D1 + D2) * 10) / 10;
    });
    const dprDisadv = AC.map(val => {
      let C = calculateC(critNum, false, true);
      let probability = calculateP(val, atkBonus, C, false, true, firstHitAvg !== 0);
      let D1 = 0;
      let D2 = 0;
      if (firstHitAvg !== 0) {
        D1 = probability["OneHit"] * (firstHitAvg + firstHitMod);
        D2 = probability["OneHit"] * (C / probability["P"]) * firstHitAvg;
      }
      return Math.round((((probability["P"]  * DPH) + (C * DPC)) * atkNum + D1 + D2) * 10) / 10;
    });
    console.log(dpr);
    setData(dpr);
    setAdv(dprAdv);
    setDisadv(dprDisadv);
  }
  

  return (
    <>
      <h1>Average DPR from AC 10 - 30</h1>
      <DamageGraph damageData={data} advData={adv} disadvData={disadv}/>
      <div className="inputs">
        <h2>Input Fields</h2>
        <h3>Action Attack</h3>
        <label>Attack Bonus</label>
        <input className="atkBonus" type="number" onChange={e => setAtkBonus(parseInt(e.target.value))} />
        <label>Num. Attacks</label>
        <input className="atkBonus" type="number" onChange={e => setAtkNum(parseInt(e.target.value))} />
        <label>Crit</label>
        <input className="atkBonus" type="number" value={critNum} onChange={e => setCritNum(parseInt(e.target.value))} />
          {diceTitles.map((title, idx) => (
            <>
              <input className="diceInput" type="number" value={diceNum[idx]} onChange={e => setDiceNum(diceNum.map((num, id) => id === idx ? parseInt(e.target.value) : parseInt(num)))}/>
              <label>{title}</label>
            </>
          ))}
        +
        <input className="diceInput" type="number" onChange={e => setMod(parseInt(e.target.value))} />
        <h3>Bonus on First Hit</h3>
          {diceTitles.map((title, idx) => (
            <>
              <input className="diceInput" type="number" value={firstHitBonus[idx]} onChange={e => setFirstHitBonus(firstHitBonus.map((num, id) => id === idx ? parseInt(e.target.value) : parseInt(num)))}/>
              <label>{title}</label>
            </>
          ))}
        +
        <input className="diceInput" type="number" onChange={e => setFirstHitMod(parseInt(e.target.value))} />
        <button onClick={calculateDPR}>Calculate DPR</button>
      </div>
    </>
  );
}

export default App;