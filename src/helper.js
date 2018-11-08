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
    getScrollOffsetY() {
        return window.pageYOffset || document.documentElement.scrollTop;
    },
    getScrollOffsetX() {
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
        let scrollOffset = this.shift(this.getScrollOffsetWidth())
        offset = offset || el.offsetLeft;
        if (scrollOffset <= offset) {
            return true;
        }
    },
    shift(val) {
        return this.isLoadBeforehand ?
            val + this.shiftOffset :
            val;
    },
    /**
    *   Spiral matrix algorythm
        Calculate next step coords and run callback(x,y)
        x: Number; start position
        y: Number; start position
        fn: Function; callback
        level: Number; radius
    */
    spiralMatrix(x = 0, y = 0, fn, level = 1) {
        let op = [1, -1, 1];
        //set start position
        let startX = ++x;
        let startY = --y;
        let counter = 1;
        while (counter <= level) {
            x = startX;
            y = startY;
            for (let i = 0; i < counter * 2; i++) {
                let inc = op[i];
                let ix = counter * 2;
                let iy = counter * 2;
                while (iy) {
                    y += inc;
                    iy--;
                    fn(x, y);
                }
                //shift operation
                inc = op[i + 1];
                while (ix) {
                    x += inc;
                    ix--;
                    fn(x, y);
                }
            }
            counter++;
            startX += counter;
            startY -= counter;
        }
    }
}

export default Helper;
