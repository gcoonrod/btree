/**
 * btree.js
 *
 * Author: greg.coonrod@gmail.com
 * Purpose: Define a basic binary tree and implement a least common ancestor function.
 * Usage: node btree.js
 */

/**
 * GLOBALS
 */

//Create all of the node elements in the tree
var root = new Node(null, 'head', null, null);
var node1 = new Node(root, 'node1', null, null);
var leaf4 = new Node(root, 'leaf4', null, null);
var node2 = new Node(node1, 'node2', null, null);
var leaf3 = new Node(node1, 'leaf3', null, null);
var leaf1 = new Node(node2, 'leaf1', null, null);
var leaf2 = new Node(node2, 'leaf2', null, null);

//Link up the nodes
root.left = leaf4;
root.right = node1;

node1.left = leaf3;
node1.right = node2;

node2.left = leaf2;
node2.right = leaf1;

/**
 * MAIN
 */

//Find the least common ancestor between leaf1 and leaf3
var commonParent = ParentFinder(leaf1, leaf3);
//Report the results
console.log(commonParent.value);

/**
 * FUNCTIONS AND CLASSES
 */

/**
 * Creates instance of Node
 *
 * @constructor
 * @this {Node}
 * @param {Node} parent The parent Node if it exists
 * @param {String} value The name of the Node
 * @param {Node} left Left child Node
 * @param {Node} right Right child Node
 */
function Node(parent, value, left, right) {
	this.parent = parent;
	this.value = value;
	this.left = left;
	this.right = right;
}

/**
 * Finds the least common ancestor for the two given Nodes
 * 
 * @param {Node} node1 First search node
 * @param {Node} node2 Second search node
 * @return {Node} The least common ancestor node
 */
function ParentFinder(node1, node2) {
	//Declare some containers
	var prevNode;
	var node1Parents = new Array();
	var node2Parents = new Array();

	//Collect all of the parents of node1
	while (node1 != null) {
		node1Parents.push(node1);
		node1 = node1.parent;
	}

	//Collect all of the parents of node2
	while (node2 != null) {
		node2Parents.push(node2);
		node2 = node2.parent;
	}

	//node1 and node2 should both be the root node at this point
	//so long as they remain equal while we pop elements off the parent arrays
	//they still have common ancestry
	while (node1 == node2 && node1Parents.length > 0 && node2Parents.length > 0) {
		prevNode = node1;
		node1 = node1Parents.pop();
		node2 = node2Parents.pop();
	}

	//If node1 and node2 are still equal return node1 
	//otherwise return the previous node
	if (node1 == node2) {
		return node1;
	} else return prevNode;

}