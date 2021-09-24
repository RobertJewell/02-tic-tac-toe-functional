import React, { useState } from "react";
import Board from "./Board";
import "../index.css";

export default function Game() {
	const [history, setHistory] = useState([
		{
			squares: Array(9).fill(null),
		},
	]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setxIsNext] = useState(true);

	const handleClick = (i) => {
		const newHistory = history.slice(0, stepNumber + 1);
		const current = history[newHistory.length - 1];
		const squares = [...current.squares];
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? "X" : "O";
		setHistory(
			newHistory.concat([
				{
					squares: squares,
				},
			])
		);
		setStepNumber(newHistory.length);
		setxIsNext(!xIsNext);
	};

	const jumpTo = (step) => {
		setStepNumber(step);
		setxIsNext(step % 2 === 0);
	};

	const current = history[stepNumber];
	const winner = calculateWinner(current.squares);

	const moves = history.map((step, move) => {
		/*  
           Ternary operators so much prettier if you can keep them on one line 
           This is entirely my opinion, so worth ignoring
           I've replaced the string concatination with template literals across this project
           If nothing else it avoids missing a space when adding things together
           */
		const desc = move ? `Go to move ${move}` : "Go to game start";
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = `Winner is ${winner}`;
	} else {
		status = `Next player is ${xIsNext ? "X" : "O"}`;
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={current.squares} onClick={(i) => handleClick(i)} />
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

// ========================================

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		/* 
        If squares[a] is not falsy (null in this case) and is equal to the value of squares[b] and squares[c]
        If we later want to expand the board to be x by x (defined by the user) 
        we could use array.every and compare every value to the current players symbol (X or O).
        We would also need to replace this function with array traversal where we "walk" across the array in different directions as the size of the board would be arbitrary.
        */
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
