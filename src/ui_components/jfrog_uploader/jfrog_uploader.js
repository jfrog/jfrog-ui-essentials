/**
 * Created by idannaim on 8/4/15.
 */
let controller;
class JFrogUploader {
    constructor(FileUploader, _controller_) {
        controller = _controller_;
        this.fileUploader = new FileUploader();

    }

    /**
     * Path on the server to upload files
     * @param path
     * @returns {JFrogUploader}
     */
    setUrl(path) {
        this.fileUploader.url = path;
        return this;
    }

    /**
     *
     * @returns {the uploader instance}
     */
    getUploader() {
        return this.fileUploader;
    }

    /**
     *  Fires after adding a single file to the queue.
     * @param func
     * @returns {JFrogUploader}
     */
    setOnAfterAddingFile(func) {
        this.fileUploader.onAfterAddingFile = func.bind(controller);
        return this;
    }

    /**
     * When adding a file failed.
     * @param func
     * @returns {JFrogUploader}
     */
    setOnWhenAddingFileFailed(func) {
        this.fileUploader.onWhenAddingFileFailed = func.bind(this);
        return this;
    }

    /**
     * Fires after adding all the dragged or selected files to the queue.
     * @param func
     * @returns {JFrogUploader}
     */
    setOnAfterAddingAll(func) {
        this.fileUploader.onAfterAddingAll = func.bind(controller);
        return this;
    }

    /**
     * Fires before uploading an item.
     * @param func
     * @returns {JFrogUploader}
     */
    setOnBeforeUploadItem(func) {
        this.fileUploader.onBeforeUploadItem = func.bind(controller);
        return this;
    }

    /**
     *  On file upload progress
     * @param func
     * @returns {JFrogUploader}
     */
    setOnProgressItem(func) {
        this.fileUploader.onProgressItem = func.bind(controller);
        return this;
    }

    /**
     * On file successfully uploaded
     * @param func
     * @returns {JFrogUploader}
     */
    setOnSuccessItem(func) {
        this.fileUploader.onSuccessItem = func.bind(controller);
        return this;
    }

    /**
     *  On upload error
     * @param func
     * @returns {JFrogUploader}
     */

    setOnErrorItem(func) {
        this.fileUploader.onErrorItem = func.bind(controller);
        return this;
    }

    /**
     * On cancel uploading
     * @param func
     * @returns {JFrogUploader}
     */
    setOnCancelItem(func) {
        this.fileUploader.onCancelItem = func.bind(controller);
        return this;
    }

    /**
     * On file upload complete (independently of the success of the operation)
     * @param func
     * @returns {JFrogUploader}
     */
    setOnCompleteItem(func) {
        this.fileUploader.onCompleteItem = func.bind(controller);
        return this;
    }

    /**
     * On upload queue progress
     * @param func
     * @returns {JFrogUploader}
     */
    setOnProgressAll(func) {
        this.fileUploader.onProgressAll = func.bind(controller);
        return this;
    }

    /**
     *  On all loaded when uploading an entire queue, or on file loaded when uploading a single independent file
     * @param func
     * @returns {JFrogUploader}
     */
    setOnCompleteAll(func) {
        this.fileUploader.onCompleteAll = func.bind(controller);
        return this;
    }

    /**
     *
     * @returns { files queue}
     */
    getQueue() {
        return this.fileUploader.queue || [];
    }

    /**
     * clear all files from queue
     */
    clearQueue() {
        this.fileUploader.queue = [];
    }

    /**
     * upload all files in queue
     */
    uploadAll() {
        this.fileUploader.uploadAll();
    }

    /**
     * remove file from queue
     * @param fileItem
     * @returns {queue}
     */
    removeFileFromQueue(fileItem) {
        this.fileUploader.removeFromQueue(fileItem);
        return this.fileUploader.queue;
    }

}


export class JFrogUploaderFactory {
    constructor(FileUploader) {
        this.fileUploader = FileUploader;
    }

    getUploaderInstance(controller) {
        return new JFrogUploader(this.fileUploader, controller);
    }

}