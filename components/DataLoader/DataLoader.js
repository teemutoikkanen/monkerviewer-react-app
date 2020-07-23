import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import testData from '../../temp/test-data.json';

const data = testData

// const data = {
//     id: 'root',
//     name: 'Parent',
//     children: [
//       {
//         id: '1',
//         name: 'Child - 1',
//       },
//       {
//         id: '3',
//         name: 'Child - 3',
//         children: [
//           {
//             id: '4',
//             name: 'Child - 4',
//           },
//         ],
//       },
//     ],
//   };

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function handleOnLabelClick(data) {
    console.log(data)

    // TODO: for each child node setStaten avulla data talteen varmaan App.js stateen ja sit uus componentti visualisoimaan se!!
    for (const children in data['children']) {

        try {
            // console.log(children.name + " " + children[data].slice(0,20))
            console.log(children)
        }
        catch(err) {
            console.log(err)
        }

       


    }


}

export default function RecursiveTreeView() {
  const classes = useStyles();

  

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} data = {nodes.data} onLabelClick={() => handleOnLabelClick(data)}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}