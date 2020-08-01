import React, {useState} from 'react';
import './App.css';
import MuiTreeView from '../MuiTreeView/MuiTreeView'
import RangeTable from '../RangeTable/RangeTable'
import parseTreeData from '../../utils/parseTreeData'
import ActionButton from '../ActionButton/ActionButton'
import MouseOverPopover from '../MouseOverPopover/MouseOverPopover'
import TreeSelector from '../TreeSelector/TreeSelector'


import bb15tree from '../../temp/python-backend/15bb.json'
//import bb20tree from '../../temp/python-backend/20bb.json'
import bb30tree from '../../temp/python-backend/30bb.json'
// import bb40tree from '../../temp/python-backend/40bb.json'
// import bb60tree from '../../temp/python-backend/bb60.json'

const treeDict = {
  bb15: bb15tree,
  // bb20: bb20tree,
  bb30: bb30tree,
 // bb40: bb40tree,
  
  // bb60: bb60tree
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

  const [tree, setTree] = useState(bb30tree);
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

  const bgcArr = parseTreeData({currentChildrenNodes})

  console.log("Object.keys(treeDict)",Object.keys(treeDict))
  //TODO forEach child render action-nappula /w freq
  return (
    <div className="App">
      <div className="DropDownTree">
        Game Tree 
        <MuiTreeView tree={tree} handleOnLabelClick={handleOnMuiTreeLabelClick} />  
      </div>
      <div className ='RangeTable'>
        {RangeTableTitle}
        <RangeTable bgcArr={bgcArr} />
        <div className = 'ActionBoxesContainer' >
        {currentChildrenNodes.map((childNode,idx) => {
          console.log(childNode.name)
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
                    <button bgc = 'white' onClick = {() => handleTreeSelectorOnClick(key)}>{key}</button>

                )
            })}
        </div>
      
      <div>  
        
      </div>
      
              
    </div>
  );
}

export default App;
