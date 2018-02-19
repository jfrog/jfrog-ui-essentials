/**
 * Created by tomere on 1/5/2017.
 *
 * @jf_drag_and_drop_txt
 * A textarea with drag and drop ability
 *
 */

class jfDragAndDropTxtController{

    /**
     * Constructor
    * */
    constructor($scope,$element,$attrs,JFrogNotifications){
        this.$scope = $scope;
        this.$element = $element;
        this.JFrogNotifications = JFrogNotifications;

        // Binding dragenter,dragleave,drop to <jf_drang_and_drop_text> element
        // since these events are not natively supported by Angular
        this.$element.bind('dragover', this.handleDragEnter.bind(this));
        this.$element.bind('dragleave', this.handleDragLeave.bind(this));
        this.$element.bind('drop', this.handleDropEvent.bind(this));
        this.draggedFileSizeLimit = 400; // limit file size (in KB)
        this.entered = false;
        this.dndAutoFocus = this.dndAutoFocus=== undefined ? true : this.dndAutoFocus;

        this.dndCallToAction = this.dndCallToAction || "Copy your text or <b>drop a file</b>";
    }

    shouldDisplayUploadIcon(){
        return ($(this.$element).find('textarea').val() === "" && !$(this.$element).is('.over'));
    }

    /**
    *  File Reader event handlers
    * */

    onFileLoadSuccess(event){
        this.dndContent = event.target.result;
        $(this.$element).find('textarea').focus();
        if(this.dndChange && this.dndChange !== null) this.dndChange();
    }

    onFileLoadFailure(event){
        let errorMessage = "Unable to access license file.";
        if(event.target.error.name === "SecurityError") {
            errorMessage += "<br> The file is either unsafe or being used by another application.";
        }

        if(this.dndOnError !== null){
            this.dndOnError({msg: errorMessage});
        }
        else{
            this.JFrogNotifications.create({
                error: errorMessage
            });
        }
    }


    /**
    *  Drag event handlers
    * */

    handleDropEvent(event) {
        this.entered = false;
        this.toggleDragEffect();
        event.preventDefault();
        event.stopPropagation();

        // Initialize a file reader and get file path
        let reader = new FileReader();
        let file = event.originalEvent.dataTransfer.files[0];

        // Bind to reader events
        reader.onload = (event)=>{this.onFileLoadSuccess(event)};
        reader.onerror = (event)=>{this.onFileLoadFailure(event)};

        // Limit the read file size
        let fileSize = Math.round(file.size/1000);
        if(fileSize > this.draggedFileSizeLimit){
            let errorMessage = 'File exceeds the maximum size of ' + this.draggedFileSizeLimit + ' KB';

            if(this.dndOnError !== null){
                this.dndOnError({msg: errorMessage});
            }
            else{
                this.JFrogNotifications.create({
                    error: errorMessage
                });
            }

            return false;
        }

        // Read the file if not exceeds size limit
        reader.readAsText(file);
    }

    callingCodeShouldEnd(event){
        // This is an ugly fix for the issue of FireFox browser
        // firing the dragover/dragenter and dragleve events again and again
        // when dragging a file over the textarea
         let theCallingCodeShouldEnd = false;

         try {
             if(event.relatedTarget.nodeType == 3) {
                 theCallingCodeShouldEnd = true;
             }
         }
         catch(err) {}

         if(event.target === event.relatedTarget) {
             theCallingCodeShouldEnd = true;
         }

         return theCallingCodeShouldEnd;
     }

    handleDragEnter(event) {
        event.preventDefault();
        event.stopPropagation();     // cancel the event on FF

        if(this.callingCodeShouldEnd(event)){
            return;
        }

        if(!this.entered){
            this.entered = true;
            this.toggleDragEffect();
            event.originalEvent.dataTransfer.effectAllowed = 'copy';
            return false;
        }
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();     // cancel the event on FF

        if(this.callingCodeShouldEnd(event)){
            return;
        }

        if(this.entered){
            this.entered = false;
            this.toggleDragEffect();
            return false;
        }
    }

    /**
    * Toggle the drag effect
    * */

    toggleDragEffect(){
        let dndWrapper = $(this.$element).find('.drag-and-drop-txt-wrapper');
        // dndWrapper.removeClass('icon-upload');
        dndWrapper.toggleClass('over');
    }
}

export function jfDragAndDropTxt() {
    return {
        restrict: 'E',
        scope: {
            dndContent: '=',
            dndHeadingHtml: '=?',
            dndStyle: '=?',
            dndChange: '&?',
            dndRequired: '=?',
            dndOnError: '&?',
            dndCallToAction:'=?',
            dndAutoFocus:'=?'
        },
        controller: jfDragAndDropTxtController,
        controllerAs: 'jfDragAndDropTxt',
        templateUrl: 'directives/jf_drag_and_drop_txt/jf_drag_and_drop_txt.html',
        bindToController: true
    };
}
