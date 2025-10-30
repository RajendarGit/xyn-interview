export interface Point {
    x: number;
    y: number;
}

export type NodeType = {
    id: string;
    value: string;
    readonly: boolean;
    children: NodeType[];
};

export type TreeNodeProps = {
    node: NodeType;
    onUpdate: (updatedNode: NodeType) => void;
    onDelete: (id: string) => void;
};