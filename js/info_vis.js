/**
 *       title: js/info_vis.js
 *      author: khaz
 *        desc: toggling visibility for basic_test_monitor info element
 *  created on: 2026-08-30 17:19:00
 */

    var vis = true;
    const info = document.getElementById("info");
    // const infoVisible = new Map();

    window.addEventListener("keydown", function (event) {
        if (event.key == "i" || event.key === "I") {
            vis = !vis;

            info.style.visibility = vis ? "visible" : "hidden";
        }
    });
