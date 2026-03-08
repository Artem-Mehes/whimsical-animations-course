import { animate } from "motion";

const button = document.querySelector("button");
const path = button.querySelector("path");

let isPlaying = false;

function handleClick() {
	const prefersReducedMotion = checkPrefersReducedMotion();

	isPlaying = !isPlaying;

	animate(
		path,
		{
			d: isPlaying
				? `
        M 4,4
        L 20,4
        L 20,20
        L 4,20
        Z
      `
				: `
        M 5,3
        L 19,12
        L 19,12
        L 5,21
        Z
      `,
		},
		prefersReducedMotion
			? { duration: 0 }
			: {
					type: "spring",
					stiffness: 300,
					damping: isPlaying ? 15 : 30,
				},
	);
}

button.addEventListener("click", handleClick);

function checkPrefersReducedMotion() {
	return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}
