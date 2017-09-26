export function jfIncludeReplace() {
	return {
		require: 'ngInclude',
		restrict: 'A',
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
	}
}
