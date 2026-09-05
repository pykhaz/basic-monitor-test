/**
 *       title: js/full_screen.js
 *      author: khaz
 *        desc: debug module for basic_test_monitor
 *  created on: 2026-08-31 13:16:20.666606
 */

document.addEventListener('keydown', (event) => {
  // 1. Ignore if user is typing in a text field or textarea
  const activeElement = document.activeElement;
  const isInput = activeElement.tagName === 'INPUT' || 
                  activeElement.tagName === 'TEXTAREA' || 
                  activeElement.isContentEditable;

  if (isInput) return;

  // 2. Reacting to key 'f'/'F'
  if (event.key === 'f' || event.key === 'F') {
    // Prevent default action (e.g. page search
    //  in some browsers)
    event.preventDefault();

    // 3. Toggle full screen mode
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error while switching on full screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error while switching off full screen mode: ${err.message}`);
      });
    }
  }
});
