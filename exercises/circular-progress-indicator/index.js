import { normalize } from "../../utils";

const slider = document.querySelector("#progressSlider");
const bigNumber = document.querySelector(".bigNumber");
const progressIndicator = document.querySelector(".progressIndicator");

function handleChange(ev) {
	const progress = Number(ev.target.value);

	bigNumber.innerText = progress + "%";

	progressIndicator.style.strokeDashoffset = normalize(
		progress,
		{
			min: 0,
			max: 100,
		},
		{
			min: 100,
			max: 0,
		},
	);
}

slider.addEventListener("input", handleChange);
