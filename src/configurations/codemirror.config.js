export function initCodemirrorConfig() {
	defineCodeMirrorMimes();
	defineCodeMirrorLinkOverlay();
	defineCodeMirrorAqlMode();
}

function aliasMime(newMime, existingMime) {
	CodeMirror.defineMIME(newMime, CodeMirror.mimeModes[existingMime]);
}

function defineCodeMirrorMimes() {
	aliasMime('text/x-java-source', 'text/x-java');
	aliasMime('pom', 'text/xml');
}

function defineCodeMirrorAqlMode() {
	CodeMirror.defineMode("aql", function () {
		let urlRegex = /^https?:\/\/[a-zA-Z]+(\.)?(:[0-9]+)?.+?(?=\s|$|"|'|>|<)/;

		let inApiKey = false;
		return {
			token: function (stream, state) {

				if (stream.match(/(?:curl|\-\H|\-\X|\-d|POST)\b/)) {
					return "external-command";
				}
				else if (stream.match(/(?:X\-Api\-Key)\b/)) {
					inApiKey=true;
					return "header-tag";
				}
				else if (stream.match("'")) {
					inApiKey = false;
					return null;
				}
				else if (stream.match(/(?:find|include|limit|sort|offset)\b/)) {
					return "aql-keyword";
				}
				else if (stream.match(/(?:\$and|\$or|\$ne|\$gt|\$gte|\$lt|\$lte|\$rf|\$msp|\$match|\$nmatch|\$eq|\$asc|\$desc)\b/)) {
					return "aql-operators";
				}
				else if (stream.match(/(?:items|builds|entries)\b/)) {
					return "aql-domain";
				}
				else if (stream.match(/[\{\}\[\]\(\)]+/)) {
					return "aql-brackets";
				}
				else if (stream.match(urlRegex)) {
					return "api-url";
				}
				else {
					let ret = null;
					if (inApiKey && !stream.match(':')) {
						ret = "api-key";
					}
					stream.next();
					return ret;
				}
			}
		};

	});
}

function defineCodeMirrorLinkOverlay() {
	let urlRegex = /^https?:\/\/[a-zA-Z]+(\.)?(:[0-9]+)?.+?(?=\s|$|"|'|>|<)/;
	CodeMirror.defineMode("links", function (config, parserConfig) {
		let linkOverlay = {
			token: function (stream, state) {
				if (stream.match(urlRegex)) {
					return "link";
				}
				while (stream.next() != null && !stream.match(urlRegex, false)) {
				}
				return null;
			}
		};

		return CodeMirror.overlayMode(CodeMirror.getMode(config, config.mimeType || "text/xml"), linkOverlay);
	});
}