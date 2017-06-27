Asciidoctor({runtime: {platform: 'browser'}})
var asciidoctor = Asciidoctor();

onmessage = function(e) {
    switch(e.data.cmd) {
        case 'testWorker': {
            postMessage('OK');
            break;
        }
        case 'convertMarkdown': {
            switch (e.data.type) {
                case 'asciidoc': {
                    postMessage({html: asciidoc2Html(e.data.markdown)});
                    break;
                }
                case 'markdown': {
                    postMessage({html: markdown2Html(e.data.markdown)});
                    break;
                }
            }
            break;
        }
    }
}


function asciidoc2Html(asciidoc) {
    return asciidoctor.convert(asciidoc);
}
function markdown2Html(markdown) {
    return marked(markdown);
}

