/**
* -------
* File:    js/full_screen.js
* Author:  khaz
* Date:    2026-08-31 13:16:20.666606
-------
*/

document.addEventListener('keydown', (event) => {
  // 1. Ignoruj, jeśli użytkownik pisze w polu tekstowym lub textarea
  const activeElement = document.activeElement;
  const isInput = activeElement.tagName === 'INPUT' || 
                  activeElement.tagName === 'TEXTAREA' || 
                  activeElement.isContentEditable;

  if (isInput) return;

  // 2. Reaguj na klawisz 'f' lub 'F'
  if (event.key === 'f' || event.key === 'F') {
    // Zapobiegaj domyślnemu zachowaniu (np. wyszukiwaniu na stronie w
    //  niektórych przeglądarkach)
    event.preventDefault();

    // 3. Przełączaj tryb pełnoekranowy (Toggle)
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Błąd włączania trybu pełnoekranowego: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Błąd wyłączania trybu pełnoekranowego: ${err.message}`);
      });
    }
  }
});
