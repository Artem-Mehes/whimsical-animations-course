import { random, range } from "lodash";
import { convertPolarToCartesian } from "../../utils";

let clickHandler;

export function init() {
	const container = document.querySelector(".container");

	const fadeDuration = 1000;
	const fadeDelay = 300;

	clickHandler = (event) => {
		const x = event.clientX;
		const y = event.clientY;

		const particles = [];

		range(5).forEach(() => {
			const particle = document.createElement("img");
			particles.push(particle);
			particle.setAttribute("alt", "");
			particle.setAttribute(
				"src",
				"https://sandpack-bundler.vercel.app/img/wand-sparkle.svg",
			);
			particle.classList.add("star");
			particle.style.top = y + "px";
			particle.style.left = x + "px";

			const angle = random(225 - 20, 225 + 20);
			const distance = random(30, 60);

			const coordinates = convertPolarToCartesian(angle, distance);

			const rotation = random(90, 360);

			particle.style.setProperty("--x", coordinates[0] + "px");
			particle.style.setProperty("--y", coordinates[1] + "px");
			particle.style.setProperty("--rotation", rotation + "deg");

			particle.style.setProperty("--fade-duration", fadeDuration + "ms");
			particle.style.setProperty("--fade-delay", fadeDelay + "ms");

			container.appendChild(particle);
		});

		setTimeout(
			() => {
				particles.forEach((particle) => {
					particle.remove();
				});
			},
			fadeDuration + fadeDelay + 200,
		);
	};

	window.addEventListener("click", clickHandler);
}

export function cleanup() {
	if (clickHandler) {
		window.removeEventListener("click", clickHandler);
		clickHandler = null;
	}
}
