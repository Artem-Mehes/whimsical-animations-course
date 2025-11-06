import { random, sample } from "lodash";
import { convertPolarToCartesian } from "../../utils";

export function init() {
	const FADE_DURATION = 500;
	const FADE_DELAY = 500;

	const COLORS = [
		"hsl(35deg 100% 50%)",
		"hsl(40deg 100% 50%)",
		"hsl(45deg 100% 60%)",
		"hsl(50deg 100% 65%)",
	];

	const wrapper = document.querySelector(".rocketWrapper");

	window.setInterval(() => {
		const particle = document.createElement("div");
		particle.classList.add("particle");
		particle.style.backgroundColor = sample(COLORS);

		const angle = random(90 - 30, 90 + 30);
		const distance = random(45, 80);

		const [x, y] = convertPolarToCartesian(angle, distance);

		particle.style.setProperty("--x", x + "px");
		particle.style.setProperty("--y", y + "px");

		particle.style.setProperty("--fade-duration", FADE_DURATION + "ms");
		particle.style.setProperty("--fade-delay", FADE_DELAY + "ms");

		wrapper.prepend(particle);

		setInterval(
			() => {
				particle.remove();
			},
			FADE_DURATION + FADE_DELAY + 200,
		);
	}, 100);
}
