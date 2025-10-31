import { random, range } from "lodash";

let clickHandler = null;

export function init() {
	const btn = document.querySelector(".starry-night-particle-button");
	const container = document.querySelector(".starry-night-container");

	if (!btn || !container) {
		console.error("Button or container element not found");
		return;
	}

	// Remove existing event listener if it exists (from previous init calls)
	if (clickHandler) {
		btn.removeEventListener("click", clickHandler);
	}

	clickHandler = () => {
		// TODO: Generate stars on click!
		// Here's the emoji to use: ⭐

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
	};

	btn.addEventListener("click", clickHandler);
}

export function cleanup() {
	const btn = document.querySelector(".starry-night-particle-button");
	if (clickHandler && btn) {
		btn.removeEventListener("click", clickHandler);
		clickHandler = null;
	}
}
