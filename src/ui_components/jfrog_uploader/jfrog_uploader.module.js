import{JFrogUploaderFactory}   from'./jfrog_uploader';
import{jfFileDrop}   from'./jf_file_drop';

export default angular.module('jfrog.uploader', ['angularFileUpload'])
        .service('JFrogUploaderFactory', JFrogUploaderFactory)
        .directive('jfFileDrop',jfFileDrop)