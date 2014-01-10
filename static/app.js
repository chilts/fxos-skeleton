// show/hide '#options-view'
var btnOptions      = document.querySelector("#options-btn");
var viewOptions     = document.querySelector("#options-view");
var btnCloseOptions = document.querySelector("#close-btn");

btnOptions.addEventListener ('click', function () {
    viewOptions.classList.remove('move-down');
    viewOptions.classList.add('move-up');
});

btnCloseOptions.addEventListener ('click', function () {
    viewOptions.classList.remove('move-up');
    viewOptions.classList.add('move-down');
});
