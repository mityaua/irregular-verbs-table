import Columns from "@/enums/Columns";

export const SORT_ICON_COLORS = {
	ASCENDING: "#00CC99",
	DESCENDING: "#8a2be2",
	INACTIVE: "#a4b0be",
};

export const COLUMN_DISPLAY_NAMES: Record<string, string> = {
	[Columns.Infinitive]: "Infinitive",
	[Columns.PastSimple]: "Past Simple",
	[Columns.PastParticiple]: "Past Participle",
};

export const SEARCH_DEBOUNCE_DELAY = 500;
export const SEARCH_URL_PARAM = "search";
export const APP_LOCALE = "uk-UA";

export const ANALYTICS = {
	EVENTS: {
		SEARCH: "search",
	},
	CATEGORIES: {
		VERBS_SEARCH: "verbs-search",
	},
};