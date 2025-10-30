export function init() {
	const btn = document.querySelector(".buyButton");

  const ANIMATION_DURATION = 500;

	function generateShimmer() {
		const shimmer = document.createElement("span");
		shimmer.classList.add("shimmer");

    shimmer.style.animationDuration = ANIMATION_DURATION + 'ms';

		btn.appendChild(shimmer);

    setTimeout(() => {
      shimmer.remove();
    }, ANIMATION_DURATION + 200)
	}

	btn.addEventListener("mouseenter", generateShimmer);
	btn.addEventListener("focus", generateShimmer);
}

/*
  DOM manipulation cheatsheet:
  
  - Set an inline style:
    `element.style.backgroundColor = "white";`
  - Destroy an element:
    `element.remove();`
*/
