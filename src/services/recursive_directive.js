export function recursiveDirective($compile) {
	return {
		compile: (elem, link) => {
            link = _.isFunction(link) ? { post: link } : link;
			var origContents = elem.contents().remove();
			var compileFunction;
			return {
				pre: (link && link.pre) ? link.pre : null,
				post: (scope, elem) => {
                    compileFunction = !compileFunction ? $compile(origContents) : compileFunction;
					compileFunction(scope, (clone) => elem.append(clone));
					if (link && link.post) link.post.apply(null, arguments);
				}
			};
		}
	};
}
