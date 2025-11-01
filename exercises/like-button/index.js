import { random, range } from "lodash";

let clickHandler = null;

export function init() {
	const btn = document.querySelector(".particleButton");

	if (!btn) {
		console.error("Button element not found");
		return;
	}

	// Remove existing event listener if it exists (from previous init calls)
	if (clickHandler) {
		btn.removeEventListener("click", clickHandler);
	}

	// Our "source of truth" for the animation's fade duration.
	// This ensures that the cleanup timeout will never fire
	// before the animation has completed.
	const FADE_DURATION = 1000;
	const MAGNITUDE = 48;

	clickHandler = () => {
		btn.classList.toggle("liked");

		if (!btn.classList.contains("liked")) {
			return;
		}

		// We'll collect all freshly-created particles in this array:
		const particles = [];

		range(5).forEach(() => {
			const particle = document.createElement("span");
			particle.classList.add("particle");

			const x = random(-MAGNITUDE, MAGNITUDE);
			const y = random(-MAGNITUDE, MAGNITUDE);
			particle.style.transform = `translate(${x}px, ${y}px)`;

			particle.style.setProperty("--fade-duration", `${FADE_DURATION}ms`);

			btn.appendChild(particle);

			// Keep track of this particle, so that it can be cleaned up:
			particles.push(particle);
		});

		// Schedule a timeout that will destroy all freshly-created
		// particles after the animation has completed:
		window.setTimeout(() => {
			particles.forEach((particle) => {
				particle.remove();
			});

			// We add 200ms to really be 100% sure that the cleanup
			// function won't interrupt the fade-out animation:
		}, FADE_DURATION + 200);
	};

	btn.addEventListener("click", clickHandler);
}

export function cleanup() {
	const btn = document.querySelector(".particleButton");
	if (clickHandler && btn) {
		btn.removeEventListener("click", clickHandler);
		clickHandler = null;
	}
}
