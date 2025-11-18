let mouseenterHandler = null;
let focusHandler = null;

export function init() {
	const btn = document.querySelector(".buyButton");

	if (!btn) {
		console.error("Button element not found");
		return;
	}

	// Remove existing event listeners if they exist (from previous init calls)
	if (mouseenterHandler) {
		btn.removeEventListener("mouseenter", mouseenterHandler);
	}
	if (focusHandler) {
		btn.removeEventListener("focus", focusHandler);
	}

	const ANIMATION_DURATION = 1000;

	function generateShimmer() {
		const isMotionEnabled = window.matchMedia(
			"(prefers-reduced-motion: no-preference)",
		).matches;

		if (!isMotionEnabled) {
			return;
		}

		const shimmer = document.createElement("span");
		shimmer.classList.add("shimmer");

		shimmer.style.animationDuration = ANIMATION_DURATION + "ms";

		btn.appendChild(shimmer);

		setTimeout(() => {
			shimmer.remove();
		}, ANIMATION_DURATION + 200);
	}

	mouseenterHandler = generateShimmer;
	focusHandler = generateShimmer;

	btn.addEventListener("mouseenter", mouseenterHandler);
	btn.addEventListener("focus", focusHandler);
}

export function cleanup() {
	const btn = document.querySelector(".buyButton");
	if (btn) {
		if (mouseenterHandler) {
			btn.removeEventListener("mouseenter", mouseenterHandler);
		}
		if (focusHandler) {
			btn.removeEventListener("focus", focusHandler);
		}
	}
	mouseenterHandler = null;
	focusHandler = null;
}
