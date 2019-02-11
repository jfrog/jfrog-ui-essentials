<template>
    <b-modal
        v-bind="modalProps"
        :modal-class="classForStep"
        @hidden="_afterModalHidden"
        @hide="_handleHide"
        >
            <template slot="modal-header">
                <span v-if="wizardDefinitionObject.cancelable" class="icon icon-clear" @click="dismiss()"></span>
                <div class="title-wrapper icon-hidden" :class="{'no-border' : wizardDefinitionObject.steps[currentStep-1].hideTitleBorder}">
                    <div class="icon"
                        v-if="wizardDefinitionObject.steps[currentStep-1].icon"
                        :class="{'build-animation' : wizardDefinitionObject.steps[currentStep-1].buildIcon}">

                        <img :srcset="wizardDefinitionObject.steps[currentStep-1].iconSrcset"
                            :src="wizardDefinitionObject.steps[currentStep-1].icon"
                            alt="">

                        <img :srcset="wizardDefinitionObject.steps[currentStep-1].buildIconSrcset"
                            ng-src="wizardDefinitionObject.steps[currentStep-1].buildIcon"
                            v-if="wizardDefinitionObject.steps[currentStep-1].buildIcon"
                            alt="" class="build">
                    </div>
                    <div class="title">
                        <h1 v-if="wizardDefinitionObject.steps[currentStep-1].name">{{wizardDefinitionObject.steps[currentStep-1].name}}</h1>
                        <div class="description" v-if="wizardDefinitionObject.steps[currentStep-1].description" v-html="wizardDefinitionObject.steps[currentStep-1].description"></div>
                    </div>
                </div>
            </template>
            <div ref="currentPage" class="modal-body clearfix ">

            </div>
            <template slot="modal-footer">
                <div jf-disable-ng-animate>
                    <div class="pull-left"
                        v-if="doNotShowWizardAgain">
                        <jf-checkbox :text="doNotShowWizardAgain.label">
                            <input type="checkbox"
                                @change="preventShowingWizardAgain()"
                                v-model="doNotShowWizardAgain.model">
                        </jf-checkbox>
                    </div>
                    <div class="progress-indicator">
                        <div class="progress-indicator-led"
                            :class="{current: $index === currentStep-1}"
                            v-for="(led, index) in wizardDefinitionObject.steps" :key="index"></div>
                    </div>


                    <div class="modal-footer-buttons-container">
                        <div v-if="!wizardDefinitionObject.steps[currentStep-1].customButtons">
                            <button v-if="currentStep > 1 && wizardDefinitionObject.steps[currentStep-2].supportReturnTo !== false"
                                    class="btn"
                                    @click="prevStep()"
                                    :disabled="pending"
                                    id="wizard-popup-prev">Back</button>
                            <button v-if="currentStep < totalSteps && wizardDefinitionObject.steps[currentStep-1].skippable"
                                    class="btn"
                                    @click="nextStep(true)"
                                    :disabled="pending"
                                    jf-clear-errors
                                    id="wizard-popup-skip">Skip</button>
                            <button v-if="currentStep < totalSteps"
                                    :disabled="pending || !wizardHooks.isStepCompleted(wizardDefinitionObject.steps[currentStep-1])"
                                    class="btn"
                                    @click="nextStep()"
                                    id="wizard-popup-next">Next</button>
                            <button v-if="currentStep === totalSteps"
                                    :disabled="pending || (!wizardHooks.isStepCompleted(wizardDefinitionObject.steps[currentStep-1]) && !wizardDefinitionObject.steps[currentStep-1].skippable)"
                                    class="btn"
                                    @click="finish()"
                                    id="wizard-popup-finish">Finish</button>
                        </div>
                        <div v-if="wizardDefinitionObject.steps[currentStep-1].customButtons">
                            <span v-for="(button, index) in wizardDefinitionObject.steps[currentStep-1].customButtons" :key="index">
                                <button v-if="button.action==='back' && (currentStep > 1 && wizardDefinitionObject.steps[currentStep-2].supportReturnTo !== false)"
                                        class="btn"
                                        @click="prevStep()"
                                        :disabled="pending"
                                        id="wizard-popup-prev-custom">{{button.label}}</button>
                                <button v-if="button.action==='skip' && (currentStep < totalSteps && wizardDefinitionObject.steps[currentStep-1].skippable)"
                                        class="btn"
                                        @click="nextStep(true)"
                                        :disabled="pending"
                                        jf-clear-errors
                                        id="wizard-popup-skip-custom">{{button.label}}</button>
                                <button v-if="button.action==='next' && (currentStep < totalSteps)"
                                        :disabled="pending || !wizardHooks.isStepCompleted(wizardDefinitionObject.steps[currentStep-1])"
                                        class="btn"
                                        @click="nextStep()"
                                        id="wizard-popup-next-custom">{{button.label}}</button>
                                <button v-if="button.action==='finish' && (currentStep === totalSteps)"
                                        :disabled="pending || (!wizardHooks.isStepCompleted(wizardDefinitionObject.steps[currentStep-1]) && !wizardDefinitionObject.steps[currentStep-1].skippable)"
                                        class="btn"
                                        @click="finish()"
                                        id="wizard-popup-finish-custom">{{button.label}}</button>

                                <button v-if="isFunction(button.action)"
                                        :disabled="button.isDisabled && button.isDisabled()"
                                        class="btn"
                                        @click="button.action()"
                                        id="wizard-popup-custom-button">{{button.label}}</button>
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
        name:'jf-wizard-modal',
        mixins: [ModalMixins],
            "jf@inject": [
            'JFrogUILibConfig',
            'JFrogNotifications'
        ],
        props:[
            'wizardDefinitionObject',
            'wizardHooks',
            'JFrogModal',
        ],
        data() {
            return {
                currentStep: !this.wizardDefinitionObject.initialStep ? 1 : _.findIndex(wizardDefinitionObject.steps, { id: this.wizardDefinitionObject.initialStep }) + 1,
                totalSteps: this.wizardDefinitionObject.steps.length,
                doNotShowWizardAgain:this.wizardDefinitionObject.doNotShowWizardAgain,
                pending: false
            };
        },

        mounted(){
            this.getContentForPage();
        },

        watch:{
            currentStep(){
                this.getContentForPage();
            },
            wizardHooks(){
                this.$forceUpdate();
            }
        },

        computed: {
            classForStep: function() {
                return `wizard-modal ${this.wizardDefinitionObject.steps[this.currentStep-1].class || ""}`;
            }
        },
        methods: {
            getContentForPage() {
                this.titleInit();
                let currentPageContainer = this.$refs.currentPage;
                let currentPage = currentPageContainer.firstChild;
                if( currentPage ) {
                    currentPageContainer.removeChild(currentPage);
                }

                let currentStep = this.wizardDefinitionObject.steps[this.currentStep - 1];
                let modifiers = typeof currentStep.template == 'object' ? currentStep.template :
                this.JFrogUILibConfig.getConfig().customModalTemplates[currentStep.template];
                let ComponentClass = Vue.extend({
                    name: "wizard-page",
                    template: modifiers.template,
                    mixins:[ modifiers ],
                    props:["WizCtrl"]
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
                if (this.wizardHooks.onWizardShow) this.wizardHooks.onWizardShow(this.wizardDefinitionObject.steps[this.currentStep - 1]);
            },

            nextStep(skip) {
                if (this.wizardHooks.onStepChange) {
                    let response = this.wizardHooks.onStepChange(this.wizardDefinitionObject.steps[this.currentStep], this.wizardDefinitionObject.steps[this.currentStep - 1], skip ? 'skip' : 'next');
                    if (response && response.then) {
                        this.pending = true;
                        response.then((pRes) => {
                            if (pRes !== false) this.currentStep++
                            if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep - 2], skip ? 'skip' : 'next');
                            this.pending = false;
                        })
                            .catch(() => {
                                this.pending = false;
                            });

                    }
                    else if (response !== false) {
                        this.currentStep++;
                        if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep - 2], skip ? 'skip' : 'next');
                    }
                }
                else {
                    this.currentStep++;
                }
                this.JFrogModal._calculateMaxHeight(true);
            },

            prevStep() {
                if (this.wizardHooks.onStepChange) {
                    let response = this.wizardHooks.onStepChange(this.wizardDefinitionObject.steps[this.currentStep - 2], this.wizardDefinitionObject.steps[this.currentStep - 1], 'prev');
                    if (response && response.then) {
                        this.pending = true;
                        response.then((pRes) => {
                            if (pRes !== false) this.currentStep--;
                            if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep], 'prev');
                            this.pending = false;
                        })
                            .catch(() => {
                                this.pending = false;
                            });
                    }
                    else if (response !== false) {
                        this.currentStep--;
                        if (this.wizardHooks.afterStepChange) this.wizardHooks.afterStepChange(this.wizardDefinitionObject.steps[this.currentStep - 1], this.wizardDefinitionObject.steps[this.currentStep], 'prev');
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
