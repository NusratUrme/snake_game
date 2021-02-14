function getel(x){
    return document.getElementById(x)
}

for(let i=0 ; i<10 ; i++){
    for(let j=0; j<10 ; j++){
        getel("demo").innerHTML += `<div class="box" id="box${i}-${j}"> </div>`
    }
}

var matrix = new Array(10)
for(let i=0; i<10; i++){
    matrix[i] = new Array(10).fill(0)
}

const up = 1
const down = 2
const left = 3
const right = 4

class box{
    constructor(x, y, color, direction){
        this.x = x
        this.y = y
        this.color = color
        this.direction = direction
    }

    render(){
        this.x += 10
        this.y += 10
        this.x %= 10
        this.y %= 10
        matrix[this.x][this.y] += 1
        getel(`box${this.x}-${this.y}`).style.background = this.color
    }

    clear(){
        matrix[this.x][this.y] -= 1
        getel(`box${this.x}-${this.y}`).style.background = "purple"
    }

    move(){
        this.clear()
        if(this.direction == up) this.x--
        else if(this.direction == down) this.x++
        else if(this.direction == left) this.y--
        else this.y++

        this.render()
    }
}

var boxes = []

var colors = ["red", "green", "blue", "yellow", "violet", "black", "brown", "pink"]

function addbox(){
    var lastbox = boxes[boxes.length - 1]
    var new_dir = lastbox.direction
    var newbox = new box(lastbox.x, lastbox.y, colors[Math.floor(Math.random() * 8)], lastbox.direction)

    if(new_dir == up) newbox.x++
    else if(new_dir == down) newbox.x--
    else if(new_dir == left) newbox.y++
    else newbox.y--

    boxes.push(newbox)
    newbox.render()
}

var head_dir = up

var b = new box(5, 5, "red", up)
b.render()
boxes.push(b)

function go(x){
    head_dir = x
    boxes[0].direction = x
    for(let i=0; i<boxes.length; i++){
        boxes[i].move()
    }
    getel(`box${b.x}-${b.y}`).style.background = b.color
    for(let i=boxes.length-1; i>0; i--){
        boxes[i].direction = boxes[i-1].direction
    }
    if(matrix[b.x][b.y] == 2){
        alert("Game Over!")
        return
    }
    if(matrix[b.x][b.y] == 3){
        matrix[b.x][b.y] = 1
        addbox()
        renderFood()
        getel("score").innerHTML = (getel("score").innerHTML * 1) + 1
    }
}

function run(){
    go(head_dir)
}
setInterval(function(){run();},1000)

window.onkeypress= function(e){
    if(e.key == "w") head_dir = up
    else if(e.key == "x") head_dir = down
    else if(e.key == "a") head_dir = left 
    else if(e.key == "d") head_dir = right
    run()                                                                                                                                 
}

var food = new box(0, 0, "white", 5)
renderFood()
function renderFood(){
    while(1){
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        if(matrix[x][y] == 0){
            matrix[x][y] = 2
            getel(`box${x}-${y}`).style.background = "white"
            return
        }
    }
}