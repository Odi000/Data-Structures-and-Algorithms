
class Node {
    constructor(data) {
        this.data = data;
        this.edges = [];
    }
}

class KnightMoves {
    constructor(board) {
        board.forEach(square => {
            this[square] = new Node();
            this[square].data = square;

            const currentX = square[0];
            const currentY = square[1];

            for (const el of board) {
                const nextX = el[0];
                const nextY = el[1];

                if (currentX - 2 === nextX && currentY - 1 === nextY) this[square].edges.push(el);
                else if (currentX - 1 === nextX && currentY - 2 === nextY) this[square].edges.push(el);
                else if (currentX + 1 === nextX && currentY - 2 === nextY) this[square].edges.push(el);
                else if (currentX + 2 === nextX && currentY - 1 === nextY) this[square].edges.push(el);
                else if (currentX + 2 === nextX && currentY + 1 === nextY) this[square].edges.push(el);
                else if (currentX + 1 === nextX && currentY + 2 === nextY) this[square].edges.push(el);
                else if (currentX - 1 === nextX && currentY + 2 === nextY) this[square].edges.push(el);
                else if (currentX - 2 === nextX && currentY + 1 === nextY) this[square].edges.push(el);
            }
        })
    }

    to(start, end) {
        const errorMsg = "Invalid Coordinates";
        if (!start || !end) return console.log(errorMsg);
        if (start[0] < 0 || start[0] > 7) return console.log(errorMsg);
        if (start[1] < 0 || start[1] > 7) return console.log(errorMsg);
        if (end[0] < 0 || end[0] > 7) return console.log(errorMsg);
        if (end[1] < 0 || end[1] > 7) return console.log(errorMsg);

        const queue = [this[start]];
        let queueSize = 0;

        while (queue) {
            if (queue[0] === this[end]) {
                return console.log(`Found it ${queue[0].data}`);
            }

            queue.shift().edges.forEach(edge => queue.push(this[edge]));
            if(queue.length>queueSize){
                queueSize = queue.length;
                console.log(queueSize);
            }
        }
    }
}


function getBoardCoordinates() {
    const board = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board.push([i, j]);
        }
    }
    return board;
}

function getBoardCoordinates_Recursion(board = [], coordinates = [0, 0]) {
    if (coordinates[0] === 7 && coordinates[1] === 7) {
        return board.push(coordinates);
    }
    if (coordinates[1] === 7) {
        board.push(coordinates);
        return getBoardCoordinates_Recursion(board, [coordinates[0] + 1, 0]);
    }
    if (coordinates[1] < 8) {
        board.push(coordinates);
        getBoardCoordinates_Recursion(board, [coordinates[0], coordinates[1] + 1]);
    }
    return board;
}

const chessBoard = new KnightMoves(getBoardCoordinates());