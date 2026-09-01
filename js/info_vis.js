/**
* File:    info_vis.js
* Author:  khaz
* Date:    2026-08-30 17:19:00
*/

    var vis = true;
    const info = document.getElementById("info");
    const infoVisible = new Map();
    // infoVisible.set(false, "hidden");
    // infoVisible.set(true, "visible");

    window.addEventListener("keydown", function (event) {
        if (event.key == "i" || event.key === "I") {
            vis = !vis;
            //
            // info.style.visibility = infoVisible.get(vis);
            info.style.visibility = vis ? "visible" : "hidden";
        }
    });
