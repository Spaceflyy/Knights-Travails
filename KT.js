const gameBoard = [];
const validMoves = [
	[-1, -2],
	[1, -2],
	[-2, -1],
	[2, -1],
	[-1, 2],
	[-2, 1],
	[1, 2],
	[2, 1],
];

const square = (x, y) => {
	const possibleMoves = [];
	const setUpAdjList = () => {
		validMoves.forEach((move) => {
			if (
				x + move[0] <= 7 &&
				x + move[0] >= 0 &&
				y + move[1] <= 7 &&
				y + move[1] >= 0
			) {
				gameBoard.forEach((space) => {
					if (space.x === x + move[0] && space.y === y + move[1]) {
						possibleMoves.push(space);
					}
				});
			}
		});
	};
	return { x, y, possibleMoves, setUpAdjList };
};

for (let i = 7; i >= 0; i--) {
	for (let j = 0; j < 8; j++) {
		const a = square(j, i);
		gameBoard.push(a);
	}
}
gameBoard.forEach((sq) => {
	sq.setUpAdjList();
});

const bfs = (start, endNode) => {
	const queue = [];
	const visted = [];
	const prev = [];
	queue.push(start);
	visted.push(start);

	while (queue.length !== 0) {
		const node = queue.shift();
		const neighbours = node.possibleMoves;

		if (node === endNode) {
			prev.push(node);
			return prev;
		}

		neighbours.forEach((n) => {
			if (!visted.includes(n)) {
				queue.push(n);
				visted.push(n);
				if (!prev.includes(node)) {
					prev.push(node);
				}
			}
		});
	}
	return prev;
};

const buildPath = (arr) => {
	let path = [];
	path.push(arr[arr.length - 1]);
	let neighbours = arr[arr.length - 1].possibleMoves;
	for (let i = arr.length - 1; i >= 0; i -= 1) {
		for (let j = 0; j < neighbours.length; j++) {
			if (neighbours[j] === arr[i]) {
				path.push(neighbours[j]);
				neighbours = neighbours[j].possibleMoves;
			}
		}
	}
	path = path.reverse();
	return path;
};

const knightMoves = (startPos, endPos) => {
	if (startPos[0] === endPos[0] && startPos[1] === endPos[1]) {
		return "The knight is already here!";
	}

	const startIndex = gameBoard.findIndex(
		(x) => x.x === startPos[0] && x.y === startPos[1]
	);
	const endIndex = gameBoard.findIndex(
		(x) => x.x === endPos[0] && x.y === endPos[1]
	);
	const prev = bfs(gameBoard[startIndex], gameBoard[endIndex]);
	const path = buildPath(prev);
	const newpath = [];

	path.forEach((element) => {
		newpath.push(`[${element.x}, ${element.y}]`);
	});

	return `The shortest path from [${startPos}] to [${endPos}] is ${newpath}`;
};

console.log(knightMoves([3, 3], [0, 0]));
