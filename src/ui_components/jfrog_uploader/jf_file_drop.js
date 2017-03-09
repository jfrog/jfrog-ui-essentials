export function jfFileDrop() {
    return {
        scope: {
            jfFileUploader: '=',
            jfFileDisabled: '=ngDisabled',
            addCallback: '&jfAddingFileCallback',
            showProgressBar: '='
        },
        restrict: 'E',
        templateUrl: 'directives/jf_file_drop/jf_file_drop.html',
        link: ($scope) => {
            $scope.jfFileUploader.onAfterAddingFile = (fileItem) => {
                $scope.jfFileUploader.queue = [fileItem];
                $scope.addCallback({fileItem: fileItem});
            }
        }
    }
}