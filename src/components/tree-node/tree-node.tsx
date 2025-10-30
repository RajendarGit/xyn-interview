import { Plus, Trash } from "lucide-react";
import type { NodeType, TreeNodeProps } from "../../lib/type";

const TreeNode: React.FC<TreeNodeProps> = ({ node, onUpdate, onDelete }) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...node, value: e.target.value });
  };

  const toggleReadonly = () => {
    onUpdate({ ...node, readonly: !node.readonly });
  };

  const addChild = () => {
    const newChild: NodeType = {
      id: Date.now().toString(),
      value: "",
      readonly: false,
      children: [],
    };
    onUpdate({ ...node, children: [...node.children, newChild] });
  };

  const updateChild = (childIndex: number, updatedChild: NodeType) => {
    const updatedChildren = [...node.children];
    updatedChildren[childIndex] = updatedChild;
    onUpdate({ ...node, children: updatedChildren });
  };

  const deleteChild = (childId: string) => {
    const filtered = node.children.filter((child) => child.id !== childId);
    onUpdate({ ...node, children: filtered });
  };

  return (
    <div className="tree-flex">
      <input
        type="text"
        value={node.value}
        onChange={handleValueChange}
        readOnly={node.readonly}
        className="input"
        disabled={node.readonly}
      />
      <label>
        <input
          type="checkbox"
          checked={node.readonly}
          onChange={toggleReadonly}
        />
        Readonly
      </label>
      <button className="btn btn-sm" onClick={() => onDelete(node.id)}>
        <Trash className="icon" />
      </button>{" "}
      <button className="btn btn-sm" onClick={addChild}>
        <Plus className="icon" />
      </button>
      {node.children.map((child, index) => (
        <TreeNode
          key={child.id}
          node={child}
          onUpdate={(updatedChild) => updateChild(index, updatedChild)}
          onDelete={deleteChild}
        />
      ))}
    </div>
  );
};

export default TreeNode;
