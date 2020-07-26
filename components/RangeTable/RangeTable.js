import React from "react";
import Square from "../Square/Square";

const combosWoSuits = [
  "AA",
  "AKs",
  "AQs",
  "AJs",
  "ATs",
  "A9s",
  "A8s",
  "A7s",
  "A6s",
  "A5s",
  "A4s",
  "A3s",
  "A2s",
  "AKo",
  "KK",
  "KQs",
  "KJs",
  "KTs",
  "K9s",
  "K8s",
  "K7s",
  "K6s",
  "K5s",
  "K4s",
  "K3s",
  "K2s",
  "AQo",
  "KQo",
  "QQ",
  "QJs",
  "QTs",
  "Q9s",
  "Q8s",
  "Q7s",
  "Q6s",
  "Q5s",
  "Q4s",
  "Q3s",
  "Q2s",
  "AJo",
  "KJo",
  "QJo",
  "JJ",
  "JTs",
  "J9s",
  "J8s",
  "J7s",
  "J6s",
  "J5s",
  "J4s",
  "J3s",
  "J2s",
  "ATo",
  "KTo",
  "QTo",
  "JTo",
  "TT",
  "T9s",
  "T8s",
  "T7s",
  "T6s",
  "T5s",
  "T4s",
  "T3s",
  "T2s",
  "A9o",
  "K9o",
  "Q9o",
  "J9o",
  "T9o",
  "99",
  "98s",
  "97s",
  "96s",
  "95s",
  "94s",
  "93s",
  "92s",
  "A8o",
  "K8o",
  "Q8o",
  "J8o",
  "T8o",
  "98o",
  "88",
  "87s",
  "86s",
  "85s",
  "84s",
  "83s",
  "82s",
  "A7o",
  "K7o",
  "Q7o",
  "J7o",
  "T7o",
  "97o",
  "87o",
  "77",
  "76s",
  "75s",
  "74s",
  "73s",
  "72s",
  "A6o",
  "K6o",
  "Q6o",
  "J6o",
  "T6o",
  "96o",
  "86o",
  "76o",
  "66",
  "65s",
  "64s",
  "63s",
  "62s",
  "A5o",
  "K5o",
  "Q5o",
  "J5o",
  "T5o",
  "95o",
  "85o",
  "75o",
  "65o",
  "55",
  "54s",
  "53s",
  "52s",
  "A4o",
  "K4o",
  "Q4o",
  "J4o",
  "T4o",
  "94o",
  "84o",
  "74o",
  "64o",
  "54o",
  "44",
  "43s",
  "42s",
  "A3o",
  "K3o",
  "Q3o",
  "J3o",
  "T3o",
  "93o",
  "83o",
  "73o",
  "63o",
  "53o",
  "43o",
  "33",
  "32s",
  "A2o",
  "K2o",
  "Q2o",
  "J2o",
  "T2o",
  "92o",
  "82o",
  "72o",
  "62o",
  "52o",
  "42o",
  "32o",
  "22",
];



export default function RangeTable(props) {
  const rowIndicesArray = [...Array(13).keys()];
  const bgc = "white";


  let comboStrategyFreqColEvArray = combosWoSuits.map((combo, idx) => {
    return  {
      combo: combo,
      frequencies: [],
      colors: [],
      evs: [],
    };
  });

  //todo populate props.rangeData to table background colors

  //https://stackoverflow.com/questions/8541081/css-set-a-background-color-which-is-50-of-the-width-of-the-window

  //idea: luo eka dictin jokasesta child nodesta niin että yhdistää combinaati ot esim
  // [{combo:AK, strats: [call, raise to 6, fold] freqs: [0.3, 0.7, 0], colors= [green,red,white]}, evs=[], ........... , {}]

  let actions = []
  
  props.currentChildrenNodes.forEach((childNode, idx) => {
    const tempArr = childNode.data.split("\n");

    //current actions data array tässä muodossa 0: {combo: "AA", freq: "0.0", ev: "-1000.0"}
    let curActionComboFreqEvArray = [];
    let curAction = childNode.name;
    actions.push(curAction)

    tempArr.forEach((val, idx) => {
      if (idx % 2 == 0 && idx <= 336) {
        let tempObj = {
          combo: val,
          freq: tempArr[idx + 1].split(";")[0],
          ev: tempArr[idx + 1].split(";")[1],
        };
        curActionComboFreqEvArray.push(tempObj);
      }
    });
    // console.log(curAction, curActionComboFreqEvArray);

    //TODO yhdistä 2-5 kpl (curAction, curActionComboFreqEvArray) yhteen comboStrategyFreqColEvArray

    [...comboStrategyFreqColEvArray].forEach((val,idx) => {
      curActionComboFreqEvArray.forEach((curActionVal, curActionIdx) => {
        
        try {
          if (val.combo === curActionVal.combo) {
            comboStrategyFreqColEvArray[idx].frequencies.push(curActionVal.freq);
            comboStrategyFreqColEvArray[idx].evs.push(curActionVal.ev)
          }
        }
        catch(e) {
          console.log(e)
        }
        
      })
    })
  });
  
  console.log(comboStrategyFreqColEvArray);
  //TODO next  comboStrategyFreqColEvArray datasta visualisointi: background color logiikka, pinta-ala juttu, Square toiminta

  return (
    <div>
      {rowIndicesArray.map((value0, index) => {
        return (
          <div className="board-row">
            {rowIndicesArray.map((value1, index) => {
              const i = value0 * 13 + value1;
              return (
                <Square
                  value={combosWoSuits[i]}
                  bgc={bgc}
                  // onMouseDown={() => props.onMouseDown(i)}
                  // onMouseOver={e => props.onMouseOver(i, e)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
