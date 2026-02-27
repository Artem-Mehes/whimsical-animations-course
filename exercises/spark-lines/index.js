import { normalize } from "../../utils";

const SVG_WIDTH = 200;
const SVG_HEIGHT = 100;

// `values` is an array of numbers.
// Those numbers range from 0 to 20 (0 being the lowest possible
// value, corresponding to the bottom of the SVG).
function drawSparkLine(svg, values) {
	svg.setAttribute("width", SVG_WIDTH);
	svg.setAttribute("height", SVG_HEIGHT);

	// TODO: calculate `pointsString`.
	// This should be a string in the format of:
	// "x1,y1 x2,y2 x3,y3 ..."
	const valuesCount = values.length;
	const maxValue = Math.max(...values);
	const pointsString = values.map((v, i) => {
		const y = normalize(
			v,
			{
				min: maxValue,
				max: 0,
			},
			{
				min: 0,
				max: SVG_HEIGHT,
			},
		);

		const x = normalize(
      i,
      {
        min: 0,
        max: valuesCount - 1,
      },
      {
        min: 0,
        max: SVG_WIDTH
      }
    );

		return `${x} ${y}`;
	});

	const polyline = svg.querySelector("polyline");
	polyline.setAttribute("points", pointsString);
}

const DATA = [
	0, 5, 12, 11, 18, 5, 2, 13, 13, 19, 20, 15, 14, 5, 6, 9, 1, 16, 20, 10, 16,
];

drawSparkLine(document.querySelector("svg"), DATA);
