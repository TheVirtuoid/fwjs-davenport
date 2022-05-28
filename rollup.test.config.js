import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";

export default [
	{
		input: "src/Game/Game.js",
		output: [
			{
				file: "cypress/classes/Game.js",
				format: "esm",
				exports: "named",
				plugins: [terser({
					mangle: {
						keep_classnames: true
					}
				})],
				generatedCode: "es2015"
			}
		],
		plugins: [
			nodeResolve()
		]
	},
	{
		input: "src/Player/Player.js",
		output: [
			{
				file: "cypress/classes/Player.js",
				format: "esm",
				exports: "named",
				plugins: [terser({
					mangle: {
						keep_classnames: true
					}
				})],
				generatedCode: "es2015"
			}
		],
		plugins: [
				nodeResolve()
		]
	},
	{
		input: "src/Round/Round.js",
		output: [
			{
				file: "cypress/classes/Round.js",
				format: "esm",
				exports: "named",
				plugins: [terser({
					mangle: {
						keep_classnames: true
					}
				})],
				generatedCode: "es2015"
			}
		],
		plugins: [
			nodeResolve()
		]
	},

]