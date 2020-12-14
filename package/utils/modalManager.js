import {typeOf} from './helper';

let modalManager = {
    modalMap: {},
    //用于存储每一层弹窗是否允许滚动
    scrollMap: {},
    active: [],
    //isScrollable存储每一层弹窗是否允许滚动的属性
    show(id, el, isScrollable) {
        if (this.modalMap[id]) {
            return this;
        }
        this.modalMap[id] = el;
        this.scrollMap[id] = isScrollable;
        this.active.push(id);
        return this;
    },
    close(id) {
        this.modalMap[id] = null;
        this.scrollMap[id] = null;
        this.active = this.active.filter(aId => aId !== id);
        return this;
    },
    showSelf(id, el, isScrollable) {
        this.show(id, el, isScrollable);
        this.active.forEach(aId => {
            if (id === aId) {
                return;
            }
            if (this.modalMap[aId].style) {
                this.modalMap[aId].style.opacity = '0';
            }
        });
        return this;
    },
    closeSelf(id) {
        this.close(id);
        this.active.forEach(aId => {
            this.modalMap[aId].style.opacity = '';
        });
        return this;
    },
    merge(data) {
        if (typeOf(data) !== 'object') return this;
        this.modalMap = Object.assign({}, this.modalMap, data);
        let ids = Object.keys(data).map(id => +id);
        this.active = [...this.active, ...ids];
        return this;
    }
};

export default modalManager