/**
 *       title: touch_engine.js
 *      author: khaz
 *        desc: Maintenance of touch gestures for basic_monitor_test
 *  created on: 2026-09-04 19:53:42.880928
 */

const touchXes = new Queue();
const touchYes = new Queue();

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const minSwipeDistance = 50; // Min. pixel distance to treat the movement
                             //  as swipe

const targetArea = document.body; // or certain element, e.g.
                                  //  document.getElementById('canvas')

targetArea.addEventListener('touchend', (e) => {
        e.preventDefault(); // Blocks page scrolling
                            // during swipe

        touchXes.clear();
        touchYes.clear();
        // handleGesture("touchend");
    }, { passive: false });


targetArea.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Blocks page scrolling
                            // during swipe

    touchXes.enqueue(e.touches[0].clientX);
    touchYes.enqueue(e.touches[0].clientY);
    const deltaX = touchXes.peek(-1) - touchXes.peek();
    const deltaY = touchYes.peek(-1) - touchYes.peek();


    touchStartX = touchXes.peek(0);
    touchEndX = touchXes.peek(-1);
    touchStartY = touchYes.peek(0);
    touchEndY = touchYes.peek(-1);

    handleGesture("touchmove");
    }, { passive: false });

function handleGesture(source = "...") {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    let [r, g, b] = getInitialRGB();

    const step = deltaY < 0 ? 1 : -1; // Change to e.g. 5 for quicker scroll

    [r, g, b] = calcRGB(r, g, b, step);

    let lightness = 0;
    const hex = rgbToHex(r, g, b);
    const STEP = 0.5;

    if (deltaY < 0) {
      // Turning up: brightening (0% -> 100%)
      lightness = Math.min(100, lightness + STEP);
    } else {
      // Turning down: darkening (100% -> 0%)
      lightness = Math.max(0, lightness - STEP);
    }
    const hexDec = parseInt(hex.replace('#', ''), 16);

    // Updating the background and text
    document.body.style.backgroundColor = hex;
    infoEl.textContent = hex;
    try {
        lValEl.textContent = (hexDec/16777215*100).toFixed(1);
    }
    catch (err) {
    }
}
