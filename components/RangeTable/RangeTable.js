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

const colors = ["green","yellow","orange","red"]

export default function RangeTable(props) {
  const rowIndicesArray = [...Array(13).keys()];
  const bgc = "white";


  let finalDataArray = combosWoSuits.map((combo, idx) => {
    return  {
      combo: combo,
      frequencies: [],
      actions: [],
      colors: [],
      evs: [],
    };
  });

  // actionit child nodeista talteen, mitä varten?
  // let actions = []
  
  //loop jokainen child node eli action ja data
  props.currentChildrenNodes.forEach((childNode, idx) => {
    const tempDataArr = childNode.data.split("\n");

    //current actions data array tässä muodossa 0: {combo: "AA", freq: "0.0", ev: "-1000.0"}
    let curActionComboFreqEvArray = [];
    let curAction = childNode.name;
    // actions.push(curAction)

    tempDataArr.forEach((val, idx) => {
      if (idx % 2 == 0 && idx <= 336) {
        let tempObj = {
          combo: val,
          freq: tempDataArr[idx + 1].split(";")[0],
          ev: tempDataArr[idx + 1].split(";")[1],
        };
        curActionComboFreqEvArray.push(tempObj);
      }
    });
    // console.log(curAction, curActionComboFreqEvArray);

    //yhdistetään 2-5 kpl (curAction, curActionComboFreqEvArray) yhteen comboStrategyFreqColEvArray
    [...finalDataArray].forEach((val,idx) => {
      curActionComboFreqEvArray.forEach((curActionVal, curActionIdx) => {
        
        try {
          if (val.combo === curActionVal.combo) {
            finalDataArray[idx].frequencies.push(curActionVal.freq);
            finalDataArray[idx].evs.push(curActionVal.ev);
            finalDataArray[idx].actions.push(curAction);
          }
        }
        catch(e) {
          console.log(e)
        }
        
      })
    })
  });
  
  console.log(finalDataArray);
  //TODO next  comboStrategyFreqColEvArray datasta visualisointi: background color logiikka, pinta-ala juttu, Square toiminta

  // sorttaa comboStrategyFreqColEvArray samalla tavalla kun squaret täytetään
  // getColors curAcctionsien avulla ["red", "yellow", "orange"] esim
  // bgc = "linear-gradient(90deg, pink 50%, cyan 50%)"
  // const bgcArr = finalDataArray.map((val,idx) => {
  //   return (
  //     actions.forEach((action,aIdx) => {
        
  //     })
  //   )
    
  // })

  function getBgc(i) {

    let usedActionsAndFreqs = [];
    let colors = [];

    //for each non 0 frequency save action ja sit vast mietin värit
    try {
      finalDataArray[i].frequencies.forEach((val,idx) => {
        console.log("finalDataArray[i].frequencies.forEach((val ",val)
        if (val !== "0.0") {
          console.log("found !== 0.0 ", val)
          console.log("adding ", finalDataArray[i].actions[idx], finalDataArray[i].frequencies[idx])
          usedActionsAndFreqs.push({action: finalDataArray[i].actions[idx], freq: finalDataArray[i].frequencies[idx]});
        }
      })
  
      console.log("usedActionsAndFreqs",usedActionsAndFreqs)
      //for each 0-freq action (& freq)  --> pick a color
      usedActionsAndFreqs.forEach((val,idx) => {
        console.log("undefined val.action?", val.action)
        if (val.action.split(" ")[1] === "raise") {
          colors.push("orange");
        }
        else if (val.action.split(" ")[1] === "call") {
          colors.push("green");
        }
        else if (val.action.split(" ")[1] === "all-in") {
          colors.push("red");
        }
        else if (val.action.split(" ")[1] === "fold") {
          colors.push("blue");
        }
      })
  
      //make css style str from colors []
  
      if (colors.length == 1) {
        return colors[0]
      }
      if (colors.length > 1) {
        let bgcStr = "linear-gradient(90deg";
        colors.forEach((val,idx) => {
          bgcStr += ", " + val 
          bgcStr += ((usedActionsAndFreqs.freq[idx])*100) + "%"
  
        })
        bgcStr += ")"
        return bgcStr
      }

    }
    catch(e) {
      console.log(e)
    }
    

  }

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
                  bgc={getBgc(i)}
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
