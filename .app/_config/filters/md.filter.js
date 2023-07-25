// Add above your Eleventy config
const markdownIt = require("markdown-it");

// Add within your config module
const md = new markdownIt({
	html: true,
});

module.exports = () => (content) => {
	return md.render(content);
};
