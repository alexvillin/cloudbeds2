import Vue from 'vue'

const Helper = {
    isLoadBeforehand: false,
    shiftOffset: 300,
    getWindowHeight() {
        return document.documentElement.clientHeight
    },
    getWindowWidth() {
        return document.documentElement.clientWidth
    },
    getElementHeight(el) {
        return el.clientHeight;
    },
    getElementWidth(el) {
        return el.clientWidth;
    },
    getScrollOffsetHeight() {
        return window.pageYOffset || document.documentElement.scrollTop;
    },
    getScrollOffsetWidth() {
        return window.pageXOffset || document.documentElement.scrollLeft
    },
    formatDate(val) {
        return Vue.moment(val).format("DD.MM.YYYY hh:mm:ss")
    },
    mergeArrays(arr1, arr2) {
        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            arr2.forEach(val => {
                if (arr1.indexOf(val) === -1) {
                    arr1.push(val)
                }
            })
        } else {
            console.error("Not an array passed");
        }
        return arr1;
    },
    diffArrays(arr1, arr2) {
        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            arr2.forEach(val => {
                let index = arr1.indexOf(val);
                if (index !== -1) {
                    arr1.splice(index, 1)
                }
            })
        } else {
            console.error("Not an array passed");
        }
        return arr1;
    },
    isElementBottomVisible(el, offset = 0) {
        let clientWindowHeight = this.getWindowHeight();
        let scrollOffset = this.shift(this.getScrollOffsetHeight());
        offset = offset || el.offsetTop;
        if (clientWindowHeight + scrollOffset >= offset + el.offsetHeight) {
            return true;
        }
    },
    isElementTopVisible(el, offset = 0) {
        let clientWindowHeight = this.getWindowHeight();
        let scrollOffset = this.shift(this.getScrollOffsetHeight())
        offset = offset || el.offsetTop;
        if (scrollOffset <= offset) {
            return true;
        }
    },
    isElementRightVisible(el, offset = 0) {
        let clientWindowWidth = this.getWindowWidth();
        let scrollOffset = this.shift(this.getScrollOffsetWidth())
        offset = offset || el.offsetLeft;
        if (clientWindowWidth + scrollOffset >= offset + el.offsetWidth) {
            return true;
        }
    },
    isElementLeftVisible(el, offset = 0) {
        let clientWindowWidth = this.getWindowWidth();
        let scrollOffset = this.shift(this.getScrollOffsetWidth())
        offset = offset || el.offsetLeft;
        if (scrollOffset <= offset) {
            return true;
        }
    },
    shift(val) {
        return this.isLoadBeforehand 
            ? val + this.shiftOffset 
            : val;
    },
    unshift(val) {
        return this.isLoadBeforehand 
            ? val - this.shiftOffset
            : val;
    },
}

export default Helper;
