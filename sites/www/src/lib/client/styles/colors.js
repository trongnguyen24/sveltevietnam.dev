export const primitives = {
	white: {
		DEFAULT: 'hsl(0, 0%, 100%)',
		50: 'hsl(0, 0%, 91%)',
		100: 'hsl(0, 0%, 86%)',
		200: 'hsl(0, 0%, 82%)',
		300: 'hsl(0, 0%, 73%)',
		400: 'hsl(0, 0%, 64%)',
		500: 'hsl(0, 0%, 55%)',
		600: 'hsl(0, 0%, 44%)',
		700: 'hsl(0, 0%, 37%)',
		800: 'hsl(0, 0%, 28%)',
		900: 'hsl(0, 0%, 19%)',
	},
	black: {
		50: 'hsl(0, 0%, 95%)',
		100: 'hsl(0, 0%, 91%)',
		200: 'hsl(0, 0%, 82%)',
		300: 'hsl(0, 0%, 73%)',
		400: 'hsl(0, 0%, 64%)',
		500: 'hsl(0, 0%, 55%)',
		600: 'hsl(0, 0%, 46%)',
		700: 'hsl(0, 0%, 37%)',
		800: 'hsl(0, 0%, 20%)',
		900: 'hsl(0, 0%, 7%)',
		DEFAULT: 'hsl(0, 0%, 0%)',
	},
	orange: {
		50: 'hsl(10, 86%, 95%)',
		100: 'hsl(10, 86%, 91%)',
		200: 'hsl(10, 86%, 82%)',
		300: 'hsl(10, 86%, 73%)',
		400: 'hsl(10, 86%, 64%)',
		500: 'hsl(10, 86%, 55%)',
		DEFAULT: 'hsl(10, 86%, 54%)',
		600: 'hsl(10, 86%, 46%)',
		700: 'hsl(10, 86%, 34%)',
		800: 'hsl(10, 86%, 28%)',
		900: 'hsl(10, 86%, 19%)',
	},
	green: {
		50: 'hsl(171, 92%, 95%)',
		100: 'hsl(171, 87%, 91%)',
		200: 'hsl(171, 90%, 82%)',
		300: 'hsl(171, 88%, 73%)',
		400: 'hsl(171, 89%, 64%)',
		500: 'hsl(171, 89%, 55%)',
		600: 'hsl(171, 89%, 46%)',
		700: 'hsl(171, 89%, 37%)',
		800: 'hsl(171, 89%, 28%)',
		DEFAULT: 'hsl(171, 90%, 15%)',
		900: 'hsl(171, 90%, 19%)',
	},
	folly: {
		50: 'hsl(354, 84%, 95%)',
		100: 'hsl(352, 83%, 91%)',
		200: 'hsl(352, 83%, 82%)',
		300: 'hsl(352, 83%, 73%)',
		400: 'hsl(352, 83%, 64%)',
		DEFAULT: 'hsl(353, 84%, 62%)',
		500: 'hsl(352, 83%, 55%)',
		600: 'hsl(352, 83%, 46%)',
		700: 'hsl(352, 83%, 37%)',
		800: 'hsl(352, 83%, 28%)',
		900: 'hsl(352, 83%, 19%)',
	},
	amber: {
		50: 'hsl(42, 100%, 95%)',
		100: 'hsl(40, 100%, 91%)',
		200: 'hsl(41, 100%, 82%)',
		300: 'hsl(41, 100%, 73%)',
		400: 'hsl(41, 100%, 64%)',
		DEFAULT: 'hsl(42, 100%, 59%)',
		500: 'hsl(41, 100%, 55%)',
		600: 'hsl(41, 100%, 46%)',
		700: 'hsl(41, 100%, 37%)',
		800: 'hsl(41, 100%, 28%)',
		900: 'hsl(41, 100%, 19%)',
	},
	emerald: {
		50: 'hsl(157, 84%, 95%)',
		100: 'hsl(160, 83%, 91%)',
		200: 'hsl(159, 85%, 82%)',
		300: 'hsl(159, 84%, 73%)',
		400: 'hsl(159, 84%, 64%)',
		500: 'hsl(159, 84%, 55%)',
		600: 'hsl(159, 84%, 46%)',
		DEFAULT: 'hsl(159, 84%, 35%)',
		700: 'hsl(159, 84%, 37%)',
		800: 'hsl(159, 85%, 28%)',
		900: 'hsl(159, 84%, 19%)',
	},
	blue: {
		50: 'hsl(222, 92%, 95%)',
		100: 'hsl(220, 91%, 91%)',
		200: 'hsl(220, 91%, 82%)',
		300: 'hsl(220, 91%, 73%)',
		400: 'hsl(220, 92%, 64%)',
		500: 'hsl(220, 92%, 55%)',
		DEFAULT: 'hsl(220, 92%, 55%)',
		600: 'hsl(220, 92%, 46%)',
		700: 'hsl(220, 92%, 37%)',
		800: 'hsl(220, 92%, 28%)',
		900: 'hsl(220, 92%, 19%)',
	},
	// neutral: {
	// 	50: 'hsl(48, 12%, 92%)',
	// 	100: 'hsl(50, 13%, 91%)',
	// 	200: 'hsl(44, 12%, 82%)',
	// 	300: 'hsl(49, 12%, 73%)',
	// 	400: 'hsl(49, 12%, 64%)',
	// 	DEFAULT: 'hsl(45, 4%, 56%)',
	// 	500: 'hsl(50, 12%, 55%)',
	// 	600: 'hsl(50, 12%, 46%)',
	// 	700: 'hsl(47, 12%, 37%)',
	// 	800: 'hsl(49, 12%, 28%)',
	// 	900: 'hsl(40, 10%, 11%)',
	// },
};

const status = Object.fromEntries(
	['info', 'success', 'warning', 'error'].map((key) => [
		key,
		{
			surface: {
				DEFAULT: `var(--color-${key}-surface)`,
				100: `var(--color-${key}-surface-100)`,
				200: `var(--color-${key}-surface-200)`,
			},
			element: `var(--color-${key}-element)`,
			text: `var(--color-${key}-text)`,
		},
	]),
);

// const brand = Object.fromEntries(
// 	['primary', 'default'].map((key) => [
// 		key,
// 		{
// 			surface: {
// 				DEFAULT: `var(--color-${key}-surface)`,
// 				100: `var(--color-${key}-surface-100)`,
// 				200: `var(--color-${key}-surface-200)`,
// 			},
// 			element: `var(--color-${key}-element)`,
// 			text: `var(--color-${key}-text)`,
// 		},
// 	]),
// );

export const semantics = {
	...status,
	link: {
		DEFAULT: 'var(--color-link)',
	},
};
