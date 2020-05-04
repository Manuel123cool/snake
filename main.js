"use strict";
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Rect {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

let food = new Rect(200, 200);
let dir = "no_dir";
let rect = Array();
rect[0] = new Rect(200, 200);

function direction (e) {
    if (dir == "ArrowRight" && e.key == "ArrowLeft") {
        return;
    } else if (dir == "ArrowLeft" && e.key == "ArrowRight") {
        return;
    } else if (dir == "ArrowUp" && e.key == "ArrowDown") {
        return;
    } else if (dir == "ArrowDown" && e.key == "ArrowUp") {
        return;
    }
    dir = e.key;
}

window.addEventListener("keydown", direction);

function move() {
    switch (dir) {
        case "ArrowRight":
            rect.push(new Rect(rect[rect.length - 1].x + 20, rect[rect.length - 1].y));
            break;
        case "ArrowLeft":
            rect.push(new Rect(rect[rect.length - 1].x - 20, rect[rect.length - 1].y));
            break;
        case "ArrowUp":
            rect.push(new Rect(rect[rect.length - 1].x, rect[rect.length - 1].y - 20));
            break;
        case "ArrowDown":
            rect.push(new Rect(rect[rect.length - 1].x, rect[rect.length - 1].y + 20));
            break;
    }
}
let limit = 4;
function draw() {
    while (rect.length > limit) {
        rect.shift();
    }
    for (let i = 0; i < rect.length; i++) {
        ctx.fillRect(rect[i].x, rect[i].y, 20, 20);
    }
    ctx.fillRect(food.x, food.y, 20, 20);
}

function dropFood() {
    let randomNumX = Math.random() * 400;
    let ramdomNumXRest = randomNumX % 20;
    randomNumX -= ramdomNumXRest; 

    let randomNumY = Math.random() * 400;
    let randomNumYRest = randomNumY % 20;
    randomNumY -= randomNumYRest;
    food = new Rect(randomNumX, randomNumY);
}
dropFood();

function eatFood() {
    for (let i = 0; i < rect.length; ++i) {
        if (rect[i].x == food.x &&
            rect[i].y == food.y) {
            console.log("Hallo");
            limit++;
            dropFood();
        }
    }
}

function makeDefault() {
    while (rect.length) {
        rect.shift();
    }
    rect[0] = new Rect(200, 200);
    dir = "no_dir";
    limit = 4;
}

function checkWall() {
    for (let i = 0; i < rect.length; ++i) {
        if (rect[i].x > 400 || rect[i].x < 0) {
            makeDefault();
        } else if (rect[i].y > 400 || rect[i].y < 0) {
            makeDefault();
        }
    }  
    for (let i = 0; i < rect.length - 1; ++i) {
         if (rect[rect.length - 1].x == rect[i].x && 
            rect[rect.length - 1].y == rect[i].y) {
            makeDefault();
        } 
    } 
}

setInterval(update, 400);

function update() {
    ctx.clearRect(0, 0, 400, 400);
    eatFood();
    checkWall();
    draw();
    move();
}
