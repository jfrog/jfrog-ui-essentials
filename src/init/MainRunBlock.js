export /* @ngInject */
function main() {
    this.$inject('$httpBackend', '$animate');

    //$httpBackend.whenPOST(/.*/).passThrough();
    //$httpBackend.whenPUT(/.*/).passThrough();
    //$httpBackend.whenGET(/.*/).passThrough();
    //$httpBackend.whenDELETE(/.*/).passThrough();
    //$httpBackend.whenPATCH(/.*/).passThrough();
    //angular.uppercase was removed in 1.7.0, we polyfill it here, to prevent breakage of 3rd party (ui-grid)
/*
    angular.uppercase = str => str.toUpperCase();
    tempFixForAnimateParamsReversal(this.$animate);
    initSelectizeConfig();
    initCodemirrorConfig();
*/
}
