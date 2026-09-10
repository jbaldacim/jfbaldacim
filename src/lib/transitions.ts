import { cubicOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

interface FlyBlurParams {
	x?: number;
	blur?: number;
	duration?: number;
	delay?: number;
	easing?: EasingFunction;
}

export function flyBlur(
	node: HTMLElement,
	{ x = 0, blur = 4, duration = 350, delay = 0, easing = cubicOut }: FlyBlurParams = {}
) {
	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			const currentX = (1 - t) * x;
			const currentBlur = (1 - t) * blur;
			return `
                opacity: ${t};
                transform: translateX(${currentX}px);
                filter: blur(${currentBlur}px);
            `;
		}
	};
}
