<template>
    <div :class="wrapClasses">
        <slot></slot>
    </div>
</template>
<script>
import {oneOf} from '../../utils/assist';

export default {
    name: 'ButtonGroup',
    props: {
        size: {
            validator(value) {
                return oneOf(value, ['small', 'large', 'medium', 'default']) || !value;
            }
        },
        shape: {
            validator(value) {
                return oneOf(value, ['circle', 'rectangle']) || !value;
            }
        },
        isBlock: Boolean,
        isVertical: {
            type: Boolean,
            default: false
        },
        prefixCls: {
            type: String,
            default: 'jad'
        },
        value: [String, Number],
        className: String
    },
    computed: {
        groupPrefixCls() {
            return this.prefixCls + '-btn-group';
        },
        wrapClasses() {
            let {
                groupPrefixCls,
                isVertical,
                className,
                isBlock,
                shape,
                size
            } = this;
            return [
                `${groupPrefixCls}`,
                {
                    [`${groupPrefixCls}-${size}`]: !!size,
                    [`${groupPrefixCls}-${shape}`]: !!shape,
                    [`${groupPrefixCls}-vertical`]: isVertical,
                    [`${groupPrefixCls}-block`]: isBlock,
                    [`${className}`]: !!className
                }
            ];
        }
    },
    watch: {
        value(val) {
            this.updateChildren(val);
        }
    },
    mounted() {
        this.updateChildren(this.value);
    },
    methods: {
        updateChildren(val) {
            this.$children.forEach(child => {
                child.setActive && child.setActive(val);
            });
        }
    }
};
</script>