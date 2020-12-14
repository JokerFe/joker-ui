---
order: 4
---

## 按钮尺寸
按钮有四种尺寸：大、小、默认
className可自定义添加类名
通过设置size为large和small将按钮设置为大和小尺寸，不设置为默认尺寸。
````html
<template>
<j-button size="large">
    large
</j-button>
<j-button class-name="active">
    default
</j-button>
<j-button size="small">
    small
</j-button>
<br/>
<p style="padding:10px 0">按钮组</p>
<j-button-group :size="groupSize" v-model="groupSize">
    <j-button label="large">
        large
    </j-button>
    <j-button label="medium">
        medium
    </j-button>
    <j-button label="default">
        default
    </j-button>
</j-button-group>
<div style="margin-top: 10px;"></div>
<j-button-group size="medium">
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
</j-button-group>
<p style="padding:3px 0"></p>
<j-button-group>
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
</j-button-group>
<j-button-group size="small">
    <j-button type="linear">
        small
    </j-button>
    <j-button type="linear">
        small
    </j-button>
    <j-button type="linear">
        small
    </j-button>
</j-button-group>
</template>

<script>
export default {
    data() {
        return {
            groupSize: 'large'
        }
    }
}
</script>
```