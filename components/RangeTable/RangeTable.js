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

const colorDictionary = {
  fold: "blue",
  call: "green",
  "all-in": "red",
  raise: "orange",
  //
};

export default function RangeTable(props) {
  // muutujien alustusta
  const rowIndicesArray = [...Array(13).keys()];
  let bgcArr = Array(13 * 13).fill("pink");
  

  //tarkistetaan heti onko reissukokoja yli 1, jos on niin ei-standardi värit

  let nRaise = 0;
  if (nRaise > 1) {
    //todo tee taikoja colorDictillä, helpoin luoda vaan uudet jokaselle nRaise = 2, 3 ,4 jne..
    alert("nRaise > 1 !!! ", nRaise);
  }

  //1. LOOPATAAN JOKAINEN CHILD NODE -> YHTEEN ARRAYHYN KAIKKI TARVITTAVA DATA finalDataArray
  if (props.currentChildrenNodes) {
    let finalDataArray = combosWoSuits.map((combo, idx) => {
      return {
        combo: combo,
        frequencies: [],
        actions: [],
        colors: [],
        evs: [],
      };
    });
    props.currentChildrenNodes.forEach((childNode, idx) => {
      if (childNode.name.split(" ")[1] === "raise") {
        nRaise += 1;
      }
    });

    props.currentChildrenNodes.forEach((childNode, idx) => {
      // apuarray, että saadaan n eri actionista data yhteen arrayhyn, lähinnä jos yksittäisen combo mixaa
      const tempDataArr = childNode.data.split("\n");
      let curActionComboFreqEvArray = [];
      let curAction = childNode.name;

      tempDataArr.forEach((val, idx) => {
        if (idx % 2 === 0 && idx <= 336) {
          //jos freq > 0, otetaan data talteen
          if (tempDataArr[idx + 1].split(";")[0] > 0) {
            let tempObj = {
              combo: val,
              freq: tempDataArr[idx + 1].split(";")[0],
              ev: tempDataArr[idx + 1].split(";")[1],
            };
            curActionComboFreqEvArray.push(tempObj);
          }
        }
      });

      //yhdistetään 2-5 kpl (curAction, curActionComboFreqEvArray) yhteen finalDataArray
      [...finalDataArray].forEach((val, idx) => {
        curActionComboFreqEvArray.forEach((curActionVal, curActionIdx) => {
          try {
            if (val.combo === curActionVal.combo) {
              finalDataArray[idx].frequencies.push(curActionVal.freq);
              finalDataArray[idx].evs.push(curActionVal.ev);
              finalDataArray[idx].actions.push(curAction);
              finalDataArray[idx].colors.push(
                colorDictionary[curAction.split(" ")[1]]
              );
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
    });

    console.log("finalDataArray", finalDataArray);

    finalDataArray.forEach((comboObject, idx) => {
      if (comboObject.colors.length <= 1) {
        bgcArr[idx] = comboObject.colors[0];
        console.log(comboObject, comboObject.colors[0]);
      } else {
        let prevFreqSum = 0;
        let bgcStr = "linear-gradient(to right";
        //todo .map pois .foreach tilalle
        const linGrad2dimArray = comboObject.frequencies.map((freq, idx) => {
          //MUOKATAAN FREQKVENSSIT linear-gradient css sopivaan muotoon
          //comboObject.frequencies = [0.1 0.6 0.3] nyt. luo näistä esim [[0 10] [10 70] [70 100]]
          const v1 = prevFreqSum * 100;
          const v2 = (prevFreqSum + parseFloat(freq)) * 100;

          prevFreqSum += parseFloat(freq);

          bgcStr += ", " + comboObject.colors[idx] + " " + v1 + "% " + v2 + "%";

          //todo poista return
          return [Math.floor(v1), Math.floor(v2)];
        });

        bgcStr += ")";
        bgcArr[idx] = bgcStr;
        console.log(bgcStr)
      }
    });
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
                  bgc={bgcArr[i]}
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
