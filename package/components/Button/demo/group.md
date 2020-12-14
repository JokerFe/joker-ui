---
order: 2
---

## 按钮组
适用于多个按钮的组合。


````html
<template>
<div>常规用法</div>
<div style="margin-top: 10px;">
    <j-button-group v-model="device">
        <j-button label="pc">
            PC
        </j-button>
        <j-button label="mobile">
            无线
        </j-button>
    </j-button-group>
    <j-button-group>
        <j-button>
            启动
        </j-button>
        <j-button>
            暂停
        </j-button>
        <j-button isDisabled>
            删除
        </j-button>
    </j-button-group>
</div>

<div style="margin-top: 20px;">包含图标的</div>
<div style="margin-top: 10px;">
    <j-button-group>
        <j-button>
            default
        </j-button>
        <j-button>
            <j-icon type="arrow-down"></j-icon>
        </j-button>
    </j-button-group>
    <j-button-group>
        <j-button>
            <j-icon type="arrow-left" style="vertical-align: initial;"></j-icon>
        </j-button>
        <j-button>
            <j-icon type="arrow-right" style="vertical-align: initial;"></j-icon>
        </j-button>
    </j-button-group>
    <j-button-group v-model="creative">
        <j-button 
            :key="item.label" 
            :label="item.label"
            v-for="(item,index) in labels">
            {{item.name}}
            <j-icon 
            @click.native.stop="delLabel(index)"
            v-show="item.hasClose"
            style="margin-left: 8px;"
            font-size="14"
            type="close2"></j-icon>
        </j-button>
        <j-button @click.native="addLabel">
            <j-icon 
            font-size="14"                        
            type="plus6"></j-icon>
        </j-button>
    </j-button-group>
    
</div>


<div style="margin-top: 20px;">垂直用法</div>
<div style="margin-top: 10px;" >
    <j-button-group v-model="date" isVertical>
        <j-button label="day7">
            近七日
        </j-button>
        <j-button label="day15">
            近十五日
        </j-button>
        <j-button label="day30">
            近三十日
        </j-button>
    </j-button-group>
    <j-button-group v-model="date" isVertical>
        <j-button label="day7" type="linear">
            近七日
        </j-button>
        <j-button label="day15" type="linear">
            近十五日
        </j-button>
        <j-button label="day30" type="linear">
            近三十日
        </j-button>
    </j-button-group>
</div>
</template>
<script>
export default {
    data() {
        return {
            labels: [
                {name: '创意1', label: 'creative1', hasClose: false},
                {name: '创意2', label: 'creative2', hasClose: true},
                {name: '创意3', label: 'creative3', hasClose: true}
            ],
            total: 3,
            creative: 'creative1',
            date: 'day7',
            device: 'pc'
        }
    },
    methods:{
        isClick(){
            console.log(2)
        },
        addLabel() {
            this.labels.push({
                name: `创意${this.total+1}`, 
                hasClose: true,
                label: `creative${this.total+1}`
            });
            this.total += 1;
        },
        delLabel(index) {
            this.labels.splice(index, 1)
        }
    }
}
</script>
<!-- disableButton.vue -->
````

