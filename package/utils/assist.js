/**
 *[typeOf 判断对象类型]
 * @param  {[Object,String]} obj     [description]
 * @return {[String]}           [返回值]
 */
export function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
        '[object Promise]': 'promise',
        '[object Set]': 'set',
        '[object Symbol]': 'symbol',
        '[object Map]': 'map'
    };
    return map[toString.call(obj)];
}
/**
 *[deepCopy 深拷贝对象]
 * @param  {[Object]} data     [description]
 * @return {[Object]}           [返回值]
 */
export function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}


/**
 * [oneOf 判断某个值是否在数组中]
 * @param  {[type]} value     [description]
 * @param  {[Object]} validList [description]
 * @return {boolean}           [返回值]
 */
export function oneOf(value, validList) {

    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}


/**
 * [findComponentUpward 查找某个组件的父组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @param  {[String]} componentNames [description]
 * @return {[Object]}           [返回值]
 */
export function findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

/**
 * [findComponentsUpward 查找某个组件的父组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @param  {[String]} rootComponentName 查找到某个节点为止，不传则一直查找
 * @return {[Object]}           [返回值]
 */
export function findComponentsUpward(context, componentName, rootComponentName) {
    let parents = [];
    let parent = context.$parent;
    let name = parent.$options.name;
    if (parent && name !== rootComponentName) {
        if (name === componentName) parents.push(parent);
        return parents.concat(findComponentsUpward(parent, componentName, rootComponentName));
    }

    return parents;
}

/**
 *[findComponentDownward 查找某个组件的子组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @return {[Object]}           [返回值]
 */
export function findComponentDownward(context, componentName) {
    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
            }
        });

        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i];
            const name = child.$options.name;
            if (name === componentName) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                if (children) break;
            }
        }
    }
    return children;
}


/**
 *[findComponentsDownward 查找某个组件的子组件]
 * @param  {[Object]} context     [description]
 * @param  {[String]} componentName [description]
 * @param  {[Array]} components [description]
 * @return {[Object]}           [返回值]
 */
export function findComponentsDownward(context, componentName, components = []) {
    const childrens = context.$children;

    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name;
            const childs = child.$children;

            if (name === componentName) components.push(child);
            if (childs.length) {
                const findChilds = findComponentsDownward(child, componentName, components);
                if (findChilds) components.concat(findChilds);
            }
        });
    }
    return components;
}
/**
 *[firstUpperCase 第一个字母大写]
 * @param  {[String]} str     [description]
 * @return {[String]}           [返回值]
 */
export function firstUpperCase(str) {
    return str.toString()[0].toUpperCase() + str.toString().slice(1);
}
/**
 *[scrollTop 动态计算滚动条位置]
 * @param  {[String]} el     [description]
 * @param  {[Number]} from     [description]
 * @param  {[Number]} to     [description]
 * @param  {[Number]} duration     [description]
 * @return {[Undefined]}           [返回值]
 */
export function scrollTop(el, from = 0, to, duration = 500) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            }
        );
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil(difference / duration * 50);

    /**
     *[scroll 动态计算滚动条位置]
     * @param  {[Number]} start     [description]
     * @param  {[Number]} end     [description]
     * @param  {[Number]} step     [description]
     * @return {[Undefined]}           [返回值]
     */
    function scroll(start, end, step) {
        if (start === end) return;

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
            d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}
/**
 *[lightenDarkenColor 按比例更改16进制颜色]
 * @param  {[String]} color     [description]
 * @param  {[String]} amt       [description]
 * @return {[Object]}           [返回值]
 */
export function lightenDarkenColor(color, amt) {
    let regRgb = /^rgb\(\d+,\d+,\d+\)$/,
        regRgba = /^rgba\(\d+,\d+,\d+,.*\)$/,
        regSingle = /^#[\d|a-f|A-F]{3}$/,
        regDouble = /^#[\d|a-f|A-F]{6}$/,
        r,
        g,
        b;
    if (regSingle.test(color) || regDouble.test(color)) {
        let defaultAmt = 9,
            bitR = 8,
            bitG = 4,
            G16 = 0x0F,
            B16 = 0x00F,
            max = 15;
        if (regDouble.test(color)) {
            defaultAmt = 150;
            bitR = 16;
            bitG = 8;
            G16 = 0x00FF;
            B16 = 0x0000FF;
            max = 255;
        }
        color = color.slice(1);
        amt = amt || defaultAmt;
        let num = parseInt(color, 16);
        // red part
        r = (num >> bitR) + amt;
        if (r > max) {
            r = max;
        } else if (r < 0) {
            r = 0;
        }
        // green part
        g = ((num >> bitG) & G16) + amt;
        if (g > max) {
            g = max;
        } else if (g < 0) {
            g = 0;
        }
        // blue part
        b = (num & B16) + amt;
        if (b > max) {
            b = max;
        } else if (b < 0) {
            b = 0;
        }

        return '#' + (b | (g << bitG) | (r << bitR)).toString(16);
    } else if (regRgb.test(color) || regRgba.test(color)) {
        amt = amt || 150;
        let arr = color.match(/\d+/g);
        // red part
        r = arr[0] + amt;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }
        // green part
        g = arr[1] + amt;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }
        // blue part
        b = arr[2] + amt;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }
        if (regRgba.test(color)) {
            return 'rgba(' + r + ',' + g + ',' + b + color.slice(color.lastIndexOf(','));
        }
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    } else {
        return color;
    }
}

/**
 *[getPropByPath 按路径寻找校验规则]
 * @param  {[String]} obj     [description]
 * @param  {[String]} path    [description]
 * @param  {[String]} strict  [description]
 * @return {[Object]}           [返回值]
 */
export function getPropByPath(obj, path, strict) {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    let keyArr = path.split('.');
    let i = 0;
    for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break;
        let key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        } else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!');
            }
            break;
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null
    };
}

// 防抖和节流，copy from lodash
const root = typeof window !== 'undefined' ? window : global;
/**
 *
 * @param {*} value 传入值
 * @returns {Boolean} 是否为对象
 */
function isObject(value) {
    const type = typeof value
    return value != null && (type == 'object' || type == 'function')
}
/**
 *
 * @param {Function} func 函数
 * @param {*} wait 等待时间
 * @param {*} options 传入选项
 * @returns {*} 封装对象
 */
export function debounce(func, wait, options) {
    let lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime

    let lastInvokeTime = 0
    let leading = false
    let maxing = false
    let trailing = true

    // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    const useRAF = (!wait && wait !== 0 && typeof root.requestAnimationFrame === 'function')

    if (typeof func != 'function') {
        throw new TypeError('Expected a function')
    }
    wait = +wait || 0
    if (isObject(options)) {
        leading = !!options.leading
        maxing = 'maxWait' in options
        maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }
    /**
     *
     * @param {*} time 时间
     * @returns {*} 函数
     */
    function invokeFunc(time) {
        const args = lastArgs
        const thisArg = lastThis

        lastArgs = lastThis = undefined
        lastInvokeTime = time
        result = func.apply(thisArg, args)
        return result
    }
    /**
     *
     * @param {*} pendingFunc 函数
     * @param {*} wait 等待时间
     * @returns {*} setTimeout
     */
    function startTimer(pendingFunc, wait) {
        if (useRAF) {
            return root.requestAnimationFrame(pendingFunc)
        }
        return setTimeout(pendingFunc, wait)
    }
    /**
     *
     * @param {*} id id
     * @returns {*} undefined，执行函数
     */
    function cancelTimer(id) {
        if (useRAF) {
            return root.cancelAnimationFrame(id)
        }
        clearTimeout(id)
    }

    /**
     * @param {*} time time
     * @returns {*} result
     */
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time
        // Start the timer for the trailing edge.
        timerId = startTimer(timerExpired, wait)
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result
    }

    /**
     * @param {*} time time
     * @returns {*} result
     */
    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime
        const timeSinceLastInvoke = time - lastInvokeTime
        const timeWaiting = wait - timeSinceLastCall

        return maxing ?
            Math.min(timeWaiting, maxWait - timeSinceLastInvoke) :
            timeWaiting
    }

    /**
     * @param {*} time time
     * @returns {*} result
     */
    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime
        const timeSinceLastInvoke = time - lastInvokeTime

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
            (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
    }

    /**
     * @returns {*} result
     */
    function timerExpired() {
        const time = Date.now()
        if (shouldInvoke(time)) {
            return trailingEdge(time)
        }
        // Restart the timer.
        timerId = startTimer(timerExpired, remainingWait(time))
    }

    /**
     * @param {*} time time
     * @returns {*} result
     */
    function trailingEdge(time) {
        timerId = undefined

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time)
        }
        lastArgs = lastThis = undefined
        return result
    }
    /**
     * @returns {*} result
     */
    function cancel() {
        if (timerId !== undefined) {
            cancelTimer(timerId)
        }
        lastInvokeTime = 0
        lastArgs = lastCallTime = lastThis = timerId = undefined
    }
    /**
     * @returns {*} result
     */
    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now())
    }
    /**
     * @returns {Boolean} Boolean
     */
    function pending() {
        return timerId !== undefined
    }
    /**
     *
     * @param  {...any} args 参数
     * @returns {*} result
     */
    function debounced(...args) {
        const time = Date.now()
        const isInvoking = shouldInvoke(time)

        lastArgs = args
        lastThis = this
        lastCallTime = time

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime)
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = startTimer(timerExpired, wait)
                return invokeFunc(lastCallTime)
            }
        }
        if (timerId === undefined) {
            timerId = startTimer(timerExpired, wait)
        }
        return result
    }
    debounced.cancel = cancel
    debounced.flush = flush
    debounced.pending = pending
    return debounced
}

/**
 * 节流函数
 * @param {Object} func 函数
 * @param {*} wait 等待时间
 * @param {*} options 选项
 * @returns {*} 节流函数
 */
export function throttle(func, wait, options) {
    let leading = true
    let trailing = true

    if (typeof func != 'function') {
        throw new TypeError('Expected a function')
    }
    if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }
    return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
    })
}