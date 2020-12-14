import * as components from './components'
// import * as directives from './directives'
import {registerComponent} from './utils/'
import {setPopup} from './utils/popperZindex'

/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */

/* istanbul ignore next */
const install = function (Vue, options = {}) {
    if (Vue._jad_pc_installed) {
        return
    }

    Vue._jad_pc_installed = true;

    // Register component plugins
    for (let plugin in components) {
        registerComponent(Vue, 'j' + plugin, components[plugin])
    }

    if (Vue.prototype.$isServer) return;
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

/* istanbul ignore next */
const lang = (code) => {
    let langVal = window['jadPcLocale'].default;
    if (code === langVal.j.locale) {
        use(langVal);
    }
};

// export default VuePlugin
const VuePlugin = {
    install,
    locale: use,
    lang,
    setPopup,
    ...components
}
// module.exports.default = module.exports = VuePlugin
export default VuePlugin