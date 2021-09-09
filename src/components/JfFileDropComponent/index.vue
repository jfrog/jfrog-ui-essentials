<template>
  <div>
    <div class="wrapper-drop-zone">
      <div
        class="drop-zone"
        nv-file-drop=""
        uploader="jfFileUploader"
        nv-file-over=""
        over-class="drop-zone-hover"
        :disabled="jfFileDisabled"
        :class="{'drop-zone-load': jfFileUploader.queue.length , 'multiple': multiple}"
      >
        <label class="file-input-label">
          <input
            v-if="!jfFileUploader.queue[0].progress && !multiple"
            class="select-files-hidden"
            type="file"
            nv-file-select=""
            uploader="jfFileUploader"
            :disabled="jfFileDisabled"
            title=" "
          >
          <input
            v-if="!anyFileUploadInProgress() && multiple"
            class="select-files-hidden"
            type="file"
            nv-file-select=""
            uploader="jfFileUploader"
            :disabled="jfFileDisabled"
            title=" "
            multiple=""
          >
          <div v-if="multiple || !jfFileUploader.queue.length">
            <span>Drop file</span> here or <span>Select file</span>
          </div>
          <div
            v-if="!multiple && jfFileUploader.queue.length && (!jfFileUploader.queue[0].progress || !showProgressBar)"
            class="drop-zone-file-name"
          >{{ jfFileUploader.queue[0].file.name }}</div>
          <div v-if="!multiple && showProgressBar">
            <div v-for="item in jfFileUploader.queue">
              <div
                v-show="jfFileUploader.isHTML5 && item.progress"
                class="file-upload-progress file-info"
              >
                <div class="progress-file-drop">
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      :style="{ 'width': item.progress + '%' }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </label>
        <div
          v-if="multiple"
          class="upload-files-frame"
        >
          <ul>
            <li
              v-for="item in jfFileUploader.queue"
              class="upload-item"
            >
              <jf-checkbox
                v-show="item.hasCheckbox"
                v-jf-tooltip.bind=" checkboxesName "
                class="file-selection pull-left"
              >
                <input
                  v-model="item.isCheckboxChecked"
                  type="checkbox"
                  @input="item.onCheckboxChange(item)"
                >
              </jf-checkbox>
              <span
                v-jf-tooltip.bind=" item.file.name "
                class="file-name-deploy-multi"
              >{{ item.file.name }}</span>
              <a
                v-jf-tooltip="'Remove'"
                href=""
                class="icon icon-clear pull-right item-remove"
                @click.prevent="item.remove(); multiUploadItemRemoved(); removeItemCallback(item)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'JfFileDrop',
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
