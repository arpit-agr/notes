const fs = require("fs");
const path = require("path");

const configs = {
	collections: function (eleventyConfig, colFactory, name) {
		eleventyConfig.addCollection(name, colFactory(eleventyConfig));
	},
	filters: function (eleventyConfig, filterFactory, name) {
		eleventyConfig.addFilter(name, filterFactory(eleventyConfig));
	},
	globals: function (eleventyConfig, globalFactory, name) {
		eleventyConfig.addNunjucksGlobal(name, globalFactory(eleventyConfig));
	},
	libraries: function (eleventyConfig, lib, name) {
		eleventyConfig.setLibrary(name, lib(eleventyConfig));
	},
	plugins: function (eleventyConfig, plugin) {
		eleventyConfig.addPlugin(...plugin);
	},
};

/**
 * Loads the eleventy configurations from the given directory.
 *
 * @param {string[]} directory The path to the config folder
 * @param {object} The eleventy config object
 */
module.exports = (directory, eleventyConfig) => {
	Object.entries(configs).forEach(([folder, handler]) => {
		load(path.join(...directory, folder), handler, eleventyConfig);
	});

	/* https://syntackle.live/blog/eleventy-shortcode-for-embedding-codepen-ZyslIPzCHpJo3kkPwu2U/ */

	eleventyConfig.addShortcode("codepen", function (url) {
		const url_array = url.split("/");

		const profile_url_array = url_array.filter((string, index) => {
			return index < url_array.length - 2 ? true : false;
		});

		const username = profile_url_array[profile_url_array.length - 1];
		const user_profile = profile_url_array.join("/");
		const data_slug_hash = url_array[url_array.length - 1];

		return `
		<p
		  class="codepen"
		  data-height="500"
		  data-theme-id="light"
		  data-default-tab="result"
		  data-slug-hash="${data_slug_hash}"
		  data-user="${username}"
		  style="height: 571px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
		>
			<span>
				<a href="${url}">Codepen Demo</a>.
			</span>
		</p>
		<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>`;
	});
};

function kebabCaseToCamelCase(str) {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function load(folder, handler, eleventyConfig) {
	const fileNameList = fs.readdirSync(folder);
	fileNameList.forEach((fileName) => {
		const kebabCaseName = fileName.split(".").slice(0, -2).join(".");
		const name = kebabCaseToCamelCase(kebabCaseName);
		const requirePath = path.join(folder, fileName);
		delete require.cache[require.resolve(requirePath)];
		const module = require(requirePath);
		handler(eleventyConfig, module, name);
	});
}
