import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/irregular-verbs-table/",
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
			"@assets": path.resolve(import.meta.dirname, "./src/assets"),
			"@components": path.resolve(import.meta.dirname, "./src/components"),
		},
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: tag => tag === "search",
				},
			},
		}),
		mkcert(),
		svgLoader(),
	],
});
