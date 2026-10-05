import type IVerb from "@/interfaces/IVerb";

import { verbs } from "@/data/verbs.json";

const FNV_OFFSET_BASIS = 2166136261;
const FNV_PRIME = 16777619;

const fnv1a = (input: string): number => {
	let hash = FNV_OFFSET_BASIS;

	for (let index = 0; index < input.length; index++) {
		hash ^= input.charCodeAt(index);
		hash = Math.imul(hash, FNV_PRIME);
	}

	return hash >>> 0;
};

export const getDayKey = (date: Date = new Date()): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

export const getWordOfDay = (date: Date = new Date()): IVerb => verbs[fnv1a(getDayKey(date)) % verbs.length];
