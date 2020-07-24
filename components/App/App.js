import React, {useState} from 'react';
import './App.css';
import MuiTreeView from '../MuiTreeView/MuiTreeView'

import tempTreeData from '../../temp/test-data.json'

function App() {

  const [tree, setTree] = useState(tempTreeData);
  const [currentNode, setCurrentNode] = useState("");
  
  const handleOnLabelClick = (id, name, data, children) => {

    setCurrentNode(id) 

    //TODO NEXT nodes.children ei toiminu mut ei oo pakko
    // App statessa on tree ja curretNode joidenka avulla children nodejen data kaavioksi!

    console.log('children', children)


  }
  // setTree(tempTreeData);

  return (
    <div className="App">
      <header className="App-header">
        <MuiTreeView tree={tempTreeData} handleOnLabelClick={handleOnLabelClick} />  
      </header>
    </div>
  );
}

export default App;
