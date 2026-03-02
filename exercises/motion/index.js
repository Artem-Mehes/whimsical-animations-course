import { animate } from 'motion';
import './styles.css';

const button = document.querySelector('button');
const path = button.querySelector('path');

// An exaggerated ease curve:
const BEZIER_VALUES = [0.3, 0.1, 0, 1];

function handleMouseEnter() {
  const prefersReducedMotion = checkPrefersReducedMotion();

  animate(
    path,
    {
      d: `
        M 20,50
        C 80,0
          140,100
          180,50
      `,
    },
    {
      duration: prefersReducedMotion ? 0 : 0.5,
      ease: BEZIER_VALUES,
    }
  );
}

function handleMouseLeave() {
  const prefersReducedMotion = checkPrefersReducedMotion();

  animate(
    path,
    {
      d: `
        M 20,50
        C 80,50
          140,50
          180,50
      `,
    },
    {
      duration: prefersReducedMotion ? 0 : 1.5,
      ease: BEZIER_VALUES,
    }
  );
}

button.addEventListener('mouseenter', handleMouseEnter);
button.addEventListener('mouseleave', handleMouseLeave);



function checkPrefersReducedMotion() {
  return !window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
}