function Node(data) {
    return { data, left: null, right: null };
}

function Tree(array) {
    const root = buildTree(array);

    return root;

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
for (let i = 0; i < 200; i++) {
    smaple[i] = i + 1;
}

const dataTree = Tree(smaple);

prettyPrint(dataTree)