import React from "react";

export default function square({ value, i, onClick }) {
	return (
		<button className="square" onClick={() => onClick(i)}>
			{value}
		</button>
	);
}
