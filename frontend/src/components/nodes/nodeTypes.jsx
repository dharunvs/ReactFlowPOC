import BinaryTreeNode from "./BinaryTreeNode";

const nodeTypes = (handleNodeCreation) => ({
  BinaryTreeNode: (props) => (
    <BinaryTreeNode {...props} handleNodeCreation={handleNodeCreation} />
  ),
});

export default nodeTypes;
