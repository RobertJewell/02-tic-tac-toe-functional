import React from "react";
import Square from "./Square";
import "../index.css";

export default function Board({ squares, onClick }) {
	return (
		<div className="board">
			{squares.map((value, i) => (
				<Square key={i} value={squares[i]} onClick={() => onClick(i)} />
			))}
		</div>
	);
}
