import { resolve } from "path";
import path from 'path';
import { fileURLToPath } from 'url';

export default ({ command, mode }) => {
	const filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(filename);
	return {
		root: "src/web",
		base: "/",
		publicDir: "public/",
		build: {
			assetsInlineLimit: 5000,
			outDir: "./../../dist",
			emptyOutDir: true,
			rollupOptions: {
				input: {
					main: resolve(dirname, 'src/web', 'index.html')
				}
			}
		}
	}
}
