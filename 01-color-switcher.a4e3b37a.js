document.addEventListener("DOMContentLoaded",(function(){const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.body;let d;function o(){n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}t.addEventListener("click",(function(){t.disabled=!0,d=setInterval(o,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(d)}))}));
//# sourceMappingURL=01-color-switcher.a4e3b37a.js.map
