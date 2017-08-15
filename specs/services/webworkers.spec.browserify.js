describe('Unit: Web Workers', function () {

    var $scope;
    var libConfig;
    var jfww;

    // inject the main module
    beforeEach(m('jfrog.ui.essentials'));
    beforeEach(inject(function ($injector, $rootScope) {
        libConfig = $injector.get('JFrogUILibConfig');
        libConfig.setConfig({webworkersPath: 'base/src/webworkers'})
        let JFWW = new $injector.get('JFrogUIWebWorker');
        jfww = new JFWW();
        $scope = $rootScope;
    }));

    it('Should check ok',(done) => {
        jfww.check()
            .then(()=>{
                done();
            })
            .catch(() => {
                fail();
                done();
            })

        waitForPromise();
    })

    it('Should run a function and return the value',(done) => {
        jfww.runFunction((x) => x*5, 8)
            .then((response) => {
                expect(response).toEqual(40);
                done();
            })
            .catch(() => {
                fail();
                done();
            })

        waitForPromise();
    })

    it('Should convert markdown to html',(done) => {
        jfww.markupPreview('markdown', '# This should be header')
            .then((response) => {
                expect(response).toEqual('<h1 id="this-should-be-header">This should be header</h1>\n');
                done();
            })
            .catch(() => {
                fail();
                done();
            })

        waitForPromise();
    })

    it('Should convert asciidoc to html',(done) => {
        jfww.markupPreview('asciidoc', '[float]\n= This should be header')
            .then((response) => {
                expect(response).toEqual('<h1 id="_this_should_be_header" class="float">This should be header</h1>');
                done();
            })
            .catch(() => {
                fail();
                done();
            })

        waitForPromise();
    })

})
