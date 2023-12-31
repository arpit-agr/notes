const appData = require("../../_data/app");
const notesCollection = require("./notes.collection");
const QueryRunner = require("./../../core/query");

module.exports = (eleventyConfig) => (collectionApi) => {
	let counter = 0;
	const getId = () => counter++;

	const app = appData();
	const notes = notesCollection(eleventyConfig)(collectionApi);

	const groups = app.sidebar.notes.flatMap((group) => {
		const query = {
			sort: ["data.sort", "date"],
			tree: group.tree ? group.tree : false,
			filter: [
				["filePathStem", "isNotEqual", "/index"],
				...(group.pattern ? [["filePathStem", "matches", group.pattern]] : []),
				...(group.tags ? [["tags", "includesAllOf", group.tags]] : []),
			],
		};

		const runner = new QueryRunner(notes, query);
		const filteredNotes = runner.run(notes);

		if (!filteredNotes.length) return [];

		return [
			{
				id: getId(),
				label: group.label,
				expanded: group.expanded ?? true,
				tree: filteredNotes,
			},
		];
	});

	return groups;
};
