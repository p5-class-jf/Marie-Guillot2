var paper;
var gui = new dat.GUI();
var params = {
    Seed: 124,
    Long: -48,
    Angle: 0.77,
    PousseArbre: 5,
    Download_Image: function () { return save(); },
};
gui.add(params, "Seed", 0, 255, 1);
gui.add(params, "Long", -150, 0, 1);
gui.add(params, "Angle", 0, 1.7, 0.001);
gui.add(params, "PousseArbre", 0, 12, 1);
gui.add(params, "Download_Image");
function gradientLine(Longueur) {
    var colorStart = color('rgba(19, 100, 60,1)');
    var colorEnd = color('rgba(19, 100, 60,0.2)');
    for (var i = 0; i >= Longueur; i--) {
        var c = lerpColor(colorStart, colorEnd, (1 / Longueur) * i);
        strokeWeight(1.5);
        stroke(c);
        line(0, i, 0, i - 1);
    }
}
function smallLine(stop) {
    if (stop == 0) {
        stop = 2;
    }
    var reduction = 0.1 * (5 + stop);
    var longueurLigne = params.Long * random(0.7, 1) * reduction;
    if (stop > 2) {
        var dir = void 0;
        if (stop % 2 == 0) {
            dir = -1;
        }
        else {
            dir = 1;
        }
        push();
        var angle2 = dir * params.Angle / (stop * 2);
        rotate(angle2);
        smallLine(1);
        smallLine(1);
        pop();
    }
    var j = 0;
    while (j < 2) {
        gradientLine(longueurLigne);
        push();
        var angle = ((PI / 12) - j * (PI / 7));
        rotate(-angle);
        gradientLine((3 - j) * (2 / 3) * longueurLigne);
        pop();
        translate(0, longueurLigne);
        j++;
    }
    gradientLine(longueurLigne);
    translate(0, (1 / 2) * longueurLigne);
}
function divisePlant(stop, direction) {
    push();
    var reduction = 0.05 * (15 + stop);
    var angle = reduction * direction * params.Angle;
    rotate(angle);
    smallLine(stop);
    if (stop > 1) {
        var dir = void 0;
        if (stop % 2 == 0) {
            dir = 1;
        }
        else {
            dir = -1;
        }
        push();
        divisePlant(stop - 1, 0);
        pop();
        push();
        divisePlant(stop - 2, dir);
        pop();
    }
    if (stop == 1) {
        smallLine(stop);
    }
    pop();
}
function draw() {
    image(paper, 0, 0, width, height);
    randomSeed(params.Seed);
    noFill();
    var B = 255;
    stroke("#136428");
    translate(width / 2, 4 * height / 5);
    push();
    var longueurArbre = params.PousseArbre;
    divisePlant(longueurArbre, 0);
    divisePlant(longueurArbre - 1, 1);
}
function preload() {
    paper = loadImage("../img/paper.jpg");
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map