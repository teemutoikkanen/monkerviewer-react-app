import React, {useState} from 'react';
import './App.css';
import MuiTreeView from '../MuiTreeView/MuiTreeView'
import RangeTable from '../RangeTable/RangeTable'

import tempTreeData from '../../temp/test-data.json'

function App() {

  const [tree, setTree] = useState(tempTreeData);
  // const [currentNode, setCurrentNode] = useState("");
  const [currentChildrenNodes, setCurrentChildrenNodes] = useState([]);


  const handleOnMuiTreeLabelClick = (id, name, data, children) => {
    // setCurrentNode(id) 
    setCurrentChildrenNodes(children)

    
    // children.map((childNode, idx) => {
    //   console.log(childNode.data)
    // })

    
  }
  // setTree(tempTreeData);

  return (
    <div className="App">
      <div className="DropDownTree">
        3-way 20bb /w 1bb ante incl limps test0
        <MuiTreeView tree={tempTreeData} handleOnLabelClick={handleOnMuiTreeLabelClick} />  
      </div>
      <div className ='RangeTable'>
        <RangeTable currentChildrenNodes={currentChildrenNodes} />
      </div>
              
    </div>
  );
}

export default App;
