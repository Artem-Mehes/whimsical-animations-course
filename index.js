import { exercises } from "./exercises/exercises-config.js";

let cleanupFunction = null;

// Initialize the app
function init() {
	renderSidebar();

	// Load first exercise by default or from URL hash
	const hash = window.location.hash.slice(1);
	const exerciseToLoad = exercises.find((ex) => ex.id === hash) || exercises[0];

	if (exerciseToLoad) {
		loadExercise(exerciseToLoad.id);
	}

	// Handle browser back/forward
	window.addEventListener("hashchange", () => {
		const exerciseId = window.location.hash.slice(1);
		if (exerciseId) {
			loadExercise(exerciseId);
		}
	});
}

// Render sidebar navigation
function renderSidebar() {
	const exerciseList = document.getElementById("exerciseList");

	exercises.forEach((exercise) => {
		const link = document.createElement("a");
		link.href = `#${exercise.id}`;
		link.className = "sidebar-link";
		link.dataset.exerciseId = exercise.id;

		link.innerHTML = `
      <div class="link-title">${exercise.title}</div>
    `;

		link.addEventListener("click", (e) => {
			e.preventDefault();
			loadExercise(exercise.id);
			window.location.hash = exercise.id;
		});

		exerciseList.appendChild(link);
	});
}

// Load an exercise
async function loadExercise(exerciseId) {
	const exercise = exercises.find((ex) => ex.id === exerciseId);

	if (!exercise) {
		console.error(`Exercise ${exerciseId} not found`);
		return;
	}

	// Clean up previous exercise
	if (cleanupFunction) {
		cleanupFunction();
		cleanupFunction = null;
	}

	// Update active state in sidebar
	document.querySelectorAll(".sidebar-link").forEach((link) => {
		link.classList.remove("active");
		if (link.dataset.exerciseId === exerciseId) {
			link.classList.add("active");
		}
	});

	// Update header
	document.getElementById("exerciseTitle").textContent = exercise.title;

	// Load exercise content
	const container = document.getElementById("exerciseContainer");

	try {
		// Load HTML
		const htmlResponse = await fetch(`./exercises/${exercise.id}/index.html`);
		const html = await htmlResponse.text();
		container.innerHTML = html;

		// Load CSS
		const existingStyle = document.getElementById("exercise-styles");
		if (existingStyle) {
			existingStyle.remove();
		}

		const link = document.createElement("link");
		link.id = "exercise-styles";
		link.rel = "stylesheet";
		link.href = `./exercises/${exercise.id}/index.css`;
		document.head.appendChild(link);

		// Load and execute JS (optional - exercises can work without JS)
		try {
			const jsModule = await import(`./exercises/${exercise.id}/index.js`);

			// Initialize after a short delay to ensure DOM and CSS are ready
			const initModule = () => {
				console.log("Calling init()");
				if (jsModule.init) {
					jsModule.init();
				} else {
					console.error("No init function found in module");
				}
			};

			// Try both: onload callback and setTimeout as fallback
			let initialized = false;

			link.onload = () => {
				if (!initialized) {
					console.log("CSS loaded via onload event");
					initialized = true;
					initModule();
				}
			};

			// Fallback: if CSS doesn't fire onload (e.g., cached), initialize after a short delay
			setTimeout(() => {
				if (!initialized) {
					console.log("CSS loaded via timeout fallback");
					initialized = true;
					initModule();
				}
			}, 100);

			// Store cleanup function if provided
			if (jsModule.cleanup) {
				cleanupFunction = jsModule.cleanup;
			}
		} catch {
			// JS file is optional - exercise can still work with just HTML/CSS
			console.log(
				`No JavaScript file found for exercise ${exerciseId}, continuing without JS`,
			);
		}
	} catch (error) {
		console.error(`Error loading exercise ${exerciseId}:`, error);
		container.innerHTML = `
      <div class="error-message">
        <h3>⚠️ Error Loading Exercise</h3>
        <p>Could not load the exercise files. Please check the console for details.</p>
      </div>
    `;
	}
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
