import { random, range } from "lodash";

export function init() {
	const btn = document.querySelector(".starry-night-particle-button");
	const container = document.querySelector(".starry-night-container");

	btn.addEventListener("click", () => {
		// TODO: Generate stars on click!
		// Here’s the emoji to use: ⭐

		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;

		range(10).forEach(() => {
			const starElement = document.createElement("span");
			starElement.classList.add("starry-night-star");
			starElement.innerText = "⭐";

			const x = random(0, containerWidth);
			const y = random(0, containerHeight);

			starElement.style.top = y + "px";
			starElement.style.left = x + "px";

			container.appendChild(starElement);
		});
	});
}
