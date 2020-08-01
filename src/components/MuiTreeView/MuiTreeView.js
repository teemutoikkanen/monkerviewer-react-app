import React from '../../../node_modules/react';
import { makeStyles } from '../../../node_modules/@material-ui/core/styles';
import TreeView from '../../../node_modules/@material-ui/lab/TreeView';
import ExpandMoreIcon from '../../../node_modules/@material-ui/icons/ExpandMore';
import ChevronRightIcon from '../../../node_modules/@material-ui/icons/ChevronRight';
import TreeItem from '../../../node_modules/@material-ui/lab/TreeItem';
import { blue } from '@material-ui/core/colors';
import './MuiTreeView.css';


const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
    // "margin-right":  -
  },

  treeNodeClassTest: {
    "background-color": blue,
  }
});



export default function RecursiveTreeView(props) {
  const classes = useStyles();


  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} data = {nodes.data} children = {nodes.children}
      onLabelClick={() => props.handleOnLabelClick(nodes.id, nodes.name, nodes.data, nodes.children)} onIconClick={() => props.handleOnLabelClick(nodes.id, nodes.name, nodes.data,nodes.children)}>
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
      {renderTree(props.tree)}
    </TreeView>
  );
}