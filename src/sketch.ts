// -------------------
//  Parameters and UI
// -------------------

let paper : p5.Image;

const gui = new dat.GUI()
const params = {
    Seed: 124,
    Long : -48,
    Angle : 0.77,
    PousseArbre : 5,
    Download_Image: () => save(),
}
gui.add(params, "Seed", 0, 255, 1)
gui.add(params, "Long", -150, 0, 1)
gui.add(params, "Angle", 0, 1.7, 0.001)
gui.add(params, "PousseArbre", 0, 12, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function gradientLine(Longueur) {
    let colorStart = color('rgba(19, 100, 60,1)');
    let colorEnd = color('rgba(19, 100, 60,0.2)');

    for (let i=0; i>=Longueur; i--) {
        let c = lerpColor(colorStart, colorEnd, (1/Longueur)*i);
        strokeWeight(1.5);
        stroke(c);
        line(0, i, 0, i-1);
    }

}

function smallLine (stop) {

    if (stop == 0) {
        stop = 2;
    }
    let reduction = 0.1*(5+stop);
    let longueurLigne = params.Long*random(0.7,1)*reduction;

    if (stop > 2) {
        let dir;
        if(stop%2 == 0) { dir = -1 } else {dir = 1 }
        push()
        let angle2 = dir*params.Angle/(stop*2);
        rotate(angle2); 
        smallLine(1)
        smallLine(1)
        pop() /*
        if (stop == 3) {
        push()
        let angle2 = -dir*params.Angle/(stop*2);
        rotate(angle2); 
        smallLine(1)
        smallLine(1)
        pop() 
        }*/
    }
   

    let j = 0;
    while (j<2) {
        gradientLine(longueurLigne); 
        push();
        let angle = ((PI/12) - j*(PI/7));
        rotate(-angle); 
        gradientLine((3-j)*(2/3)*longueurLigne); 
        pop();
        translate(0,longueurLigne);
        j++;
    }   
    gradientLine(longueurLigne); 
    translate(0,(1/2)*longueurLigne);
    
}

function divisePlant (stop, direction) {
    
    push();
    let reduction = 0.05*(15+stop);
    let angle = reduction*direction*params.Angle;
    rotate(angle);
    smallLine(stop);
        
        if (stop>1) {

            let dir;
            if(stop%2 == 0) { dir = 1 } else {dir = -1 }

            push();
            divisePlant(stop-1, 0);
            pop();  
            push();
            divisePlant(stop-2, dir);
            pop(); 

        }
        if (stop==1) {
            smallLine(stop);
        }
    
    pop();
}


function draw() {
    
    image(paper, 0, 0, width, height);

    randomSeed(params.Seed);
    //background("#F4EAD3");
    noFill();
    let B=255;
    stroke("#136428");
    translate(width/2, 4*height/5);
    push();
   
    let longueurArbre = params.PousseArbre;
    divisePlant(longueurArbre, 0);
    divisePlant(longueurArbre-1, 1);

    

}

// -------------------
//    Initialization
// -------------------

function preload() {
    paper = loadImage("../img/paper.jpg");
}

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}