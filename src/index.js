import Hammer from 'hammerjs'

export default class Slideer {

    constructor(el, opt = {}) {

        if(!el)
            console.error('You need to provide an element in costructor')

        if(!opt.callback)
            console.error('You need to provide a callback function in the options')

        this.el = el
        this.animating = false

        this.index = opt.startIndex ? opt.startIndex : 0
        this.length = opt.length - 1

        this.options = {
            loop: opt.loop || false,
            callback: opt.callback,
            delta: opt.delta || 1
        }

        this.hammer = null

        this.onSwipe = this.onSwipe.bind(this)
    }

    init() {

        this.hammer = new Hammer.Manager(this.el, { touchAction: 'pan-y' })
        this.hammer.add(new Hammer.Swipe({
            direction: Hammer.DIRECTION_HORIZONTAL
        }))
        this.hammer.on('swipe', this.onSwipe)
    }

    destroy() {

        this.hammer.off('swipe', this.onSwipe)
        this.hammer.destroy()
        this.hammer = null
    }

    getNext(delta) {

        const next = delta >= this.options.delta ? this.index - 1 : this.index + 1

        return this.checkLoop(next)
    }

    checkLoop(next) {

        return next < 0 ? this.options.loop ? this.length : 0 : next > this.length ? this.options.loop ? 0 : this.length : next
    }

    getEvent(index) {

        return {
            current: index,
            previous: this.index,
            direction: index >= this.index ? 1 : -1
        }
    }

    getCurrentSlide() {

        return this.index
    }

    onSwipe(e) {

        const delta = e.deltaX

        if(this.animating || delta > -this.options.delta && delta < this.options.delta) return
        this.animating = true

        this.callback(delta)
    }

    goTo(index) {

        const check = this.checkLoop(index)
        const event = this.getEvent(check)

        if(this.animating) return
        this.animating = true

        this.index = check
        this.options.callback(event)
    }

    callback(delta) {

        const index = this.getNext(delta)
        const event = this.getEvent(index)

        this.index = index
        this.options.callback(event)
    }
}
