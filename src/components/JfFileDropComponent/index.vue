<template>

    <div>
        <div class="wrapper-drop-zone">
            <div class="drop-zone" nv-file-drop="" uploader="jfFileUploader" nv-file-over="" over-class="drop-zone-hover" :disabled="jfFileDisabled" :class="{'drop-zone-load': jfFileUploader.queue.length , 'multiple': multiple}">
                <label class="file-input-label">
                    <input class="select-files-hidden" type="file" v-if="!jfFileUploader.queue[0].progress && !multiple" nv-file-select="" uploader="jfFileUploader" :disabled="jfFileDisabled" title=" ">
                    <input class="select-files-hidden" type="file" v-if="!anyFileUploadInProgress() && multiple" nv-file-select="" uploader="jfFileUploader" :disabled="jfFileDisabled" title=" " multiple="">
                    <div v-if="multiple || !jfFileUploader.queue.length">
                        <span>Drop file</span> here or <span>Select file</span>
                    </div>
                    <div v-if="!multiple && jfFileUploader.queue.length && (!jfFileUploader.queue[0].progress || !showProgressBar)" class="drop-zone-file-name">{{jfFileUploader.queue[0].file.name}}</div>
                    <div v-if="!multiple && showProgressBar">
                        <div v-for="item in jfFileUploader.queue">
                            <div v-show="jfFileUploader.isHTML5 && item.progress" class="file-upload-progress file-info">
                                <div class="progress-file-drop">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" :style="{ 'width': item.progress + '%' }">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
                <div class="upload-files-frame" v-if="multiple">
                    <ul>
                        <li v-for="item in jfFileUploader.queue" class="upload-item">
                            <jf-checkbox class="file-selection pull-left" v-show="item.hasCheckbox" v-jf-tooltip.bind=" checkboxesName ">
                                <input type="checkbox" @input="item.onCheckboxChange(item)" v-model="item.isCheckboxChecked">
                            </jf-checkbox>
                            <span class="file-name-deploy-multi" v-jf-tooltip.bind=" item.file.name ">{{ item.file.name }}</span>
                            <a href="" @click.prevent="item.remove(); multiUploadItemRemoved(); removeItemCallback(item)" v-jf-tooltip="'Remove'" class="icon icon-clear pull-right item-remove"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-file-drop',
        props: [
            'jfFileUploader',
            'jfFileDisabled',
            'showProgressBar',
            'multiple',
            'checkboxesName'
        ],
        data() {
            return {};
        }
    }

</script>

<style scoped lang="less">



</style>
