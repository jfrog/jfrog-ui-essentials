<template>

    <div>
        <div class="jf-drawer">
            <div class="drawer-header" @click="onClickHeader()">
                <i class="icon-small-arrow-down" :class="{'drawer-arrow-close' : !opened}"></i>
                <div class="drawer-header-title">
                    {{ header }}
                </div>
                <div class="drawer-header-description">
                    {{ description }}
                </div>
            </div>
            <b-collapse class="drawer-content" v-model="opened" id="collapse">
                <b-card>
                    <slot></slot>
                </b-card>
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
            'openFirst'
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
//        padding: 15px 0;
        border-bottom: 1px solid #e9e9e9;

        .drawer-header {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;

            .icon-small-arrow-down {
                transform: rotate(0deg) scale(1.2);
                margin: 0 10px;

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
//            padding: 20px 0 20px 30px;
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
            .card {
                box-shadow:none;
                border:none;
                background: transparent;
                .card-body {
                    padding: 0;
                }
            }
        }
    }

</style>
