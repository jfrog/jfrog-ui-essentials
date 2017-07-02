


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
        case 'runFunction': {
            var f = eval('('+e.data.function+')');
            postMessage({response: f.apply(f, e.data.params || [])});
            break;
        }
    }
}


function asciidoc2Html(asciidoc) {
    loadAsciidoctor();
    return asciidoctor.convert(asciidoc);
}
function markdown2Html(markdown) {
    loadKramed();
    return kramed(markdown,{gfm: true, breaks: true, sanitize: true});
}

var asciidoctor, kramed;
function loadAsciidoctor() {
    if (!asciidoctor) {
        importScripts('./dependencies/asciidoctor.js');
        Asciidoctor({runtime: {platform: 'browser'}})
        asciidoctor = Asciidoctor();
    }
}

function loadKramed() {
    if (!kramed) {
        importScripts('./dependencies/kramed.min.js');
    }
}
