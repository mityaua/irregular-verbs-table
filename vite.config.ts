import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import mkcert from "vite-plugin-mkcert";

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
