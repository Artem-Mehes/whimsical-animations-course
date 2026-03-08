import { animate } from 'motion';

const button = document.querySelector('button');
const line1 = button.querySelector('line:first-child');
const line2 = button.querySelector('line:last-child');

const VIEWBOX_SIZE = 24;
const INSET_X_BY = 6;

let isMenuOpen = false;

function handleFlatten() {
  if (checkPrefersReducedMotion()) {
    return;
  }

  // Very quick duration, since there usually isn't
  // much time between press and release:
  const duration = 0.1;

  // Animate into a single flat line, regardless of
  // whether it's currently an X or =:
  [line1, line2].forEach((elem) => {
    const lineInset = 5;
    animate(
      elem,
      {
        x1: lineInset,
        y1: VIEWBOX_SIZE * 0.5,
        x2: VIEWBOX_SIZE - lineInset,
        y2: VIEWBOX_SIZE * 0.5,
      },
      { duration }
    );
  });
}

// ⚠️ This function is totally unchanged:
function handleClick() {
  const prefersReducedMotion = checkPrefersReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.3;

  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    animate(line1, {
      x1: INSET_X_BY,
      y1: INSET_X_BY,
      x2: VIEWBOX_SIZE - INSET_X_BY,
      y2: VIEWBOX_SIZE - INSET_X_BY,
    }, { duration });
    animate(line2, {
      x1: INSET_X_BY,
      y1: VIEWBOX_SIZE - INSET_X_BY,
      x2: VIEWBOX_SIZE - INSET_X_BY,
      y2: INSET_X_BY,
    }, { duration });
  } else {
    animate(line1, {
      x1: 5,
      y1: 8,
      x2: 19,
      y2: 8,
    }, { duration });
    animate(line2, {
      x1: 5,
      y1: 16,
      x2: 19,
      y2: 16,
    }, { duration });
  }
}

button.addEventListener('pointerdown', handleFlatten);
button.addEventListener('click', handleClick);

function checkPrefersReducedMotion() {
  return !window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
}