import { normalize } from "../../utils";

let pointermoveHandler = null;

const container = document.querySelector(".container");

export function init() {
	pointermoveHandler = (event) => {
		const x = event.clientX;
		const y = event.clientY;

		console.log("x", x);

		// TODO: hue should range between 50deg and 200deg, from
		// left to right, based on “x” position:
		const hue = normalize(
			x,
			{
				min: 0,
				max: container.clientWidth,
			},
			{
				min: 50,
				max: 200,
			},
		);

		// TODO: saturation should range between 100% and 25%,
		// from top to bottom, based on “y” position:
		const saturation = normalize(
			y,
			{
				min: 0,
				max: container.clientHeight,
			},
			{
				min: 100,
				max: 25,
			},
		);

		const background = `hsl(${hue}deg ${saturation}% 75%)`;
		container.style.background = background;
	};

	container.addEventListener("pointermove", pointermoveHandler);
}

export function cleanup() {
	container.removeEventListener("pointermove", pointermoveHandler);
	pointermoveHandler = null;
}
