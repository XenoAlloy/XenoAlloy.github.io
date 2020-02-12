(function () {
    document.head.insertAdjacentHTML('beforeend', '<link rel ="stylesheet" href ="assets/css/format.css">');
    var _UA = navigator.userAgent;
    if (_UA.indexOf('iPhone') > -1 ||
    _UA.indexOf('iPod') > -1 ||
    _UA.indexOf('Android') > -1) {
        document.head.insertAdjacentHTML('beforeend', '<link rel ="stylesheet" href ="assets/css/style_mobile.css">');
        document.write('<script src="assets/js/menuButton.js" type="text/javascript"></script>');
        document.write('<script src="assets/js/scroll.js" type="text/javascript"></script>');
    } else {
        document.head.insertAdjacentHTML('beforeend', '<link rel ="stylesheet" href ="assets/css/style_pc.css">');
    }
})();