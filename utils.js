export const normalize = (number, currentScale, newScale) => {
	const standardNormalization =
		(number - currentScale.min) / (currentScale.max - currentScale.min);

	return (newScale.max - newScale.min) * standardNormalization + newScale.min;
};

export const convertPolarToCartesian = (angle, distance) => {
	const angleInRadians = convertDegreesToRadians(angle);

	const x = Math.cos(angleInRadians) * distance;
	const y = Math.sin(angleInRadians) * distance;

	return [x, y];
};

export const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;

export const clamp = (value, min = 0, max = 1) => {
	if (min > max) {
		[min, max] = [max, min];
	}

	return Math.max(min, Math.min(max, value));
};

export const clampedNormalize = (value, currentScale, newScale) => {
	return clamp(
		normalize(value, currentScale, newScale),
		newScale.min,
		newScale.max,
	);
};
