# 🖥️ Monitor Test Suite

A lightweight, dependency-free HTML5/JS tool designed for quick monitor testing
and screen calibration (LCD, VA, IPS, OLED). Easily test for dead pixels,
backlight bleeding, IPS glow, color uniformity, near-black performance, and
geometry.

🚀 **[Try the Live Demo](https://pykhaz.github.io/basic-monitor-test/)**

---

## 🎨 Key Features

* **Solid Color Screens:** Fullscreen red, green, blue, black, and white
  testing patterns for pixel inspection. Each color test uses a 5rem border as
  a fixed reference color. The inner area can be gradually changed with the
  mouse wheel, making subtle differences easier to perceive.
* **Near-Black & Near-White Tuning:** Fine-tune brightness using the mouse
  wheel (RGB lightness/intensity scale) to detect black crush or vignetting.
* **Dynamic Grid Pattern:** Adjustable rectangular grid powered by CSS patterns
  for testing geometry, focus, and aspect ratios.
* **Zero Dependencies:** Pure vanilla HTML, CSS, and JavaScript — loads
  instantly in any modern browser.

---

## ⌨️ Controls & Keyboard Shortcuts

| Action | Control | Description |
| :--- | :--- | :--- |
| **Adjust Intensity / Size** | `Mouse Wheel` | Modifies color brightness or grid cell scale |
| **Info Overlay** | `Key I` | Toggles the HEX / HSL readout overlay |
| **Full screen** | `Key F`/`F11` | Toggles full screen |

---

## 🛠️ Local Setup

No build tools or `npm` packages are required.

1. Clone the repository:
   ```bash
   git clone https://github.com/pykhaz/basic-monitor-test.git
   cd basic-monitor-test
   ```
