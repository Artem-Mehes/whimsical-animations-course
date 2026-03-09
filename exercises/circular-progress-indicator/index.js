import { normalize } from "../../utils";

const slider = document.querySelector("#progressSlider");
const bigNumber = document.querySelector(".bigNumber");
const progressIndicator = document.querySelector(".progressIndicator");

const radius = progressIndicator.getAttribute("r");
const circumference = Math.ceil(2 * Math.PI * radius);
progressIndicator.style.strokeDasharray = `${circumference}px, 1000px`;
progressIndicator.style.strokeDashoffset = `${circumference}px`;

function handleChange(ev) {
	const progress = Number(ev.target.value);

	const circleNumber = normalize(
		progress,
		{
			min: 0,
			max: 100,
		},
		{
			min: 0,
			max: +circumference,
		},
	);
	progressIndicator.style.strokeDashoffset = `${circleNumber}px`;

	bigNumber.innerText = progress + "%";
}

slider.addEventListener("input", handleChange);
