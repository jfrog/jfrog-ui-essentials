<template>

    <div>
        <div class="jf-drawer">
            <div class="drawer-header" @click="onClickHeader()" v-jf-tooltip.bind="headerTooltip">
                <div class="drawer-header-title">
                    {{ header }}
                </div>
                <div class="drawer-header-description">
                    {{ description }}
                </div>
                <i class="icon-small-arrow-down" :class="{'drawer-arrow-close' : !opened}"></i>
            </div>
            <b-collapse class="drawer-content" v-model="opened" id="collapse">
                <slot></slot>
            </b-collapse>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'jf-drawer',
        props: [
            'header',
            'description',
            'openFirst',
            'headerTooltip'
        ],
        'jf@inject': [
            'JFrogUIUtils',
            '$timeout'
        ],
        data() {
            return { opened: null };
        },
        created() {
            this.opened = false;
            this.utils = this.JFrogUIUtils;
        },
        mounted() {
            if (this.openFirst === '0') {
                this.opened = true;
            }
        },
        ng1_legacy: {
            'controllerAs': 'jfDrawer'
        },
        methods: {
            onClickHeader() {
                this.opened = !this.opened;
                if (this.opened)
                    this.utils.fireResizeEvent();
            }
        }
    }

</script>

<style scoped lang="less">

    .jf-drawer {
        position: relative;
        padding: 15px 0;
        border-bottom: 1px solid #e9e9e9;

        .drawer-header {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;

            .icon-small-arrow-down {
                transform: rotate(0deg) scale(1.2);
                margin: 0 10px 0 auto;

                &.drawer-arrow-close {
                    transform: rotate(-90deg) scale(1.2);
                    //top: -1px;
                }
            }
            .drawer-header-title,
            .drawer-header-description {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .drawer-header-title {
                font-size: 16px;
                font-weight: 700;
                padding-right: 10px;
            }
            .drawer-header-description {
                font-size: 12px;
                flex-shrink: 3;
            }
        }

        .drawer-content {
            padding: 15px 0 0;
            overflow: hidden;
            transition: height .2s ease-in-out;
            // drawer in drawer
            .jf-drawer {
                border: 0;
                padding-bottom: 0;
                .drawer-header i.icon-small-arrow-down {
                    display: none;
                }
            }
        }
    }

</style>
