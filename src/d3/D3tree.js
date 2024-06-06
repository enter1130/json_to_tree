import React from "react";
// import TreeChart from "./TreeChart";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import "./Trees.css";

const D3tree = ({data}) => {
  return (
    <div>
      <h1>Product Technology Tree</h1>
      {/* <TreeChart data={data} /> */}
      <Tree treeData={data} />
    </div>
  );
};

export default D3tree;
