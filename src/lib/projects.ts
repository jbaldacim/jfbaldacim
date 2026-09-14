import type { Pathname } from '$app/types';

export type Project = {
	id: number;
	title: string;
	description: string;
	image: string;
	stack: string[];
	path: Pathname;
};
