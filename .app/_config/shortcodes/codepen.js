/* https://syntackle.live/blog/eleventy-shortcode-for-embedding-codepen-ZyslIPzCHpJo3kkPwu2U/ */

function codepenShortcode(url) {
	const url_array = url.split("/");

	const profile_url_array = url_array.filter((string, index) => {
		return index < url_array.length - 2 ? true : false;
	});

	const username = profile_url_array[profile_url_array.length - 1];
	// const user_profile = profile_url_array.join("/");
	const data_slug_hash = url_array[url_array.length - 1];

	return `
  <p
    class="codepen"
    data-height="500"
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
}

module.exports = codepenShortcode;
