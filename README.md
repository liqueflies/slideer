# Slideer

Simple wrapper to create sliders focused on animations.
This project is a fork of `slider-manager` originally created by [Baptiste Briel](https://github.com/baptistebriel/slider-manager).

### Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred) and [Git](https://git-scm.com/).

:warning: **Warning: packages will be soon loaded to npm registry, instead use** :warning:

```
yarn add git://github.com/liqueflies/slideer.git#master
```

```
npm install --save git://github.com/liqueflies/slideer.git#master
```

**Using yarn:** 

```
yarn add slideer
```

**Using npm:** 

```
npm install slideer --save`
```

## Usage

```javascript
import Slideer from 'slideer'
import gsap from 'gsap'

const slideWrap = document.getElementById('#slider')
const slides = Array.from(slideWrap.querySelectorAll('.slides'))

const slider = new Slideer(slideWrap, {
    length: slides.length,
    loop: true,
    callback: (event) => {
        
        const index = event.current // array index
        const previous = event.previous // array index
        const direction = event.direction // +1 for next, -1 for prev

        slider.animating = true

        const windowWidth = window.innerWidth
        const tl = new TimelineMax({ paused: true, onComplete: () => {
            slider.animating = false
        }})

        tl.staggerTo(slides, 1, { cycle: {
            y: (loop) => index === loop ? 0 : windowWidth * direction
        }, ease: Expo.easeInOut}, 0, 0)

        tl.restart()
    }
})

// remember to initialize slider
slider.init()

// if you have pagination buttons
const prevControl = document.querySelector('.btn-prev')
const nextControl = document.querySelector('.btn-next')

// automatic check for loop or limit reached
prevControl.addEventListener('click', slider.goTo.call(slider, slider.getCurrentSlide() - 1), false)
nextControl.addEventListener('click', slider.goTo.call(slider, slider.getCurrentSlide() + 1), false)

```

### element
- `el`: slider wrapper element to attach swipe event

### options

- `loop`: true of false
- `delta`: delta limiter for swipe events
- `callback`: function called when user has swiped or scrolled

### methods

- `init`: add event listeners
- `getCurrentIndex`: get current slide index
- `goTo(index)`: goes to the slide index
- `destroy`: remove event listeners

## Contributors

Clone this repo:

```
git clone git://github.com/liqueflies/slideer.git
```

From project root:

- `npm run start`: run project on ```http://localhost:3100``` with BrowserSync
- `npm run bundle`: compile project
- `npm run build`: uglify project

## Tests

Tests will be available soon.

## License

MIT, see [LICENSE.md](http://github.com/liqueflies/slideer/blob/master/LICENSE.md) for details.
