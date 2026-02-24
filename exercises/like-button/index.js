import { random, range } from "lodash";
import { convertPolarToCartesian, normalize } from "../../utils";

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
	const MIN_DISTANCE = 32;
	const MAX_DISTANCE = 64;
	const MIN_FADE_DURATION = 1000 - 500;
	const MAX_FADE_DURATION = 1000 + 500;
	const FADE_DELAY = 500;
	const JITTER = 20;
	const NUM_OF_PARTICLES = 20;
	const PARTICLE_DELAY = 150;

	btn.style.setProperty("--pop-circle-duration", PARTICLE_DELAY + "ms");

	clickHandler = () => {
		btn.classList.toggle("liked");

		if (!btn.classList.contains("liked")) {
			return;
		}

		// We'll collect all freshly-created particles in this array:
		const particles = [];

		range(NUM_OF_PARTICLES).forEach((index) => {
			const particle = document.createElement("span");
			particle.classList.add("particle");

			particle.style.backgroundColor = `hsl(${random(0, 359)}deg 90% 85%)`;
			particle.style.setProperty("--hue-rotation", "720deg");

			let angle = normalize(
				index,
				{ min: 0, max: NUM_OF_PARTICLES },
				{ min: 0, max: 360 },
			);
			angle += random(-JITTER, JITTER);

			const distance = random(MIN_DISTANCE, MAX_DISTANCE);

			// Convert polar to cartesian here, using the
			// provided utility functions
			const [x, y] = convertPolarToCartesian(angle, distance);

			// Everything else stays the same
			particle.style.setProperty("--x", x + "px");
			particle.style.setProperty("--y", y + "px");

			particle.style.setProperty(
				"--fade-duration",
				`${normalize(distance, { min: MIN_DISTANCE, max: MAX_DISTANCE }, { min: MIN_FADE_DURATION, max: MAX_FADE_DURATION }) + random(-200, 200)}ms`,
			);
			particle.style.setProperty(
				"--disperse-duration",
				`${normalize(distance, { min: MIN_DISTANCE, max: MAX_DISTANCE }, { min: 300, max: 700 }) + random(-200, 200)}ms`,
			);
			particle.style.setProperty(
				"--fade-delay",
				`${normalize(distance, { min: MIN_DISTANCE, max: MAX_DISTANCE }, { min: 0, max: FADE_DELAY }) + random(0, 200)}ms`,
			);
			particle.style.setProperty("--size", `${random(8, 16)}px`);
			particle.style.setProperty("--twinkle-duration", `${random(150, 300)}ms`);
			particle.style.setProperty("--twinkle-amount", `${random(0.5, 1, true)}`);

			// Keep track of this particle, so that it can be cleaned up:
			particles.push(particle);
		});

		// Wait a short while before adding those particles
		// to the button, using our new PARTICLE_DELAY constant:
		window.setTimeout(() => {
			particles.forEach((particle) => {
				btn.appendChild(particle);
			});
		}, PARTICLE_DELAY);

		// Schedule a timeout that will destroy all freshly-created
		// particles after the animation has completed:
		window.setTimeout(
			() => {
				particles.forEach((particle) => {
					particle.remove();
				});

				// We add 200ms to really be 100% sure that the cleanup
				// function won't interrupt the fade-out animation:
			},
			FADE_DURATION + FADE_DELAY + PARTICLE_DELAY + 200 + 200,
		);
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
