import { normalize, clampedNormalize } from "../../utils";

export function init() {
	const slider = document.querySelector("#slider");
	const box = document.querySelector(".box");

	/*
  The requirements:

  • “skew” should range from 25° to 0°
  • “rotate” should range from 225° to -45°
  • “radius” should range from 50% to 5%
  • “scaleY” should grow from 0.01 to 1 over the
    *first half* of the range. When “value” is
    50+, scale should stay at 1.
  • “boxHue” should stay at 0° for the first half
    of the range, and then scale from 0° to 45°
    over the *second half* of the range.
  • “bgLightness” should stay at 6% for the first 75%
    of the range, and then scale from 6% to 26%
    over the final 25% of the range.
*/

	function transformBox(value) {
		// TODO: use `normalize` to derive these parameters.
		// `value` is a number between 0 and 100.
		const skew = normalize(
			value,
			{ min: 0, max: 100 },
			{
				min: 25,
				max: 0,
			},
		);
		const rotate = normalize(
			value,
			{ min: 0, max: 100 },
			{
				min: 225,
				max: -45,
			},
		);
		const radius = normalize(
			value,
			{ min: 0, max: 100 },
			{
				min: 50,
				max: 5,
			},
		);
		const scaleY = clampedNormalize(
			value,
			{ min: 0, max: 50 },
			{
				min: 0.01,
				max: 1,
			},
		);
		const boxHue = clampedNormalize(
			value,
			{ min: 50, max: 100 },
			{
				min: 0,
				max: 45,
			},
		);
		const bgLightness = clampedNormalize(
			value,
			{ min: 75, max: 100 },
			{
				min: 6,
				max: 26,
			},
		);

		console.log("bgLightness", bgLightness);

		// No changes necessary below this point.
		box.style.transform = `
    scaleY(${scaleY})
    rotate(${rotate}deg)
    skewX(${skew}deg)
  `;
		box.style.borderRadius = radius + "%";
		box.style.backgroundColor = `hsl(${boxHue}deg 100% 60%)`;

		document.body.style.backgroundColor = `hsl(210deg 15% ${bgLightness}%)`;
	}

	slider.addEventListener("input", (event) => {
		const value = Number(event.target.value);

		transformBox(value);
	});

	// Initialize the box based on an initial value of 0:
	transformBox(0);
}
