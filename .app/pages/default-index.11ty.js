const fs = require("fs");

class DefaultIndex {
	data() {
		const hasCustomIndex = fs.existsSync("./../index.md");
		return {
			permalink: hasCustomIndex ? false : "/",
			layout: "layouts/base.njk",
			panel: false,
		};
	}

	render() {
		return `
      <main class="app-layout__main" id="main-content">
        <div class="page content-wrapper">
          <header class="page__header">
						<h1 class="page__title">Home</h1>
					</header>
          Welcome to Eleventy Notes.
          Customize this page by creating a file named index.md in the root of your project.
        </div>
      </main>
    `;
	}
}

module.exports = DefaultIndex;
