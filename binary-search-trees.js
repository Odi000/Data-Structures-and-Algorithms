function Node(data) {
	return { data, left: null, right: null };
}

function Tree(array) {
	const root = buildTree(array);

	return { root, insert, remove, find, levelOrder, levelOrderRec };

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

		if (node === root && node.data === el) {
			checkForChilds(node);
		} else if (el > node.data) {
			side = "right";
			if (el === node[side].data) {
				if (!checkForChilds(node[side])) node[side] = null;
			} else remove(el, node[side]);
		} else {
			if (el === node[side].data) {
				if (!checkForChilds(node[side])) node[side] = null;
			} else remove(el, node[side]);
		}

		//function call
		function checkForChilds(node) {
			if (node.left && node.right) {
				//Has two childs
				const nextBiggestNode = findNextBiggestNode(node.right);

				if (nextBiggestNode.child) {
					node.data = nextBiggestNode.child.data;
					if (!checkForChilds(nextBiggestNode.child)) {
						nextBiggestNode.parent.left = null;
					}
				}
				else {
					node.data = nextBiggestNode.parent.data;
					if (!checkForChilds(nextBiggestNode.parent)) {
						node.right = null;
					}
				}
				return true

				function findNextBiggestNode(node) {
					if (!node.left) return { 'parent': node, 'child': null };
					if (!node.left.left) return { 'parent': node, 'child': node.left }
					return findNextBiggestNode(node.left);
				}
			} else if (node.left || node.right) {
				//Has one child
				const childNode = node.left ? node.left : node.right;
				node.data = childNode.data;
				node.left = null;
				node.right = null;
				return true
			} else return false; //No child is outside this func
		}
	}

	function find(data, node = root) {
		const msg = "Data is not part of the tree";
		if (node.data === data) return node;
		else if (data > node.data) {
			if (node.right) return find(data, node.right);
			else return msg;
		}
		else {
			if (node.left) return find(data, node.left);
			else return msg;
		}
	}

	function levelOrder(callback){
		const queue = [root];
		const nodesByLevel = [];

		while(queue.length){
			if(queue[0].left) queue.push(queue[0].left);
			if(queue[0].right) queue.push(queue[0].right);
			nodesByLevel.push(queue.shift());
		}

		if(callback) return callback(nodesByLevel);
		else return nodesByLevel;
	}

	function levelOrderRec(callback){
		const queue = [root];
		const nodesByLevel = [];

		recurse(queue);

		function recurse(queue){
				if(queue[0].left) queue.push(queue[0].left);
				if(queue[0].right) queue.push(queue[0].right);
				nodesByLevel.push(queue.shift());
				if(queue.length) recurse(queue);
		}
		return nodesByLevel;
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


// Testing the code:
let smaple = [];
for (let i = 0; i < 11; i++) {
	smaple[i] = i + 1;
}

const dataTree = Tree(smaple);

prettyPrint(dataTree.root)
// console.log(" \n\n ");
// dataTree.remove(1);
// prettyPrint(dataTree.root);

console.log(dataTree.find(12))