import { useState } from "react";
import PolygonVisualizer from "./polygon";
import TreeApp from "./tree-node";

const Layout = () => {
  const [activeTab, setActiveTab] = useState<"polygon" | "tree">("polygon");

  return (
    <div>
      <h1>xyicon-interview</h1>
      <div className="flex-section">
        <button
          onClick={() => setActiveTab("polygon")}
          className={`btn ${
            activeTab === "polygon" ? "btn-active" : "btn-default"
          }`}
        >
          Polygon
        </button>
        <button
          onClick={() => setActiveTab("tree")}
          className={`btn ${
            activeTab === "tree" ? "btn-active" : "btn-default"
          }`}
        >
          Tree Node
        </button>
      </div>

      {activeTab === "polygon" && <PolygonVisualizer />}
      {activeTab === "tree" && <TreeApp />}
    </div>
  );
};

export default Layout;
