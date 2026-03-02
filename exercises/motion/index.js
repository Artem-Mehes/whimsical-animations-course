import { animate } from 'motion';
import './styles.css';

const button = document.querySelector('button');
const path = button.querySelector('path');

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
      duration: prefersReducedMotion ? 0 : 0.3,
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
      duration: prefersReducedMotion ? 0 : 0.3,
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