import React, { Component } from "react";
import { Collapse, Tree } from "antd";

const TreeNode  = Tree.TreeNode ;

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

export class Productive extends Component {
  render() {
    return (
      <div>
        <Collapse bordered={false} onChange={callback}>
          <Panel header="Entidades Estatales" key="1">

          </Panel>
          <Panel header="Formas Productivas" key="2">
            <Tree
              checkable
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              >
              <TreeNode title="Estatal" key="estatal">
                <TreeNode title="UBPC" key="ibpc" isLeaf />
                <TreeNode title="UEB" key="ueb" isLeaf />
                <TreeNode title="Granja" key="granja" isLeaf />
              </TreeNode>
              <TreeNode title="Privado" key="privado">
                <TreeNode title="CPA" key="cpa" isLeaf />
                <TreeNode title="CCS" key="ccs" isLeaf />
              </TreeNode>
            </Tree>
          </Panel>
        </Collapse>,
      </div>
    );
  }
}

export default Productive;
