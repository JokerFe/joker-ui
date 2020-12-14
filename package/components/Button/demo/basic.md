---
order: 1
---
## 基础用法
基础的按钮用法。

````html
<template>
<p style="padding:0 0 10px">普通样式</p>
<j-button>
    京准通默认
</j-button>
<j-button type="primary">
    primary
</j-button>
<j-button type="success">
    success
</j-button>
<j-button type="error">
    error
</j-button>
<j-button type="warning">
    warning
</j-button>
<j-button type="info">
    info
</j-button>
<j-button type="dash">
    dash
</j-button>
<j-button type="text">
    text
</j-button>
<br/>
<p style="padding:10px 0">固定宽度</p>
<j-button style="min-width:120px">
    default
</j-button>
<j-button type="primary" style="min-width:120px">
    primary
</j-button>
<j-button type="success" style="min-width:120px">
    success
</j-button>
<j-button type="error" style="min-width:120px">
    error
</j-button>
<br/>
<p style="padding:10px 0">外框样式</p>
<j-button isOutline>
    default
</j-button>
<j-button type="primary" isOutline>
    primary
</j-button>
<j-button type="success" isOutline>
    success
</j-button>
<j-button type="error" isOutline>
    error
</j-button>
<j-button type="warning" isOutline>
    warning
</j-button>
<j-button type="info" isOutline>
    info
</j-button>
<br/>
<p style="padding:10px 0">渐变样式</p>
<j-button  isGradient type="primary">
    primary
</j-button>
<j-button type="success" isGradient>
    success
</j-button>
<j-button type="error" isGradient>
    error
</j-button>
<j-button type="warning" isGradient>
    warning
</j-button>
<j-button type="info" isGradient>
    info
</j-button>
<j-button type="linear-red">
    jzt-red
</j-button>
<br/>
<p style="padding:10px 0">图标样式</p>
<j-button icon="plus7">
    default
</j-button>
<j-button type="success" :icon="{type:'simple-calendar',color:'#fff'}">
    success
</j-button>
<j-button type="info">
    info
    <j-icon type="info4" color="#fff"></j-icon>
</j-button>

</template>
<script>
    export default {
        methods:{
            isClick(){
                console.log(2)
            }
        }
    }
</script>
<!-- basicButton.vue -->
````
