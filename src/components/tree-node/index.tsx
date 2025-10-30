import React, { useState } from "react";
import TreeNode from "./tree-node";
import type { NodeType } from "../../lib/type";
import { Plus } from "lucide-react";

const TreeApp: React.FC = () => {
  const [tree, setTree] = useState<NodeType[]>([]);

  const addRootNode = () => {
    const newNode: NodeType = {
      id: Date.now().toString(),
      value: "",
      readonly: false,
      children: [],
    };
    setTree([...tree, newNode]);
  };

  const updateNode = (index: number, updatedNode: NodeType) => {
    const updatedTree = [...tree];
    updatedTree[index] = updatedNode;
    setTree(updatedTree);
  };

  const deleteNode = (id: string) => {
    const filtered = tree.filter((node) => node.id !== id);
    setTree(filtered);
  };

  return (
    <div className="tree-section">
      <button className="btn" onClick={addRootNode}>
        Main <Plus />
      </button>
      {tree.map((node, index) => (
        <TreeNode
          key={node.id}
          node={node}
          onUpdate={(updatedNode) => updateNode(index, updatedNode)}
          onDelete={deleteNode}
        />
      ))}
    </div>
  );
};

export default TreeApp;
