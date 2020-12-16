<template>
    <div class="container origin-container">
        <div
            class="bd-content"
            v-if="readMe"
        >
            <div
                class="colTop"
                v-html="intro[0]"
            />
            <div class="code-demo">
                <div
                    v-for="(item,index) in readMe"
                    :key="index"
                    v-editor="index"
                >
                    <div
                        v-if="index!=0 && index!=100"
                        v-html="item.html"
                    />
                </div>
            </div>
            <div
                class="apiBox"
                v-html="intro[1]"
                v-editor
            />
        </div>
        <div
            class="menu-time"
            v-if="readMe"
        >
            <!-- <j-timeline>
                <j-timeline-item
                    v-for="(item,index) in readMe"
                    :key="'menu'+index">
                    <p v-html="renderH2(item.html)"></p>
                </j-timeline-item>
            </j-timeline> -->
        </div>
        <div
            class="cpts-menus clearfix"
            v-if="readMe"
        >
            <router-link
                style="float:left"
                :to="{path:'/components/'+linkRoute[0]}"
                v-if="linkRoute[0]"
            >
                <!-- <j-icon
                    type="arrow-left"
                    font-size="20">
                </j-icon> -->
                <span>{{ mdAllMeta[linkRoute[0]].title }} {{ mdAllMeta[linkRoute[0]].subtitle }}</span>
            </router-link>
            <router-link
                style="float:right"
                :to="{path:'/components/'+linkRoute[1]}"
                v-if="linkRoute[1]"
            >
                <span>{{ mdAllMeta[linkRoute[1]].title }} {{ mdAllMeta[linkRoute[1]].subtitle }}</span>
                <!-- <j-icon
                    type="arrow-right"
                    font-size="20">
                </j-icon> -->
            </router-link>
        </div>
    </div>
</template>
<script>
import {mdAllMeta, mdFileUrl} from '../../content';
import {importAll, importMdUrl, renderReadMeMdList} from '../../utils/mdUtil.js'
export default {
    name: 'Components',
    data() {
        return {
            mdAllMeta: mdAllMeta,
            readMe: '',
            navType: ['Basic', 'Layout', 'Navigation', 'Form', 'Data', 'Notice', 'Other'],
            loading: null,
            isLoading: false,
            timer: null,
            currentRoute: ''
        };
    },
    computed: {
        intro() {
            let oldHtml = this.readMe[0].html
            let newHtml = oldHtml.split('<hr>')
            return newHtml
        },
        sortKeys() {
            let navType = this.navType
            let mdAllMeta = this.mdAllMeta
            let guid = this.guid
            let sortMenu = {}
            navType.forEach((item) => {
                for (let key in mdAllMeta) {
                    if (mdAllMeta[key].type == item) {
                        sortMenu[key] = mdAllMeta[key]
                    }
                }
            })
            let sortKeys = Object.keys(sortMenu)
            return sortKeys
        },
        linkRoute() {
            let sortKeys = this.sortKeys
            let name = this.$route.params.id || 'Button'
            let index = sortKeys.indexOf(name)
            if (index == 0) {
                return ['', sortKeys[index + 1]]
            } else if (index == sortKeys.length - 1) {
                return [sortKeys[index - 1], '']
            } else {
                return [sortKeys[index - 1], sortKeys[index + 1]]
            }
        }
    },

    watch: {
        '$route'(to, from) {
            let name = this.$route.params.id;
            if (this.currentRoute !== name) {
                this.readMe = null;
                this.reload();
            }
        }
    },
    methods: {
        renderH2(text) {
            const match = (regex, text) => (regex.exec(text) || [])[0]
            const STYLE_REGEX = /<(h2)[^<>]*?>(.|\s)*?<\/h2>/g;
            let style = match(STYLE_REGEX, text)
            style = style.replace(/h2/g, 'a').replace(/id="/g, 'href="#')
            return style
        },
        renderHtmlDate(name) {
            const me = this
            /*对md内容进行修改，加排序,
            通过name获取相应的文件夹下的md*/
            const mdUrl = mdFileUrl[name]
            //把多个md解析成自定义的html,返回值是一个对象，key值是数字
            let demo = renderReadMeMdList(mdUrl);
            me.readMe = demo;
            this.loading && this.loading.close() && (this.loading = null);
        },
        reload() {
            const name = this.$route.params.id || 'Button';
            this.currentRoute = name;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.renderHtmlDate(name);
            }, 100);
        }
    },
    created() {
        this.reload();
    },
};
</script>