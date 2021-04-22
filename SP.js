window.onload = function () {
    // chrome scroll saving block
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    var main = document.getElementById('main');
    main.style.transitionDuration = "1s";

    var maxIndex = main.childElementCount;
    var curIndex = 0;
    var isScrolling = false;
    var startY = 0;
    var nowY = 0;
    var isClick = false;

    function PageUp() {
        if (isScrolling) {
            return;
        }
        isScrolling = true;
        curIndex++;
        if (curIndex >= maxIndex) {
            // curIndex = 0;
            curIndex = maxIndex - 1;
            isScrolling = false;

        }
        PageMove();

    }
    function PageDown() {
        if (isScrolling) {
            return;
        }
        isScrolling = true;
        curIndex--;
        if (curIndex < 0) {
            // curIndex = maxIndex - 1;
            curIndex = 0;
            isScrolling = false;
        }
        PageMove();
    }
    function PageMove() {
        main.style.transform = "translate(0,-" + window.innerHeight * curIndex + "px)";
    }
    document.addEventListener('wheel', function (e) {
        if (e.deltaY < 0) {
            PageDown();
        } else {
            PageUp();
        }
    });
    window.addEventListener('resize', function () {
        isScrolling = false;
        main.style.transitionDuration = "";
        main.style.transform = "translate(0,-" + window.innerHeight * curIndex + "px)";
        void main.getBoundingClientRect();
        main.style.transitionDuration = "1s";


    });
    document.addEventListener('touchstart', function (e) {
        if (isScrolling) {
            return false;
        }

        main.style.transitionDuration = "";
        startY = e.touches[0].pageY;
        nowY = startY;
    });
    document.addEventListener('touchmove', function (e) {
        if (isScrolling) {
            return false;
        }
        nowY = e.touches[0].pageY;
        main.style.transform = "translate(0," + -((window.innerHeight * curIndex) - (nowY - startY)) + "px)";
    });
    document.addEventListener('touchend', function () {
        void main.getBoundingClientRect();
        main.style.transitionDuration = "1s";
        let diff = nowY - startY;
        if (diff > 100 || diff < -100) {
            if (diff > 0) {
                PageDown();
            } else {
                PageUp();
            }
        } else {
            PageMove();
        }

    });


    main.addEventListener('transitionend', function () {
        isScrolling = false;
    });
    document.addEventListener('mousedown', function (e) {
        if (isScrolling) {
            return;
        }
        isClick = true;
        startY = e.screenY;
        nowY = startY;
        main.style.transitionDuration = "";
    });
    document.addEventListener('mousemove', function (e) {
        if (isScrolling) {
            return;
        }
        if (isClick) {
            nowY = e.screenY;
            main.style.transform = "translate(0," + -((window.innerHeight * curIndex) - (nowY - startY)) + "px)";

        }
    });
    document.addEventListener('mouseup', function (e) {
        if (isScrolling) {
            return;
        }
        if (isClick) {
            isClick = false;
            main.style.transitionDuration = "1s";
            var diff = nowY - startY;
            if (diff > 100 || diff < -100) {
                if (diff > 0) {
                    PageDown();
                } else {
                    PageUp();
                }
            } else {
                PageMove();
            }
        }

    });
}