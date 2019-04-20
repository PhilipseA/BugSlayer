let app: any;

(function () {

    let init = function () {
        app = new Game();
    };

    window.addEventListener('load', init);
})();