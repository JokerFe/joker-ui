import Vue from 'vue'

let hasInitZIndex = false;
let zIndex = 2000;

const PopupManager = {
    nextZIndex: function () {
        return PopupManager.zIndex++;
    }
}

let getIndex = function () {
    return (Vue.prototype.$ELEMENT || {}).zIndex || zIndex;
}

export const setPopup = (fn) => {
    getIndex = fn || getIndex;
}

Object.defineProperty(PopupManager, 'zIndex', {
    configurable: true,
    get() {
        if (!hasInitZIndex) {
            zIndex = getIndex();
            hasInitZIndex = true;
        }
        return zIndex;
    },
    set(value) {
        zIndex = value;
    }
});

export default PopupManager;