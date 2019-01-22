<template>

    <div>
        <div class="password-strength-container">
            <div class="password-strength-meter" :class="this.strength.class">
                <div class="password-strength-section" :class="{ 'show-section': this.strength.sections > 0}"></div>
                <div class="password-strength-section" :class="{ 'show-section': this.strength.sections > 1}"></div>
                <div class="password-strength-section" :class="{ 'show-section': this.strength.sections > 2}"></div>
                <div class="password-strength-section" :class="{ 'show-section': this.strength.sections > 3}"></div>
                <div class="password-strength-section" :class="{ 'show-section': this.strength.sections > 4}"></div>
            </div>
            <label class="password-strength-label">{{this.strength.label}}</label>
        </div>
    </div>

</template>

<script>

    import { passrank } from '../directives/jf_password_strength/passrank.js';

    const STRENGTH = {
        BLANK: {
            label: '',
            class: 'blank',
            sections: 0
        },
        SHORT: {
            label: 'Too short',
            class: 'short',
            sections: 1
        },
        WEAK: {
            label: 'Weak',
            class: 'week',
            sections: 2
        },
        MEDIUM: {
            label: 'Medium',
            class: 'medium',
            sections: 3
        },
        GOOD: {
            label: 'Good',
            class: 'good',
            sections: 4
        },
        STRONG: {
            label: 'Strong',
            class: 'strong',
            sections: 5
        }
    };

    export default {
        name: 'jf-password-strength',
        props: {
            password: {
                type: String
            }
        },
        computed: {
            rank() {
                return passrank(this.password);
            },
            strength() {
                if (!this.password) {
                    return STRENGTH.BLANK
                }
                if (this.rank === 0) {
                    return STRENGTH.BLANK
                } else if (this.rank < 20) {
                    return STRENGTH.SHORT
                } else if (this.rank < 40) {
                    return STRENGTH.WEAK
                } else if (this.rank < 60) {
                    return STRENGTH.MEDIUM
                } else if (this.rank < 80) {
                    return STRENGTH.MEDIUM
                } else {
                    return STRENGTH.STRONG
                }
            }
        }
    };

</script>

<style scoped lang="less">
    .password-strength-container {
        padding: 0;
        padding-top: 4px;
        margin: 0;
        border: 0;
        height: 20px;
        width: 380px;
        .password-strength-meter {
            width: 100%;
            background-color: transparent;
            .password-strength-section{
                width:69px;
                height: 6px;
                margin-right: 5px;
                background-color: #eee;
                display:inline-block;
                &:last-child{
                    margin-right: 0;
                }
            }
            &.strong {
                &+.password-strength-label{
                    color:#41a147;
                }
                .password-strength-section.show-section {
                    background-color: #41a147;
                }
            }
            &.good {
                &+.password-strength-label{
                    color:#41a147;
                }
                .password-strength-section.show-section {
                    background-color: #41a147;
                }
            }
            &.medium {
                &+.password-strength-label{
                    color:#f1c238;
                }
                .password-strength-section.show-section {
                    background-color: #f1c238;
                }
            }
            &.week {
                &+.password-strength-label{
                    color:#be1e2d;
                }
                .password-strength-section.show-section {
                    background-color: #be1e2d;
                }
            }
            &.short {
                &+.password-strength-label{
                    color:#be1e2d;
                }
                .password-strength-section.show-section {
                    background-color: #be1e2d;
                }
            }
            &.blank{
                .password-strength-section {
                    background-color: #eee;
                }
            }
        }
        .password-strength-label{
            font-size: 14px;
            font-weight: bold;
            padding-top: 0;
        }
    }


</style>
