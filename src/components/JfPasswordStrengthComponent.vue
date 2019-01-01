<template>

    <div>
        <div class="password-strength-container">
            <div class="password-strength-meter" :class="getStrength().class">
                <div class="password-strength-section" :class="{ 'show-section': getStrength().sections > 0}"></div>
                <div class="password-strength-section" :class="{ 'show-section': getStrength().sections > 1}"></div>
                <div class="password-strength-section" :class="{ 'show-section': getStrength().sections > 2}"></div>
                <div class="password-strength-section" :class="{ 'show-section': getStrength().sections > 3}"></div>
                <div class="password-strength-section" :class="{ 'show-section': getStrength().sections > 4}"></div>
            </div>
            <label class="password-strength-label">{{getStrength().label}}</label>
        </div>
    </div>

</template>

<script>

    import { passrank } from '@/directives/jf_password_strength/passrank.js';
    export default {
        name: 'jf-password-strength',
        props: [
            'password',
            'rank'
        ],
        'jf@inject': ['$scope'],
        data() {
            return {};
        },
        created() {
            this.$scope.$watch('jfPS.password', pass => {
                this.passLength = pass ? pass.length : 0;
                this.rank = passrank(pass);
            });
        },
        ng1_legacy: { 'controllerAs': 'jfPS' },
        methods: {
            getStrength() {
                if (this.rank === 0 && this.passLength === 0) {
                    return {
                        label: '',
                        class: 'blank',
                        sections: 0
                    };
                } else if (this.rank < 20) {
                    return {
                        label: 'Too short',
                        class: 'short',
                        sections: 1
                    };
                } else if (this.rank < 40) {
                    return {
                        label: 'Weak',
                        class: 'week',
                        sections: 2
                    };
                } else if (this.rank < 60) {
                    return {
                        label: 'Medium',
                        class: 'medium',
                        sections: 3
                    };
                } else if (this.rank < 80) {
                    return {
                        label: 'Good',
                        class: 'good',
                        sections: 4
                    };
                } else {
                    return {
                        label: 'Strong',
                        class: 'strong',
                        sections: 5
                    };
                }
            }
        }
    };

</script>

<style scoped lang="less">

    

</style>
