/**
* File:    info.js
* Author:  khaz
* Date:    2026-08-30 17:03:35.469845
*/

  const infoEl = document.getElementById('hex-val');
  const lValEl = document.getElementById('l-val');

  // Pobieramy początkowy kolor z CSS i parsujemy do tabeli [r, g, b]
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

  // Zamiana [r, g, b] na kod #RRGGBB
  function rgbToHex(r, g, b) {
    const toHex = c => Math.round(c).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // Funkcja pomocnicza do nakładania ograniczeń 0 - 255
  const clamp = val => Math.min(255, Math.max(0, val));

  window.addEventListener('wheel', (e) => {
    e.preventDefault();

    // Kierunek kręcenia kółkiem: do góry = jaśniej/mocniej, w dół = ciemniej
    const step = e.deltaY < 0 ? 1 : -1; // Zmień na np. 5 dla szybszego skoku

    // BADANIE PRZYPADKÓW SYSTEMU KOLORÓW:

    // 1. Strona czarna (#000000): zmieniaj równomiernie wszystkie 3 kanały
    //   w stronę szarości
    if (r === g && g === b && r === 0 && step > 0) {
      r = g = b = 1;
    } else if (r === g && g === b) {
      // Dla skali szarości / bieli / czerni - zmieniaj wszystkie kanały naraz
      r = clamp(r + step);
      g = clamp(g + step);
      b = clamp(b + step);
    } 
    // 2. Kolory jednokanałowe (np. czysty zielony #00FF00, czerwony #FF0000,
    //     niebieski #0000FF)
    else {
      // Zmieniaj tylko te kanały, które są aktywne (większe od 0)
      if (r > 0) r = clamp(r + step);
      if (g > 0) g = clamp(g + step);
      if (b > 0) b = clamp(b + step);
    }

    let lightness = 0;
    const hex = rgbToHex(r, g, b);
    const STEP = 0.5; 

    if (e.deltaY < 0) {
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

  }, { passive: false });
