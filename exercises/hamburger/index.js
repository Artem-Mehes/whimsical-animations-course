import { animate } from "motion";

const button = document.querySelector("button");
const _line1 = button.querySelector("line:first-child");
const _line2 = button.querySelector("line:last-child");

let isMenuOpen = false;

function handleClick() {
	isMenuOpen = !isMenuOpen;

	const prefersReducedMotion = _checkPrefersReducedMotion();

	const options = {
		duration: prefersReducedMotion ? 0 : undefined,
	}

	animate(_line1, {
		y1: isMenuOpen ? 6 : 8,
		y2: isMenuOpen ? 18 : 8,
	}, options);

	animate(_line2, {
		y1: isMenuOpen ? 18 : 16,
		y2: isMenuOpen ? 6 : 16,
	}, options);
}

button.addEventListener("click", handleClick);

function _checkPrefersReducedMotion() {
	return !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
}

/*
  Motion Cheatsheet:
  
  animate() is the main function we’ll be using.
  It takes two arguments:
  
  1. The element to animate
  2. An object of the properties/values to change.
  
  For example:
  
    animate(
      button,
      { opacity: 0 }
    );
*/
