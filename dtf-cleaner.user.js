// ==UserScript==
// @name         DTF cleaner
// @namespace    https://dtf.ru/
// @version      1.0
// @description  Remove live comments and some modals and views from https://dtf.ru/
// @author       Mihail Preis
// @copyright    Copyright (c) 2023 Mihail Preis
// @updateURL    https://raw.github.com/MihailPreis/dtf-cleaner/main/dtf-cleaner.user.js
// @match        https://dtf.ru/*
// @icon         https://www.google.com/s2/favicons?domain=dtf.ru
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    let classToRemoving = [
        "layout__right-column",
        "lbs-overlay",
        "dstr-bn",
        "propaganda",
        "aside--right"
    ]

    let ignoreBodyClassList = [
        "app--propaganda-on",
        "app--livestream-on",
        "app--live-auto",
        "app--ad-allowed"
    ]

    let ignoreModule = [
        "module.propaganda",
        "module.liveStream"
    ]

    function _removeBullshit() {
        // filtering class list for old dtf design
        document.body.classList = Array.from(document.body.classList).filter(item => !ignoreBodyClassList.includes(item)).join(" ");
        // remove some classes from dtf body
        classToRemoving.forEach(className => Array.from(document.getElementsByClassName(className)).forEach(i => i.parentNode.removeChild(i)));
        // remove ALMG* views
        Array.from(document.querySelectorAll('div[class*="ALMG"]')).forEach(i => {
            var p = i.parentNode;
            if (p.parentNode && Array.from(p.classList).includes("rotator")) {
                p.parentNode.removeChild(p);
            } else {
                p.removeChild(i);
            }
        });
        // remove air modules
        Array.from(document.getElementsByTagName("air")).forEach(item => {
            if (ignoreModule.includes(item.attributes["module"].value)) {
                item.parentNode.removeChild(item);
            }
        });
    }

    // agrh, timeout is 500 for balance between workload and fast remove new created stuff 
    setInterval(_removeBullshit, 500);
})();
