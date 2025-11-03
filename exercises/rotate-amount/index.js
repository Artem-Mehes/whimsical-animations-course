const slider = document.querySelector("#slider");
const bar = document.querySelector(".bar");

slider.addEventListener("input", (event) => {
	const rotation = event.target.value;

	bar.style.setProperty("--rotation", `${rotation}deg`);
});
