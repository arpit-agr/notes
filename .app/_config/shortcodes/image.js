const Image = require("@11ty/eleventy-img");

async function imageShortcode(
	src,
	alt,
	sizes = "(min-width: 75em) 50vw, (min-width: 64em) 70vw, 100vw",
	loading = "lazy"
) {
	let metadata = await Image(src, {
		widths: [640, 960, 1472],
		formats: ["avif", "webp", "jpeg"],
		urlPath: "/img/",
		outputDir: "./dist/img/",
	});

	let imageAttributes = {
		alt,
		sizes,
		loading,
		decoding: "async",
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
}

module.exports = imageShortcode;
