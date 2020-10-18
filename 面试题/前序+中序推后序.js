// 问题描述
// 根据一棵树的前序遍历与中序遍历构造二叉树。
// 注意:
// 你可以假设树中没有重复的元素。
// 节点
//  function TreeNode(val) {
//    this.val = val;
//    this.left = this.right = null;
//  };
// 例如，给出
// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]

// {
//     val: 3,
//     left: {val: 9, right: null, left: null},
//     right: {
//         val: 20,
//         right:  {val: 7, right: null, left: null},
//         left:  {val: 15, right: null, left: null}
//     }
// }
 
const buildTree = (preorder, inorder) => {
    if(!preorder.length) return null;
    
    const node = new TreeNode(preorder[0]);
    
    const index = inorder.indexOf(preorder[0]);
    
    const inLeft = inorder.slice(0, index);
    const inRight = inorder.slice(index + 1);
    
    const preLeft = preorder.slice(1, index + 1);
    const preRight = preorder.slice(index + 1);
    
    node.left = buildTree(preLeft, inLeft);
    node.right = buildTree(preRight, inRight);
    return node;
};