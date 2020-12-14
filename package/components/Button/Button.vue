<template>
    <button
        :type="nativeType"
        @click="clickHandler"
        :class="wrapClasses"
        :disabled="isDisabled">
        <slot name="loading" v-if="isLoading && isLoadIcon">
            <span :class="[btnPrefixCls + '-loader']"></span>
        </slot>
        <!-- <Icon
            :type="innerIcon.type"
            :prefix-cls="prefixCls"
            :font-size="innerIcon.fontSize"
            :color="innerIcon.color"
            v-if="icon"></Icon> -->
        <slot></slot>
    </button>
</template>

<script>
// import Icon from '../Icon'
// import {oneOf} from '../../utils/assist';

export default {
    name: 'Button',
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        isLoadIcon: {
            type: Boolean,
            default: true
        },
        isDisabled: Boolean,
        isOutline: Boolean,
        isGradient: Boolean,
        isBlock: Boolean,
        icon: [String, Object],
        label: [String, Number],
        nativeType: {
            default: 'button',
            validator(value) {
                return oneOf(value, ['button', 'submit', 'reset']) || !value;
            }
        },
        prefixCls: {
            type: String,
            default: 'jad'
        },
        type: {
            default: 'default',
            validator(value) {
                return oneOf(value, [
                    'primary', 'success', 'warning', 'error', 'info', 'text',
                    'linear', 'linear-red', 'dash', 'default'
                ]) || !value;
            }
        },
        size: {
            type: String,
            default: '',
            validator(value) {
                return oneOf(value, ['large', 'medium', 'default', 'small']) || !value;
            }
        },
        shape: {
            type: String,
            default: '',
            validator(value) {
                return oneOf(value, ['circle', 'rectangle']) || !value;
            }
        },
        className: String
    },
    data() {
        return {
            currentLabel: ''
        }
    },
    computed: {
        btnPrefixCls() {
            return this.prefixCls + '-btn';
        },
        innerIcon() {
            let {icon} = this
            let tempIcon = {}
            if (typeof icon === 'string') {
                tempIcon.type = icon
            } else {
                tempIcon = icon
            }
            return tempIcon
        },
        wrapClasses() {
            let {
                btnPrefixCls,
                type,
                size,
                isOutline,
                isGradient,
                isBlock,
                isLoading,
                className,
                shape,
                currentLabel,
                label
            } = this;

            return [
                `${btnPrefixCls}`,
                {
                    [`${btnPrefixCls}-${type}`]: !!type && !isOutline && !isGradient,
                    [`${btnPrefixCls}-outline-${type}`]: !!type && isOutline,
                    [`${btnPrefixCls}-linear-${type}`]: !!type && isGradient,
                    [`${btnPrefixCls}-${size}`]: !!size,
                    [`${btnPrefixCls}-block`]: isBlock,
                    [`${btnPrefixCls}-loading`]: isLoading,
                    [`${btnPrefixCls}-checked`]: label && currentLabel === label,
                    [`${btnPrefixCls}-${shape}`]: !!shape,
                    [`${className}`]: !!className
                }
            ]

        }
    },
    components: {
        Icon
    },
    methods: {
        clickHandler(ev) {
            let {isLoading, isDisabled} = this
            if (isLoading || isDisabled) {
                return
            }
            this.$emit('click', ev);
            if (this.$parent.$options.name === 'ButtonGroup') {
                this.$parent.$emit('input', this.label);
                this.$parent.$emit('on-change', this.label);
            }
        },
        setActive(label) {
            this.currentLabel = label;
        }
    },

}
</script>
