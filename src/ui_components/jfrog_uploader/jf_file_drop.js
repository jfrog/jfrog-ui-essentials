export function jfFileDrop($timeout) {
    return {
        scope: {
            jfFileUploader: '=',
            jfFileDisabled: '=ngDisabled',
            addCallback: '&jfAddingFileCallback',
            showProgressBar: '=',
            multiple: '=?'
        },
        restrict: 'E',
        templateUrl: 'ui_components/jfrog_uploader/jf_file_drop.html',
        link: ($scope,$element) => {
            if ($scope.multiple) {
                $timeout(()=>{
                    let el = $($element).find('input[nv-file-select]');
                    el.attr('multiple',true);
                })
            }
            $scope.jfFileUploader.onAfterAddingFile = (fileItem) => {
                if (!$scope.multiple) {
                    $scope.jfFileUploader.queue = [fileItem];
                }
                $scope.addCallback({fileItem: fileItem});
            }

            $scope.jfFileUploader.multiUploadItemRemoved = () => {
                if (!this.jfFileUploader.queue.length) {
                    this.uploadCompleted = false;
                }
            }

            $scope.jfFileUploader.anyFileUploadInProgress = () => {
                return _.findWhere(this.jfFileUploader.queue,(item)=>{ return item.progress === true });
            }
        }
    }
}