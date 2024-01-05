class Node {
    constructor(value) {
        this.value = null;
        this.pointer = null;
    }
}

class LinkedList {
    counter = 0;

    append(value) {
        const newNode = new Node();

        newNode.value = value;
        if (this.counter >= 1) this[this.counter - 1].pointer = newNode;
        this[this.counter++] = newNode;
    }

    prepend(value) {
        const newNode = new Node();

        newNode.value = value;
        if (this.counter == 0) {
            return this[this.counter++] = newNode;
        }
        for (let i = this.counter++; i >= 0; i--) {
            if (i === 0) {
                this[i] = newNode;
                newNode.pointer = this[i + 1];
            }
            else {
                this[i] = this[i - 1];
            }
        }
    }

    get size() {
        return this.counter;
    }

    get head() {
        return this[0];
    }

    get tail() {
        return this[this.counter - 1];
    }

    at(index) {
        return this[index];
    }

    pop() {
        delete this[this.counter - 1];
        this[this.counter - 2].pointer = null;
        this.counter--;
    }

    contains(value) {
        let result = false;
        for (let i = 0; i < this.counter; i++) {
            if (value === this[i].value) result = true;
        } return result;
    }

    find(value) {
        for (let i = 0; i < this.counter; i++) {
            if (value === this[i].value) return i;
        } return null;
    }

    toString(node = this[0]) {
        if (node === null) return "";

        let string = `(${node.value})`;
        if (node.pointer) string += " -> " + this.toString(node.pointer);
        return string;
    }
}