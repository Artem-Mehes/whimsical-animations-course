// Configuration for all exercises
// Add new exercises here to make them appear in the sidebar

const exercisesList = [
	"like-button",
	"starry-night",
	"shimmer-particle",
	"containment-strategies",
	"falling-emoji",
	"rotate-amount",
	"bouncing-balls",
	"magic-wand",
	"rocketship",
	"mouse-position",
	"shifting-background",
];

function titleCase(str) {
	return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export const exercises = exercisesList.map((exercise) => ({
	title: titleCase(exercise),
	id: exercise,
}));
