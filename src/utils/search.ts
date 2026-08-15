export interface ISearchSegment {
	text: string;
	isMatch: boolean;
}

const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;

const escapeRegExp = (value: string): string => value.replace(REGEX_SPECIAL_CHARS, "\\$&");

export const splitIntoSegments = (text: string, query: string): ISearchSegment[] => {
	if (!query) {
		return [{ text, isMatch: false }];
	}

	const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");

	return text
		.split(regex)
		.map((part, index) => ({ text: part, isMatch: index % 2 === 1 }))
		.filter(segment => segment.text.length > 0);
};
