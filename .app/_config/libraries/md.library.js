const appData = require("../../_data/app");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItWikilinks = require("./../../core/wikilinks");

module.exports = (eleventyConfig) => {
	const app = appData();

	const lib = markdownIt({
		html: true,
		linkify: true,
	})
		.use(markdownItTaskCheckbox)
		.use(markdownItFootnote)
		.use(markdownItWikilinks, {
			collections: "_notes",
			autoLabel: app.wikilinks.autoLabel,
			anchorLabel: app.wikilinks.anchorLabel,
			slugify: eleventyConfig.getFilter("slugifyPath"),
		})
		.use(markdownItAnchor, {
			slugify: eleventyConfig.getFilter("slug"),
			tabIndex: false,
			level: [2, 3],
			permalink: markdownItAnchor.permalink.linkAfterHeader({
				style: "visually-hidden",
				class: "anchor-link",
				symbol: `<svg xmlns="http://www.w3.org/2000/svg" width="1.125em" height="1.125em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
				assistiveText: (title) => `Section titled “${title}”`,
				visuallyHiddenClass: "visually-hidden",
				wrapper: ['<div class="heading-wrapper">', "</div>"],
			}),
		});

	return lib;
};
