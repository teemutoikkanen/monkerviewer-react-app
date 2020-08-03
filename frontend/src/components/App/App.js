import React, {useState} from 'react';
import './App.css';
import MuiTreeView from '../MuiTreeView/MuiTreeView'
import RangeTable from '../RangeTable/RangeTable'
import parseTreeData from '../../utils/parseTreeData'
import ActionButton from '../ActionButton/ActionButton'
import MouseOverPopover from '../MouseOverPopover/MouseOverPopover'
import TreeSelector from '../TreeSelector/TreeSelector'

import jsondata20bb3way050bbante from "../../trees/20bb-3way-050bbante.json"
import jsondata20bb3way1bbante from "../../trees/20bb-3way-1bbante.json"
import jsondata20bb from "../../trees/20bb.json"
import jsondata25bbbvb1bbante from "../../trees/25bb-bvb-1bbante.json"
import jsondata4wayicm5leftco30btn26sb10bb20 from "../../trees/4way-icm5left-co30-btn26-sb10-bb20.json"


const treeDict = { 
jsondata20bb3way050bbante: jsondata20bb3way050bbante, 
jsondata20bb3way1bbante: jsondata20bb3way1bbante, 
jsondata20bb: jsondata20bb, 
jsondata25bbbvb1bbante: jsondata25bbbvb1bbante, 
jsondata4wayicm5leftco30btn26sb10bb20: jsondata4wayicm5leftco30btn26sb10bb20
}

const colorDictionary = {
  fold: "rgb(109, 162, 193)",
  call: "	rgb(142, 188, 139)",
  "all-in": "rgb(183, 73, 36)",
  raise: "rgb(234, 150, 122)",
  empty: "rgb(119, 119, 119)"
  //
};

function App() {

  const [tree, setTree] = useState(jsondata20bb3way1bbante);
  const [currentChildrenNodes, setCurrentChildrenNodes] = useState([]);

  let RangeTableTitle = ""

  if (currentChildrenNodes[0]) {
    RangeTableTitle = currentChildrenNodes[0].position + " Strategy";

    if (currentChildrenNodes[0].actionList) {
      RangeTableTitle += " vs. "
      currentChildrenNodes[0].actionList.slice(0,-1).forEach((val,idx) => {
        RangeTableTitle += val + " "
      })

    }
    
  }

  const handleOnMuiTreeLabelClick = (id, name, data, children) => {

    if (children) {
      setCurrentChildrenNodes(children)
    }
    
  }

  const handleTreeSelectorOnClick = (key) => {
    setTree(treeDict[key])
  }

  //return val [bgcArr,freqArr,actionArr,evArr]
  const rangeTableData = parseTreeData({currentChildrenNodes})


  let treeName = "select tree"

  if (tree) {
    console.log(tree)
    treeName = tree.name.split("\\").slice(-1);

  }
    
  //TODO forEach child render action-nappula /w freq
  return (
    <div className="App">
      <div className="DropDownTree">
      {treeName} 
        <MuiTreeView tree={tree} handleOnLabelClick={handleOnMuiTreeLabelClick} />  
      </div>
      <div className ='RangeTable'>
        {RangeTableTitle}
        <RangeTable rangeTableData={rangeTableData} />
        <div className = 'ActionBoxesContainer' >
        {currentChildrenNodes.map((childNode,idx) => {
          return (
            <ActionButton bgc={colorDictionary[childNode.name.split(" ")[1]]} name={childNode.name}></ActionButton>
          );
        })}
      </div>
      todooo: puunavigointi selkeemmäks: tuplaklick sulkeminen, ulkoasu nuolet yms, vertaa parempiin, muita vaihtoehtoja?, betsikokojen varmistusta, server side data isommille puille?, ev/freq popup, pöytäanimaatio + painettavat napit
      </div>
      <div className='TreeSelector'>
        {/* <TreeSelector handleTreeSelectorOnClick={handleTreeSelectorOnClick} treeDict={treeDict}></TreeSelector> */}
      </div>
      <div className = 'TreeSelector'>
            {Object.keys(treeDict).map((key) => {
                return (
                    <button className = 'treeSelectorBtn' bgc = 'white' onClick = {() => handleTreeSelectorOnClick(key)}>{key.substr(8)}</button>

                )
            })}
        </div>
      
      <div>  
        
      </div>
      
              
    </div>
  );
}

export default App;
