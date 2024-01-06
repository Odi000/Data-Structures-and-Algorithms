function Node(data) {
  return { data, left: null, right: null };
}

function Tree(array) {
  const root = buildTree(array);

  return { root, insert, remove };

  function insert(el, node) {
    node = node ? node : root;

    if (el < node.data) {
      if (!node.left) node.left = Node(el);
      else insert(el, node.left);
    } else if (el > node.data) {
      if (!node.right) node.right = Node(el);
      else insert(el, node.right);
    }
  }

  function remove(el, node = root) {
    if (node == null) return;
    let side = "left";
    if (el > node.data) {
      let side = "right";
      if (!checkForChilds(el, node, side)) remove(el, node[side]);
    } else {
      if (!checkForChilds(el, node, side)) remove(el, node[side]);
    }

    //function call
    function checkForChilds(el, node, side) {
      if (el === node[side].data) {
        if (node[side].left && node[side].right) {
          console.log('ka dy fmi');
        } else if (node[side].left || node[side].right) {
          console.log('ka ni fmi');
          const childNode = node[side].left? node[side].left: node[side].right;
          node[side].data = childNode.data;
          node[side].left = null;
          node[side].right = null;
        } else {
          node[side] = null;
        } return true
      } else return false;
    }
  }

  function buildTree(arr, start = 0, end) {
    if (start > end) return null;

    end = end != undefined ? end : arr.length - 1;
    const mid = parseInt((start + end) / 2);
    const node = Node(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};



let smaple = [];
for (let i = 0; i < 11; i++) {
  smaple[i] = i + 1;
}

const dataTree = Tree(smaple);

prettyPrint(dataTree.root)
console.log(" \n\n ");
dataTree.remove(10);
// dataTree.remove(73);
prettyPrint(dataTree.root);