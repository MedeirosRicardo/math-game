/**********************************************************
// Assignment 2
// Version 1.0
// Date: 2019-08-14
// Author: Ricardo Medeiros
// ID: 135745180
// Email: rmedeiros7@myseneca.ca
// Section: SDD
**********************************************************/
/*
    This math game consist of 3 levels game.
    First level is addition, second level is subtraction, third level is division.
*/

// Get objects from the DOM
var count = document.querySelector("#count");
var start = document.querySelector("#start");
var rules = document.querySelector("#rules");
var hiddenRules = document.querySelector("#hiddenRules");
var body = document.querySelector("body");
var timerDiv = document.querySelector("#timerDiv");
var hitsDiv = document.querySelector("#hitsDiv");
var missDiv = document.querySelector("#missDiv");
var scoreDiv = document.querySelector("#scoreDiv");
var play = document.querySelector("#play");
var result = document.querySelector("#result");
var playAgainButton = document.querySelector("#playAgainButton");

// Score Variables
var score = (localStorage.getItem("score") === null) ? 0 : localStorage.getItem("score");
var addHits = (localStorage.getItem("addHits") === null) ? 0 : localStorage.getItem("addHits");
var subHits = (localStorage.getItem("subHits") === null) ? 0 : localStorage.getItem("subHits");
var divHits = (localStorage.getItem("divHits") === null) ? 0 : localStorage.getItem("divHits");
var addMiss = (localStorage.getItem("addMiss") === null) ? 0 : localStorage.getItem("addMiss");
var subMiss = (localStorage.getItem("subMiss") === null) ? 0 : localStorage.getItem("subMiss");
var divMiss = (localStorage.getItem("divMiss") === null) ? 0 : localStorage.getItem("divMiss");
var addTimer = 90;
var subTimer = 120;
var divTimer = 150;
var maxMiss = 6;

// Levels variables
var one = 0;
var two = 0;
var answer = 0;
var arr = [];

// URL variables

// LEVEL 1 - ADDITION Variables
if (window.location.href.match(/add/)) {
    var one = getRandomInt(1, 25);
    var two = getRandomInt(1, 9);
    var answer = one + two;
    var addWrongTmp = numberArray(34); // Create an array with possible answers
    addWrongTmp.splice(answer - 1, 1); // Removes the right answer
    fy(addWrongTmp); // Shuffle the array
    var addWrong = addWrongTmp.slice(0, 8); // Get the first 8 wrong answers
    var arr = [...addWrong, answer];
    fy(arr);
}

// LEVEL 2 - SUBTRACTION Variables
if (window.location.href.match(/sub/)) {
    var one = getRandomInt(1, 25);
    var two = (one > 9) ? getRandomInt(1, 9) : getRandomInt(1, one - 1);
    var answer = one - two;
    var subWrongTmp = numberArray(25); // Create an array with possible answers
    subWrongTmp.splice(answer - 1, 1); // Removes the right answer
    fy(subWrongTmp); // Shuffle the array
    var subWrong = subWrongTmp.slice(0, 8); // Get the first 8 wrong answers
    var arr = [...subWrong, answer];
    fy(arr);
}

// LEVEL 3 - DIVISION Variables
if (window.location.href.match(/div/)) {
    var divAnswer;
    function getDivisible() {
        var tmpOne = getRandomInt(1, 25);
        var tmpTwo = getRandomInt(2, 9);
        if (tmpOne % tmpTwo === 0) {
            one = tmpOne;
            two = tmpTwo;
            return tmpOne / tmpTwo;
        }
    }
    while (!divAnswer) divAnswer = getDivisible();
    var divWrongTmp = numberArray(25); // Create an array with possible answers
    divWrongTmp.splice(divAnswer - 1, 1); // Removes the right answer
    fy(divWrongTmp); // Shuffle the array
    var divWrong = divWrongTmp.slice(0, 8); // Get the first 8 wrong answers
    var arr = [...divWrong, divAnswer];
    fy(arr);
}

// Function to get a random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to create an array
function numberArray(a, b) {
    b = []; while (a--) b[a] = a + 1; return b
}

// Function to shuffle array - Fisher Yates
function fy(a, b, c, d) { c = a.length; while (c) b = Math.random() * c-- | 0, d = a[c], a[c] = a[b], a[b] = d }

// Countdown Function
var interval = 0;
if (window.location.href.match(/add/)) {
    interval = addTimer;
} else if (window.location.href.match(/sub/)) {
    interval = subTimer;
} else if (window.location.href.match(/div/)) {
    interval = divTimer;
}

function reset() {
    localStorage.endTime = Math.floor(new Date().getTime() / 1000) + interval;
}

if (!localStorage.endTime) {
    reset();
}

// IF to load the correct timer
function countDown() {
    var remaining = localStorage.endTime - Math.floor(new Date().getTime() / 1000);
    if (remaining >= 0) {
        timerDiv.innerHTML = "Timer: " + remaining + "s";
    } else if (remaining < 0) {
        if (window.location.href.match(/add/)) {
            localStorage.removeItem("endTime");
            window.location.href = "sub.html";
        } else if (window.location.href.match(/sub/)) {
            localStorage.removeItem("endTime");
            window.location.href = "div.html";
        } else if (window.location.href.match(/div/)) {
            window.location.href = "result.html";
        }
    }
}

// Function to play/pause music
var audioButton = document.querySelector("#audioButton");
var myAudio = document.querySelector("#audio");

function playPause() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};
audioButton.addEventListener("click", playPause);

// Function to display rules
if (window.location.pathname === '/' || window.location.href.match(/index/)) {
    function rule() {
        if (hiddenRules.style.display === "none") {
            hiddenRules.style.display = "block";
        } else {
            hiddenRules.style.display = "none";
        }
    }
    rules.addEventListener("click", rule);
}

// Function to start
if (window.location.pathname === '/' || window.location.href.match(/index/)) {
    function startFunction() {
        window.location.href = "/input.html";
    }
    start.addEventListener("click", startFunction);
}

// Function to play
if (window.location.href.match(/input/)) {
    function playFunction() {
        localStorage.clear();
        var name = document.querySelector("#name").value;
        var age = document.querySelector("#age").value;
        localStorage.setItem("name", name);
        localStorage.setItem("age", age);
        localStorage.setItem("score", 0);
        localStorage.setItem("addHits", 0);
        localStorage.setItem("addMiss", 0);
        localStorage.setItem("subHits", 0);
        localStorage.setItem("subMiss", 0);
        localStorage.setItem("divHits", 0);
        localStorage.setItem("divMiss", 0);
        window.location.href = "/add.html";
    }
    play.addEventListener("click", playFunction);
}

// Function to play again
if (window.location.href.match(/result/)) {
    function playAgain() {
        window.location.href = "/";
    }
    playAgainButton.addEventListener("click", playAgain);
}

if (window.location.href.match(/add/) || window.location.href.match(/sub/) || window.location.href.match(/div/)) {
    // Function to make formula move with mouse
    // Code from https://codepen.io/Griggy/pen/qOKjYe edited to my needs
    (function () {

        /* Following Eyes - kurt.grigg@yahoo.co.uk 2003 (Updated) */

        var eye = 50; //Eye size in pixels

        if (eye % 2 == 0) {
            eye++;
        }
        var eye5 = eye / 2 | 0;
        var pup = 42 * eye / 100;
        if (pup % 2 == 0) {
            pup++;
        }
        var pup5 = (pup - 3) / 2;
        if (pup5 % 2 == 1) {
            pup5++;
        }
        var grng = (eye - pup) / 2;
        if (grng % 2 == 1) {
            grng++;
        }
        var rng = eye5 / grng;
        var d = document;
        var my = 0;
        var mx = 0;
        var fy = 0;
        var fx = 0;
        var ros = eye + 2;
        var rim = 0.25 * eye / 100;
        var scy = 0;
        var scx = 0;
        var pix = 'px';
        var mls = 1000 / 60;
        var lastEx = performance.now();
        var h, w;

        var cstyle =
            'position:absolute;top:0px;left:0px;width:' + (ros * 2) + 'px;height:' + ros + 'px;'
            + 'line-height:0px;margin:70px 0px 0px 0px;border:none;padding:0px;display:inline-block;';

        var estyle =
            'position:absolute;top:0px;left:30px;height:' + eye + 'px;'
            + 'width:' + eye + 'px;line-height:50px;background:rgba(255,255,255,0.7);'
            + 'border:' + rim + 'px solid #f0f0f0;'
            + 'box-shadow: inset -' + eye / 3 + 'px -' + eye / 3 + 'px ' + eye / 2 +
            'px -' + (eye / 10 | 0) + 'px rgba(0,0,0,0.16);'
            + 'border-radius:20%;padding:0px 5px;text-align:center;';

        var pstyle =
            'position:absolute;top:45%;left:45%;height:' + pup + 'px;'
            + 'width:' + pup + 'px;line-height:0px;border-radius: 50%;background-color:#222;display:none';


        var c = d.createElement('div');
        var e1 = d.createElement('div');
        var e2 = d.createElement('div');
        var p1 = d.createElement('div');
        var p2 = d.createElement('div');

        c.setAttribute('style', cstyle);
        e1.setAttribute('style', estyle);
        e2.setAttribute('style', estyle + 'left:' + (ros + (rim / 2)) + 'px;');
        p1.setAttribute('style', pstyle);
        p2.setAttribute('style', pstyle);
        if (window.location.href.match(/add/)) {
            e1.innerHTML = one + ' + ' + two;
        } else if (window.location.href.match(/sub/)) {
            e1.innerHTML = one + ' - ' + two;
        } else if (window.location.href.match(/div/)) {
            e1.innerHTML = one + ' / ' + two;
        }
        d.body.appendChild(c);
        c.appendChild(e1);
        d.body.appendChild(p1);

        function scrl(v) {
            var y, x;
            y = window.pageYOffset;
            x = window.pageXOffset;
            return (v == 0) ? y : x;
        }

        function initscroll() {
            scy = scrl(0);
            scx = scrl(1);
        }

        function windims() {
            var ddw = d.documentElement.clientWidth;
            var ddh = d.documentElement.clientHeight;
            var scrollBarRight = (typeof ddw == 'number') ? window.innerWidth - ddw : 0;
            var scrollBarBottom = (typeof ddh == 'number') ? window.innerHeight - ddh : 0;
            h = window.innerHeight - scrollBarBottom - 1;
            w = window.innerWidth - scrollBarRight - 1;
        }

        function mouse(e) {
            if (!e) {
                e = window.event;
            }
            my = e.pageY - window.pageYOffset;
            mx = e.pageX - window.pageXOffset;
        }

        function ani() {
            //Keep eyes on screen.
            var chy = Math.floor(fy - (ros * 1.2));
            if (chy <= 0) {
                chy = 0;
            }
            if (chy >= h - ros) {
                chy = h - ros;
            }

            var chx = Math.floor(fx - ros);
            if (chx <= 0) {
                chx = 0;
            }
            if (chx >= w - (ros * 2)) {
                chx = w - (ros * 2);
            }

            //Eyeball centres.
            var yec = chy + eye5;
            var xec = chx + eye5;

            var d1 = Math.sqrt((my - yec) * (my - yec) + (mx - xec) * (mx - xec));
            var d2 = Math.sqrt((my - yec) * (my - yec) + (mx - (xec + ros)) * (mx - (xec + ros)));

            var a1 = Math.atan2(my - yec, mx - xec) * 180 / Math.PI;
            var a2 = Math.atan2(my - yec, mx - (xec + ros)) * 180 / Math.PI;

            var le = (d1 < eye5) ? d1 / rng : grng;
            var re = (d2 < eye5) ? d2 / rng : grng;

            c.style.top = chy + scy + pix;
            c.style.left = chx + scx + pix;
        }

        // Move spped
        function move() {
            var dy = fy += (my - fy) * 0.1;
            var dx = fx += (mx - fx) * 0.1;
            ani();
        }

        function init() {
            windims();
            draw();
        }

        function draw() {
            var now = performance.now();
            if ((now - lastEx) > (mls)) {
                move();
                lastEx = performance.now();
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener("resize", windims, false);
        window.addEventListener("load", init, false);
        d.addEventListener("mousemove", mouse, false);
        window.addEventListener("scroll", initscroll, false);

    })();
}

if (window.location.href.match(/add/) || window.location.href.match(/sub/) || window.location.href.match(/div/)) {
    // Function to Move Divs
    // Code from https://codepen.io/Griggy/pen/wGqRKw edited to my needs
    (function () {

        /*
        Basic circle collision (full page version).
        Straight JavaScript!
        kurt.grigg@yahoo.co.uk
        */

        var numberOfBalls = 9;
        var ballVelocity = 2;
        var ballColour = ''; //Leave blank for random colours.
        var milliSeconds = 30;

        var then = performance.now();
        var h, w, balls = [], ballCoords = [];
        var scy = 0;
        var scx = 0;
        var d = document;

        function scrl(a) {
            var y, x;
            y = window.pageYOffset;
            x = window.pageXOffset;
            return (a == 0) ? y : x;
        }

        function initscroll() {
            scy = scrl(0);
            scx = scrl(1);
        }

        function randomColour() {
            var rgb = [];
            for (var i = 0; i < 3; i++) {
                var gen = Math.random() * 255 | 0;
                rgb.push(gen);
            }
            return (typeof ballColour == 'undefined' || ballColour == '') ? 'rgb(' + rgb.toString() + ')' : ballColour;
        }

        function win() {
            var tmp = d.documentElement.clientWidth;
            var ch = (typeof tmp == 'number');
            var sc = (ch) ? window.innerWidth - tmp : 0;
            h = window.innerHeight - 1;
            w = window.innerWidth - sc - 1;
        }

        function xy(a, s) {
            return (a * s / 100);
        }

        function createBall(y, x) {
            var r = 75;
            var ball = d.createElement('div');
            ball.setAttribute('style', 'display:block;'
                + 'position:absolute;'
                + 'height:' + r + 'px;'
                + 'width:' + r + 'px;'
                + 'top:0px;left:0px;'
                + 'background-color:' + randomColour() + ';'
                + 'border-radius:50%;'
                + 'box-shadow:inset 0 0 ' + xy(1, r) + 'px ' + xy(1, r) + 'px rgba(0,0,0,0.2),'
                + 'inset 0 -' + xy(25, r) + 'px ' + xy(50, r) + 'px rgba(0,0,0,0.4);'
                + 'opacity:0.9;');

            var glass = d.createElement('div');
            glass.setAttribute('style', 'display: block;'
                + 'position:absolute;'
                + 'height:' + xy(100) + 'px;'
                + 'width:' + xy(100) + 'px;'
                + 'margin:auto;top:0;bottom:0;left:0;right:0;'
                + 'border-radius:50%;');

            var shine = d.createElement('div');
            shine.setAttribute('style', 'display:block;'
                + 'position:absolute;'
                + 'margin:auto;'
                + 'top:2%;'
                + 'left:0;right:0;'
                + 'border-radius:50%;'
                + 'width:72%;'
                + 'height:54%;'
                + 'background-image:linear-gradient(to bottom, rgba(255,255,255,0.9) 2%, '
                + 'rgba(255,255,255,0.7) 30%, transparent 100%);');

            glass.appendChild(shine);
            ball.appendChild(glass);
            d.body.appendChild(ball);
            balls.push(ball);
            ballAttr(r, y, x);
        }

        function ballAttr(rad, y, x) {
            var b = {
                r: rad * 0.5,
                m: rad * 0.5,
                x: x,
                y: y,
                vx: -ballVelocity + Math.random() * (ballVelocity * 2),
                vy: -ballVelocity + Math.random() * (ballVelocity * 2)
            };
            ballCoords.push(b);
        }

        function animate() {
            for (var i = 0; i < balls.length; i++) {
                var b = ballCoords[i];
                b.x += b.vx;
                b.y += b.vy;
            }
        }

        function borderCollisions() {
            for (var i = 0; i < balls.length; i++) {
                b = ballCoords[i];
                if (b.x > w - b.r) {
                    b.x = w - b.r;
                    b.vx *= -1;
                }
                else if (b.x < b.r) {
                    b.x = b.r;
                    b.vx *= -1;
                }

                if (b.y > h - b.r) {
                    b.y = h - b.r;
                    b.vy *= -1;
                }
                else if (b.y < b.r) {
                    b.y = b.r;
                    b.vy *= -1;
                }
            }
        }

        function collisions() {
            for (var i = 0; i < balls.length; i++) {
                var b1 = ballCoords[i];
                for (var j = i + 1; j < balls.length; j++) {
                    var b2 = ballCoords[j];

                    var dx = b1.x - b2.x;
                    var dy = b1.y - b2.y;
                    var len = dx * dx + dy * dy;
                    var min = b1.r + b2.r;
                    var mind = min * min;
                    var ca = Math.atan2(dy, dx);

                    if (len < mind) {

                        var dist = Math.sqrt(len);

                        var factor = (dist - min) / dist;
                        b1.x -= dx * factor * 0.5;
                        b1.y -= dy * factor * 0.5;
                        b2.x += dx * factor * 0.5;
                        b2.y += dy * factor * 0.5;

                        var v1 = Math.sqrt(b1.vx * b1.vx + b1.vy * b1.vy);
                        var v2 = Math.sqrt(b2.vx * b2.vx + b2.vy * b2.vy);

                        var a1 = Math.atan2(b1.vy, b1.vx);
                        var a2 = Math.atan2(b2.vy, b2.vx);

                        var rvx1 = v1 * Math.cos(a1 - ca);
                        var rvy1 = v1 * Math.sin(a1 - ca);
                        var rvx2 = v2 * Math.cos(a2 - ca);
                        var rvy2 = v2 * Math.sin(a2 - ca);

                        var evx1 = ((b1.m - b2.m) * rvx1 + (b2.m + b2.m) * rvx2) / (b1.m + b2.m);
                        var evx2 = ((b1.m + b1.m) * rvx1 + (b2.m - b1.m) * rvx2) / (b1.m + b2.m);
                        var evy1 = rvy1;
                        var evy2 = rvy2;

                        b1.vx = Math.cos(ca) * evx1 + Math.cos(ca + Math.PI / 2) * evy1;
                        b1.vy = Math.sin(ca) * evx1 + Math.sin(ca + Math.PI / 2) * evy1;
                        b2.vx = Math.cos(ca) * evx2 + Math.cos(ca + Math.PI / 2) * evy2;
                        b2.vy = Math.sin(ca) * evx2 + Math.sin(ca + Math.PI / 2) * evy2;
                    }
                }
            }
        }

        function assignToHTML() {
            for (var i = 0; i < balls.length; i++) {
                var b = ballCoords[i];
                balls[i].style.transform = 'translate3d(' + (b.x - b.r + scx) + 'px, ' + (b.y - b.r + scy) + 'px, 0)';
                balls[i].id = "object" + (i + 1);
                balls[i].innerHTML = arr[i];
            }
        }

        function run() {
            var now = performance.now();
            if ((now - then) > milliSeconds) {
                animate();
                collisions();
                borderCollisions();
                assignToHTML();
                countDown();
                then = performance.now();
            }
            window.requestAnimationFrame(run);
        }

        function start() {
            win();
            for (var i = 0; i < numberOfBalls; i++) {
                createBall(Math.random() * h, Math.random() * w);
            }
            run();
        }

        window.addEventListener("load", start, false);
        window.addEventListener("resize", win, false);
        window.addEventListener("scroll", initscroll, false);

    })();
}

// Max misses detection
if (window.location.href.match(/add/)) {
    if (localStorage.getItem("addMiss") >= maxMiss) {
        window.location.href = "result.html";
    }
} else if (window.location.href.match(/sub/)) {
    if (localStorage.getItem("subMiss") >= maxMiss) {
        window.location.href = "result.html";
    }
} else if (window.location.href.match(/div/)) {
    if (localStorage.getItem("divMiss") >= maxMiss) {
        window.location.href = "result.html";
    }
}

// Add functions
if (window.location.href.match(/add/)) {
    setTimeout(function add() {
        var object1 = document.querySelector("#object1");
        var object2 = document.querySelector("#object2");
        var object3 = document.querySelector("#object3");
        var object4 = document.querySelector("#object4");
        var object5 = document.querySelector("#object5");
        var object6 = document.querySelector("#object6");
        var object7 = document.querySelector("#object7");
        var object8 = document.querySelector("#object8");
        var object9 = document.querySelector("#object9");
        object1.addEventListener("click", addClick);
        object2.addEventListener("click", addClick);
        object3.addEventListener("click", addClick);
        object4.addEventListener("click", addClick);
        object5.addEventListener("click", addClick);
        object6.addEventListener("click", addClick);
        object7.addEventListener("click", addClick);
        object8.addEventListener("click", addClick);
        object9.addEventListener("click", addClick);
    }, 1000);

    function addClick() {
        var tmpValue = this.innerHTML;
        var tmpScore = (localStorage.getItem("score") === null) ? 0 : localStorage.getItem("score");
        var tmpHits = (localStorage.getItem("addHits") === null) ? 0 : localStorage.getItem("addHits");
        var tmpMiss = (localStorage.getItem("addMiss") === null) ? 0 : localStorage.getItem("addMiss");
        if (tmpValue == answer) {
            tmpScore++;
            tmpHits++;
        } else {
            (tmpScore <= 0) ? 0 : tmpScore--;
            tmpMiss++;
            console.log(tmpMiss);
        }

        localStorage.setItem("score", tmpScore);
        localStorage.setItem("addHits", tmpHits);
        localStorage.setItem("addMiss", tmpMiss);

        document.location.reload(false);
    }
}

// Sub functions
if (window.location.href.match(/sub/)) {
    setTimeout(function sub() {
        var object1 = document.querySelector("#object1");
        var object2 = document.querySelector("#object2");
        var object3 = document.querySelector("#object3");
        var object4 = document.querySelector("#object4");
        var object5 = document.querySelector("#object5");
        var object6 = document.querySelector("#object6");
        var object7 = document.querySelector("#object7");
        var object8 = document.querySelector("#object8");
        var object9 = document.querySelector("#object9");
        object1.addEventListener("click", subClick);
        object2.addEventListener("click", subClick);
        object3.addEventListener("click", subClick);
        object4.addEventListener("click", subClick);
        object5.addEventListener("click", subClick);
        object6.addEventListener("click", subClick);
        object7.addEventListener("click", subClick);
        object8.addEventListener("click", subClick);
        object9.addEventListener("click", subClick);
    }, 1000);

    function subClick() {
        var tmpValue = this.innerHTML;
        var tmpScore = (localStorage.getItem("score") === null) ? 0 : localStorage.getItem("score");
        var tmpHits = (localStorage.getItem("subHits") === null) ? 0 : localStorage.getItem("subHits");
        var tmpMiss = (localStorage.getItem("subMiss") === null) ? 0 : localStorage.getItem("subMiss");
        if (tmpValue == answer) {
            tmpScore++;
            tmpHits++;
        } else {
            (tmpScore <= 0) ? 0 : tmpScore--;
            tmpMiss++;
            if (tmpMiss >= maxMiss) {
                window.location.href = "result.html";
            }
        }

        localStorage.setItem("score", tmpScore);
        localStorage.setItem("subHits", tmpHits);
        localStorage.setItem("subMiss", tmpMiss);

        document.location.reload(false);
    }
}

// Div functions
if (window.location.href.match(/div/)) {
    setTimeout(function div() {
        var object1 = document.querySelector("#object1");
        var object2 = document.querySelector("#object2");
        var object3 = document.querySelector("#object3");
        var object4 = document.querySelector("#object4");
        var object5 = document.querySelector("#object5");
        var object6 = document.querySelector("#object6");
        var object7 = document.querySelector("#object7");
        var object8 = document.querySelector("#object8");
        var object9 = document.querySelector("#object9");
        object1.addEventListener("click", divClick);
        object2.addEventListener("click", divClick);
        object3.addEventListener("click", divClick);
        object4.addEventListener("click", divClick);
        object5.addEventListener("click", divClick);
        object6.addEventListener("click", divClick);
        object7.addEventListener("click", divClick);
        object8.addEventListener("click", divClick);
        object9.addEventListener("click", divClick);
    }, 1000);

    function divClick() {
        var tmpValue = this.innerHTML;
        var tmpScore = (localStorage.getItem("score") === null) ? 0 : localStorage.getItem("score");
        var tmpHits = (localStorage.getItem("divHits") === null) ? 0 : localStorage.getItem("divHits");
        var tmpMiss = (localStorage.getItem("divMiss") === null) ? 0 : localStorage.getItem("divMiss");
        if (tmpValue == divAnswer) {
            tmpScore++;
            tmpHits++;
        } else {
            (tmpScore <= 0) ? 0 : tmpScore--;
            tmpMiss++;
            if (tmpMiss >= maxMiss) {
                window.location.href = "result.html";
            }
        }

        localStorage.setItem("score", tmpScore);
        localStorage.setItem("divHits", tmpHits);
        localStorage.setItem("divMiss", tmpMiss);

        document.location.reload(false);
    }
}

// Current Score to HTML
if (window.location.href.match(/add/)) {
    scoreDiv.innerHTML = "Score: " + score;
    hitsDiv.innerHTML = "Hits: " + addHits;
    missDiv.innerHTML = "Miss: " + addMiss;
} else if (window.location.href.match(/sub/)) {
    scoreDiv.innerHTML = "Score: " + score;
    hitsDiv.innerHTML = "Hits: " + subHits;
    missDiv.innerHTML = "Miss: " + subMiss;
} else if (window.location.href.match(/div/)) {
    scoreDiv.innerHTML = "Score: " + score;
    hitsDiv.innerHTML = "Hits: " + divHits;
    missDiv.innerHTML = "Miss: " + divMiss;
} else if (window.location.href.match(/result/)) {
    result.innerHTML = "<h2>Final Results</h2><div>"
        + "<br>"
        + "<p>Name: " + localStorage.getItem("name") + "</p></div>"
        + "<p>Age: " + localStorage.getItem("age") + "</p></div>"
        + "<p>Final Score: " + localStorage.getItem("score") + "</p></div>"
        + "<br>"
        + "<p>Level 1 hits: " + localStorage.getItem("addHits") + "</p></div>"
        + "<p>Level 1 misses: " + localStorage.getItem("addMiss") + "</p></div>"
        + "<br>"
        + "<p>Level 2 hits: " + localStorage.getItem("subHits") + "</p></div>"
        + "<p>Level 2 misses: " + localStorage.getItem("subMiss") + "</p></div>"
        + "<br>"
        + "<p>Level 3 hits: " + localStorage.getItem("divHits") + "</p></div>"
        + "<p>Level 3 misses: " + localStorage.getItem("divMiss") + "</p></div>";
}