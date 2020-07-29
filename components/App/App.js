import React, {useState} from 'react';
import './App.css';
import MuiTreeView from '../MuiTreeView/MuiTreeView'
import RangeTable from '../RangeTable/RangeTable'

import tempTreeData from '../../temp/100bb-bvb.json'

function App() {

  const [tree, setTree] = useState(tempTreeData);
  const [currentChildrenNodes, setCurrentChildrenNodes] = useState([]);

  const handleOnMuiTreeLabelClick = (id, name, data, children) => {

    if (children) {
      setCurrentChildrenNodes(children)
    }
    
  }

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
