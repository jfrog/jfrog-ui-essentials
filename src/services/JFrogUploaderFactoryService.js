/**
 * Created by idannaim on 8/4/15.
 */
let controller;
export class JFrogUploaderFactory {
    constructor() {
        this.$inject('FileUploader');
        this.fileUploader = this.FileUploader;
    }
    getUploaderInstance(controller) {
        return new JFrogUploader(this.fileUploader, controller);
    }   
}
