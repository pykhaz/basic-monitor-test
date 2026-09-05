/**
 *       title: info.js
 *      author: khaz
 *        desc: script controlling info element for basic_test_monitor
 *  created on: 2026-08-30 17:03:35.469845
 */

const infoEl = document.getElementById('hex-val');
const lValEl = document.getElementById('l-val');
const queue = new Queue();

// Helper function for limiting values 0 - 255
// const clamp = val => Math.min(255, Math.max(0, val));
function clamp (val) {
        return Math.min(255, Math.max(0, val));
}

  // Getting initial colour from CSS and parsing it into array [r, g, b]
  function getInitialRGB() {
    const computed = window.getComputedStyle(document.body).backgroundColor;
    const match = computed.match(/\d+/g);
    return match ? match.map(Number) : [0, 255, 0];
  }

  function lightnessToHex(l) {
    const val = Math.round((l / 100) * 255);
    const hex = val.toString(16).padStart(2, '0').toUpperCase();
    return `#${hex}${hex}${hex}`;
  }

  let [r, g, b] = getInitialRGB();

  // Changing [r, g, b] into #RRGGBB code
  function rgbToHex(r, g, b) {
    const toHex = c => Math.round(c).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  window.addEventListener('wheel', (e) => {
    e.preventDefault();

    // Wheel direction: up -> brighter/more intensive, down -> darker
    const step = e.deltaY < 0 ? 1 : -1; // Change into e.g. 5 for greater speed

    // Colour system case analysis:

    [r, g, b] = calcRGB(r, g, b, step);

    let lightness = 0;
    const hex = rgbToHex(r, g, b);
    const STEP = 0.5;

    if (e.deltaY < 0) {
      // Turning up: brightening (0% -> 100%)
      lightness = Math.min(100, lightness + STEP);
    } else {
      // Turning down: darkening (100% -> 0%)
      lightness = Math.max(0, lightness - STEP);
    }
    const hexDec = parseInt(hex.replace('#', ''), 16);

    // Background and info text update
    document.body.style.backgroundColor = hex;
    infoEl.textContent = hex;
    try {
        lValEl.textContent = (hexDec/16777215*100).toFixed(1);
    }
    catch (err) {
    }

  }, { passive: false });

function calcRGB(r, g, b, step) {
    if (r === g && g === b && r === 0 && step > 0) {
      r = g = b = 1;
    } else if (r === g && g === b) {
      // For grayscale / white / black -- changing all channels at once
      r = clamp(r + step);
      g = clamp(g + step);
      b = clamp(b + step);
    } 
    // 2. One channel colours (e.g. pure green #00FF00, red #FF0000,
    //     blue #0000FF)
    else {
      // Changing only active channels (greater than 0)
      if (r > 0) r = clamp(r + step);
      if (g > 0) g = clamp(g + step);
      if (b > 0) b = clamp(b + step);
    }

    return [r, g, b];
}
