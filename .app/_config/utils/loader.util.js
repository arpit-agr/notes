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

const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const codepenShortcode = require("../shortcodes/codepen.js");
const imageShortcode = require("../shortcodes/image.js");

/**
 * Loads the eleventy configurations from the given directory.
 *
 * @param {string[]} directory The path to the config folder
 * @param {object} The eleventy config object
 */

module.exports = (directory, eleventyConfig) => {
	eleventyConfig.setQuietMode(true);
	eleventyConfig.addPlugin(directoryOutputPlugin);

	eleventyConfig.addShortcode("codepen", codepenShortcode);
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	// eleventyConfig.addPassthroughCopy("./../img");

	Object.entries(configs).forEach(([folder, handler]) => {
		load(path.join(...directory, folder), handler, eleventyConfig);
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
