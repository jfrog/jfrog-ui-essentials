export function initSelectizeConfig() {
	setSelectizePugins();
}

function setSelectizePugins () {
	Selectize.define('infinite_scroll', function (opts) {
		let self = this;
		let options = $.extend({scrollRatio: 0.85, scrollStep: 20}, opts);

		this.setup = (function () {
			let original = self.setup;
			return function () {
				original.apply(this, arguments);

				let dropdown_content = self.$dropdown_content;
				let original_maxOptions = self.settings.maxOptions;

				self.$dropdown_content.on('scroll', function (e) {
					let lastScrollTop = dropdown_content.scrollTop();
					let scrollPosition = (dropdown_content.scrollTop() + dropdown_content.innerHeight()) / dropdown_content[0].scrollHeight;
					if (scrollPosition > options.scrollRatio && self.settings.maxOptions < self.currentResults.total) {
						self.settings.maxOptions += options.scrollStep;
						self.refreshOptions();
						dropdown_content[0].scrollTop = lastScrollTop;
					}
				});

				self.on('type', function (e) {
					self.settings.maxOptions = original_maxOptions;
					self.refreshOptions();
				});
			};
		})();
	});
}