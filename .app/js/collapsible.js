import { Alpine } from "./alpine";

Alpine.data("collapsible", (key, defaultExpanded) => ({
	expanded: Alpine.$persist(defaultExpanded)
		.as(`collapsible:${key}`)
		.using(sessionStorage),

	init() {
		// Check if the <details> element contains a child element with aria-current="page"
		if (this.$el.querySelector("[aria-current=page]")) {
			this.expanded = true; // Set the expanded property to true if the child element is found
		}

		// Set the "open" attribute based on the value in local storage
		this.$el.toggleAttribute("open", this.expanded);
	},

	toggle() {
		this.expanded = !this.expanded;
		this.$el.toggleAttribute("open", this.expanded);
	},
}));
