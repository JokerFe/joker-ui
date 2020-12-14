/**
 * 获取滚动条宽度
 * @param {*} prefixCls 组件库前缀
 * @returns {number} 宽度
 */
export function getScrollbarWidth(prefixCls) {
    prefixCls = prefixCls || 'jad';
    if (!document) return;

    let creatDiv = document.createElement('div'), scrollbarWidth = 0;
    creatDiv.className = `${prefixCls}-scrollbar-wrap`;
    creatDiv.style.width = '100px';
    creatDiv.style.height = '100px';
    creatDiv.style.overflowY = 'scroll';

    document.body.appendChild(creatDiv);

    scrollbarWidth = creatDiv.offsetWidth - creatDiv.clientWidth;
    if (document.body !== null) document.body.removeChild(creatDiv);

    return scrollbarWidth;
}