import React, {useState} from 'react';
import './App.css';
import MuiTreeView from '../MuiTreeView/MuiTreeView'
import RangeTable from '../RangeTable/RangeTable'
import parseTreeData from '../../utils/parseTreeData'
import ActionButton from '../ActionButton/ActionButton'

import tempTreeData from '../../temp/test-data.json'

const colorDictionary = {
  fold: "rgb(109, 162, 193)",
  call: "	rgb(142, 188, 139)",
  "all-in": "rgb(183, 73, 36)",
  raise: "rgb(234, 150, 122)",
  empty: "rgb(119, 119, 119)"
  //
};

function App() {

  const [tree, setTree] = useState(tempTreeData);
  const [currentChildrenNodes, setCurrentChildrenNodes] = useState([]);

  let RangeTableTitle = ""

  if (currentChildrenNodes[0]) {
    RangeTableTitle = currentChildrenNodes[0].position + " Strategy";
  }

  const handleOnMuiTreeLabelClick = (id, name, data, children) => {

    if (children) {
      setCurrentChildrenNodes(children)
    }
    
  }

  const bgcArr = parseTreeData({currentChildrenNodes})
  console.log(bgcArr)


  //TODO forEach child render action-nappula /w freq
  return (
    <div className="App">
      <div className="DropDownTree">
        Game Tree 
        <MuiTreeView tree={tempTreeData} handleOnLabelClick={handleOnMuiTreeLabelClick} />  
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
      </div>
      
              
    </div>
  );
}

export default App;
