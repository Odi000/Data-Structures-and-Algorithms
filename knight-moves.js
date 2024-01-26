
class Node {
    constructor(data) {
        this.data = data;
        this.edges = []
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
}

/*-- Matrix solution
class KnightMoves {
    constructor(board) {
        this.chart = buildChart();

        function buildChart() {
            const chart = {};

            board.forEach(el => {
                const key = el.toString();
                const currentX = el[0];
                const currentY = el[1];

                chart[key] = [];

                for (let i = 0; i < board.length; i++) {
                    const nextX = board[i][0];
                    const nextY = board[i][1];

                    if (currentX - 2 === nextX && currentY - 1 === nextY) chart[key].push(1);
                    else if (currentX - 1 === nextX && currentY - 2 === nextY) chart[key].push(1);
                    else if (currentX + 1 === nextX && currentY - 2 === nextY) chart[key].push(1);
                    else if (currentX + 2 === nextX && currentY - 1 === nextY) chart[key].push(1);
                    else if (currentX + 2 === nextX && currentY + 1 === nextY) chart[key].push(1);
                    else if (currentX + 1 === nextX && currentY + 2 === nextY) chart[key].push(1);
                    else if (currentX - 1 === nextX && currentY + 2 === nextY) chart[key].push(1);
                    else if (currentX - 2 === nextX && currentY + 1 === nextY) chart[key].push(1);
                    else chart[key].push(0);
                }
            });

            return chart;
        }
    }
}
*/

function getBoardCoordinates() {
    const board = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board.push([i, j]);
        }
    }
    return board;
}

function getBoardCoordinates_Recursion() {
    const mainArr = [];
    recurse();
    function recurse(coordinates = [0, 0]) {
        if (coordinates[0] === 7 && coordinates[1] === 7) {
            return mainArr.push(coordinates);
        }
        if (coordinates[1] === 7) {
            mainArr.push(coordinates);
            return recurse([coordinates[0] + 1, 0]);
        }
        if (coordinates[1] < 8) {
            mainArr.push(coordinates);
            return recurse([coordinates[0], coordinates[1] + 1]);
        }
    }
    return mainArr;
}

function example(arr) {
    if (arr[1] === 3) return [arr];
    if (arr[1] < 3) arr[i]++;
    const board = example(arr);
}

const graph = new KnightMoves(getBoardCoordinates());