import React, {useState} from 'react';
import './App.css';
import MuiTreeView from '../MuiTreeView/MuiTreeView'
import RangeTable from '../RangeTable/RangeTable'

import tempTreeData from '../../temp/test-data.json'

function App() {

  const [tree, setTree] = useState(tempTreeData);
  const [currentNode, setCurrentNode] = useState("");
  const [rangeData, setRangeData] = useState([]);


  const handleOnMuiTreeLabelClick = (id, name, data, children) => {
    setCurrentNode(id) 
    console.log(id, tree)
    console.log(children)

    setRangeData(children)

    
    // children.map((childNode, idx) => {
    //   console.log(childNode.data)
    // })

    
  }
  // setTree(tempTreeData);

  return (
    <div className="App">
      <div className="DropDownTree">
        <MuiTreeView tree={tempTreeData} handleOnLabelClick={handleOnMuiTreeLabelClick} />  
      </div>
      <div className ='RangeTable'>
        <RangeTable rangeData={rangeData} />
      </div>
              
    </div>
  );
}

export default App;
