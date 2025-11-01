import { random } from "lodash";

export function init() {
	const emojis = ["🎉", "👍", "☕", "🎊", "🎉", "💸", "☕"];

	const emojiWrapper = document.querySelector(".emojiWrapper");

	emojis.forEach((emoji) => {
		const emojiContainer = document.createElement("div");
		emojiContainer.className = "emoji";
		emojiContainer.textContent = emoji;

		const randomDuration = random(1200, 2200);
		emojiContainer.style.animationDuration = `${randomDuration}ms`;
		const randomDelay = random(50, 500);
		emojiContainer.style.animationDelay = `${randomDelay}ms`;

		emojiWrapper.appendChild(emojiContainer);
	});
}
