/**
 *       title: touch_engine.js
 *      author: khaz
 *        desc: Maintenance of touch gestures
 *  created on: 2026-09-04 19:53:42.880928
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log(` ━━━ js/touch_engine.js (Browser) ━━━\n`);
  dbglog("DOM ready, script running.");
});

const touchXes = new Queue();
const touchYes = new Queue();

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

dbglog("infoEl =", JSON.stringify(infoEl));
dbglog("lValEl =", lValEl);

const minSwipeDistance = 50; // Minimalna odległość w pikselach,
                             //  by uznać ruch za swipe

const targetArea = document.body; // lub konkretny element, np.
                                          //  document.getElementById('canvas')

targetArea.addEventListener('touchend', (e) => {
        e.preventDefault(); // Blokuje scrollowanie strony
                            //  podczas przeciągania

        touchXes.clear();
        touchYes.clear();
        // handleGesture("touchend");
    }, { passive: false });


targetArea.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Blokuje scrollowanie strony
                        //  podczas przeciągania

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
    dbglog(`r = ${r}, g = ${g}, b = ${b} (0)`);

    // Sprawdź, czy ruch był głównie poziomy czy pionowy
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Ruch poziomy
        if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
            console.log('Swipe right by ', deltaX, ", rgb = ", [r, g, b],
                        " [handleGesture from " +
                        `${source}]`);
        } else {
            console.log('Swipe left by ', deltaX, ", rgb = ", [r, g, b],
                        " [handleGesture from " +
                        `${source}]`);
            }
        }
        } else {  // ->
        // Ruch pionowy
        if (Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0) {
                console.log('Swipe down by ', -deltaY, ", rgb = ", [r, g, b],
                            " [handleGesture from " +
                            `${source}]`);
            } else {
            console.log('Swipe up by ', -deltaY, ", rgb = ", [r, g, b],
                        " [handleGesture from " +
                        `${source}]`);
            }
        }
    }  // <-

    const step = deltaY < 0 ? 1 : -1; // Zmień na np. 5 dla szybszego skoku

    dbglog(`r = ${r}, g = ${g}, b = ${b} (1)`);
    [r, g, b] = calcRGB(r, g, b, step);

    let lightness = 0;
    const hex = rgbToHex(r, g, b);
    const STEP = 0.5;
    console.log("hex =", hex, " (0)")

    if (deltaY < 0) {
      // Kręcenie w górę: rozjaśnianie (0% -> 100%)
      lightness = Math.min(100, lightness + STEP);
    } else {
      // Kręcenie w dół: ściemnianie (100% -> 0%)
      lightness = Math.max(0, lightness - STEP);
    }
    const hexDec = parseInt(hex.replace('#', ''), 16);

    // Aktualizacja tła i napisu
    document.body.style.backgroundColor = hex;
    infoEl.textContent = hex;
    try {
        lValEl.textContent = (hexDec/16777215*100).toFixed(1);
    }
    catch (err) {
    }
}
