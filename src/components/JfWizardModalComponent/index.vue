<template>
  <b-modal
    v-bind="modalProps"
    :modal-class="classForStep"
    @hidden="_afterModalHidden"
    @hide="_handleHide"
  >
    <template slot="modal-header">
      <span
        v-if="wizardDefinitionObject.cancelable"
        class="icon icon-clear"
        @click="dismiss()"
      />
      <div
        class="title-wrapper icon-hidden"
        :class="{'no-border' : currentStepDefinition.hideTitleBorder}"
      >
        <div
          v-if="currentStepDefinition.icon"
          class="icon"
          :class="{'build-animation' : currentStepDefinition.buildIcon}"
        >
          <img
            :srcset="currentStepDefinition.iconSrcset"
            :src="currentStepDefinition.icon"
            alt=""
          >

          <img
            v-if="currentStepDefinition.buildIcon"
            :srcset="currentStepDefinition.buildIconSrcset"
            ng-src="currentStepDefinition.buildIcon"
            alt=""
            class="build"
          >
        </div>
        <div class="title">
          <h1 v-if="currentStepDefinition.name">
            {{ currentStepDefinition.name }}
          </h1>
          <div
            v-if="currentStepDescription"
            class="description"
            v-html="currentStepDescription"
          />
        </div>
      </div>
    </template>
    <div
      ref="currentPage"
      class="modal-body clearfix "
    />
    <template slot="modal-footer">
      <div jf-disable-ng-animate>
        <div
          v-if="doNotShowWizardAgain"
          class="pull-left"
        >
          <jf-checkbox :text="doNotShowWizardAgain.label">
            <input
              v-model="doNotShowWizardAgain.model"
              type="checkbox"
              @change="preventShowingWizardAgain()"
            >
          </jf-checkbox>
        </div>
        <div class="progress-indicator">
          <div
            v-for="(led, index) in wizardDefinitionObject.steps"
            :key="index"
            class="progress-indicator-led"
            :class="{current: $index === currentStep-1}"
          />
        </div>


        <div class="modal-footer-buttons-container">
          <div v-if="!currentStepDefinition.customButtons">
            <button
              v-if="currentStep > 1 && prevStepDefinition.supportReturnTo !== false"
              id="wizard-popup-prev"
              class="btn"
              :disabled="pending"
              @click="prevStep()"
            >
              Back
            </button>
            <button
              v-if="currentStep < totalSteps && currentStepDefinition.skippable"
              id="wizard-popup-skip"
              class="btn"
              :disabled="pending"
              jf-clear-errors
              @click="nextStep(true)"
            >
              Skip
            </button>
            <button
              v-if="currentStep < totalSteps"
              id="wizard-popup-next"
              :disabled="pending || !wizardHooks.isStepCompleted(currentStepDefinition)"
              class="btn"
              @click="nextStep()"
            >
              Next
            </button>
            <button
              v-if="currentStep === totalSteps"
              id="wizard-popup-finish"
              :disabled="pending || (!wizardHooks.isStepCompleted(currentStepDefinition) && !currentStepDefinition.skippable)"
              class="btn"
              @click="finish()"
            >
              Finish
            </button>
          </div>
          <div v-if="currentStepDefinition.customButtons">
            <span
              v-for="(button, index) in currentStepDefinition.customButtons"
              :key="index"
            >
              <button
                v-if="button.action==='back' && (currentStep > 1 && prevStepDefinition.supportReturnTo !== false)"
                id="wizard-popup-prev-custom"
                class="btn"
                :disabled="pending"
                @click="prevStep()"
              >{{ button.label }}</button>
              <button
                v-if="button.action==='skip' && (currentStep < totalSteps && currentStepDefinition.skippable)"
                id="wizard-popup-skip-custom"
                class="btn"
                :disabled="pending"
                jf-clear-errors
                @click="nextStep(true)"
              >{{ button.label }}</button>
              <button
                v-if="button.action==='next' && (currentStep < totalSteps)"
                id="wizard-popup-next-custom"
                :disabled="pending || !wizardHooks.isStepCompleted(currentStepDefinition)"
                class="btn"
                @click="nextStep()"
              >{{ button.label }}</button>
              <button
                v-if="button.action==='finish' && (currentStep === totalSteps)"
                id="wizard-popup-finish-custom"
                :disabled="pending || (!wizardHooks.isStepCompleted(currentStepDefinition) && !currentStepDefinition.skippable)"
                class="btn"
                @click="finish()"
              >{{ button.label }}</button>

              <button
                v-if="isFunction(button.action)"
                id="wizard-popup-custom-button"
                :disabled="button.isDisabled && button.isDisabled()"
                class="btn"
                @click="button.action()"
              >{{ button.label }}</button>
            </span>
          </div>
        </div>
      </div>
    </template>
  </b-modal>
</template>
<script>
    import ModalMixins from '@/mixins/ModalMixins/index.js'

    export default {
        name: 'JfWizardModal',
        mixins: [ModalMixins],
            "jf@inject": [
            'JFrogUILibConfig',
            'JFrogNotifications',
            '$sanitize'
        ],
        props: [
            'wizardDefinitionObject',
            'wizardHooks',
            'JFrogModal',
        ],
        data() {
            return {
                currentStep: !this.wizardDefinitionObject.initialStep ? 1 : _.findIndex(wizardDefinitionObject.steps, { id: this.wizardDefinitionObject.initialStep }) + 1,
                totalSteps: this.wizardDefinitionObject.steps.length,
                doNotShowWizardAgain: this.wizardDefinitionObject.doNotShowWizardAgain,
                pending: false
            };
        },

        computed: {
            prevStepDefinition() {
                return this.wizardDefinitionObject.steps[this.currentStep - 2];
            },
            currentStepDefinition() {
                return this.wizardDefinitionObject.steps[this.currentStep - 1];
            },
            nextStepDefinition() {
                return this.wizardDefinitionObject.steps[this.currentStep];
            },
            currentStepDescription() {
                return this.currentStepDefinition.description
                    ? this.$sanitize(this.currentStepDefinition.description) : ''
            },
            classForStep: function() {
                return `wizard-modal ${this.currentStepDefinition.class || ""}`;
            }
        },

        watch: {
            currentStep(){
                this.getContentForPage();
            },
            wizardHooks(){
                this.$forceUpdate();
            }
        },

        mounted(){
            this.getContentForPage();
        },
        methods: {
            getContentForPage() {
                this.titleInit();
                let currentPageContainer = this.$refs.currentPage;
                let currentPage = currentPageContainer.firstChild;
                if( currentPage ) {
                    currentPageContainer.removeChild(currentPage);
                }

                let currentStep = this.currentStepDefinition;
                let modifiers = typeof currentStep.template == 'object' ? currentStep.template
                : this.JFrogUILibConfig.getConfig().customModalTemplates[currentStep.template];
                let ComponentClass = Vue.extend({
                    name: "WizardPage",
                    mixins: [ modifiers ],
                    props: ["WizCtrl"],
                    template: modifiers.template
                });
                let component = new ComponentClass({propsData: {
                    WizCtrl: this.wizardHooks
                }});
                // $(this.$el).find('.modal-body').empty().append(component.$mount().$el);

                component.$mount();

                currentPageContainer.appendChild(component.$el);
            },
            cancel() {
                if (this.wizardHooks.onCancel) this.wizardHooks.onCancel();
                this.dismiss();
            },

            titleInit() {
                if (this.wizardHooks.onWizardShow) this.wizardHooks.onWizardShow(this.currentStepDefinition);
            },

            nextStep(skip) {
                if (this.wizardHooks.onStepChange) {
                    let response = this.wizardHooks.onStepChange(this.nextStepDefinition, this.currentStepDefinition, skip ? 'skip' : 'next');
                    if (response && response.then) {
                        this.pending = true;
                        response.then((pRes) => {
                            if (pRes !== false) this.currentStep++
                            if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.currentStepDefinition, this.prevStepDefinition, skip ? 'skip' : 'next');
                            this.pending = false;
                        })
                            .catch(() => {
                                this.pending = false;
                            });

                    }
                    else if (response !== false) {
                        this.currentStep++;
                        if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.currentStepDefinition, this.prevStepDefinition, skip ? 'skip' : 'next');
                    }
                }
                else {
                    this.currentStep++;
                }
                this.JFrogModal._calculateMaxHeight(true);
            },

            prevStep() {
                if (this.wizardHooks.onStepChange) {
                    let response = this.wizardHooks.onStepChange(this.prevStepDefinition, this.currentStepDefinition, 'prev');
                    if (response && response.then) {
                        this.pending = true;
                        response.then((pRes) => {
                            if (pRes !== false) this.currentStep--;
                            if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.currentStepDefinition, this.nextStepDefinition, 'prev');
                            this.pending = false;
                        })
                            .catch(() => {
                                this.pending = false;
                            });
                    }
                    else if (response !== false) {
                        this.currentStep--;
                        if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.currentStepDefinition, this.nextStepDefinition, 'prev');
                    }
                }
                else {
                    this.currentStep--;
                }
                this.JFrogModal._calculateMaxHeight(true);
            },

            finish() {
                if (this.wizardHooks.onComplete) this.wizardHooks.onComplete();
                this.$close(true);
            },

            isFunction(val) {
                return _.isFunction(val);
            },

            preventShowingWizardAgain() {
                if (this.doNotShowWizardAgain && this.doNotShowWizardAgain.globalFlagName) {
                    localStorage[this.doNotShowWizardAgain.globalFlagName] = true;
                    this.finish();
                }
            }
        }

    }
</script>
