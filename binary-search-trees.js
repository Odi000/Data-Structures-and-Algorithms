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

  function remove(el, node=root) {
    if(node == null) return;
    if (el > node.data) {
      if (el === node.right.data && !node.right.left && !node.right.right) {
        node.right = null;
      } remove(el, node.right);
    } else {
      if (el === node.left.data && !node.left.left && !node.left.right) {
        node.left = null;
      } remove(el, node.left);
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
for (let i = 0; i < 10; i++) {
  smaple[i] = i + 1;
}

const dataTree = Tree(smaple);

prettyPrint(dataTree.root)