import { normalize } from "../../utils";

let pointermoveHandler = null;

export function init() {
	const valueHorizontal = document.querySelector(".value.h");
	const valueVertical = document.querySelector(".value.v");

	pointermoveHandler = (event) => {
		const x = event.clientX;
		const y = event.clientY;

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		const normalizedX = normalize(
			x,
			{
				min: 0,
				max: windowWidth,
			},
			{
				min: 0,
				max: 100,
			},
		);

		const normalizedY = normalize(
			y,
			{
				min: 0,
				max: windowHeight,
			},
			{
				min: 0,
				max: 100,
			},
		);

		valueHorizontal.innerText = Math.round(normalizedX) + "%";
		valueVertical.innerText = Math.round(normalizedY) + "%";
	};

	window.addEventListener("pointermove", pointermoveHandler);
}

export function cleanup() {
	window.removeEventListener("pointermove", pointermoveHandler);
	pointermoveHandler = null;
}
