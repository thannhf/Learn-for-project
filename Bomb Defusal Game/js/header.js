window.onload = function() {
    var header = document.getElementsByTagName('header')[0];
    var headerToggleTimeOut = -1;
    var headerMouseDown = false;

    document.addEventListener('mousedown', function() {
        headerMouseDown = true;
    }, false);

    document.addEventListener('mouseup', function() {
        headerMouseDown = false;
    }, false);
};