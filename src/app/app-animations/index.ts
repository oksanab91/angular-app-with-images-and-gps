import { fadeInAnimation, fadeInOutAnimation } from './fadeInOut.animation';
import { slideInOutAnimation } from './slideInOut.animation';
import { slideListInOutAnimation } from './slideListInOut.animation';

export const animations = [
    fadeInAnimation,
    fadeInOutAnimation,
    slideInOutAnimation,
    slideListInOutAnimation
];

export * from './fadeInOut.animation';
export * from './slideInOut.animation';