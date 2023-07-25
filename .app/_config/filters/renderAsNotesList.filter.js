const ValueParser = require("../../core/value-parser");
const html = require("nanohtml");

module.exports = () => (data, options) => {
	return html`<ul class="notes-list flow" role="list">
		${data.map((item) => createItem(item, options))}
	</ul>`;
};

function createItem(item, options = {}) {
	const titleProp = options.titleProp ?? "title";
	const urlProp = options.urlProp ?? "url";
	const dateProp = options.dateProp ?? "date";
	const childrenProp = options.childrenProp ?? "children";

	const title = ValueParser.getValueByPath(item, titleProp);
	const url = ValueParser.getValueByPath(item, urlProp);
	const date = ValueParser.getValueByPath(item, dateProp);
	const children = ValueParser.getValueByPath(item, childrenProp);
	const content = url
		? html`
				<a href="${url}">${title}</a>
				<time datetime="${date.toISOString()}">
					${date.toLocaleDateString("en-us", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</time>
		  `
		: html`${title}`;
	const childList = createChildList(children, options);

	return html`<li>${content}${childList}</li>`;
}

function createChildList(children, options) {
	if (!Array.isArray(children) || children.length === 0) return null;

	return html`<ul>
		${children.map((item) => createItem(item, options))}
	</ul>`;
}
