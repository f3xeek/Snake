window.onload = function () {
    const canvas = document.getElementById("gameBoard");
    const spritesheet = document.getElementById("spritesheet");
    const ctx = canvas.getContext("2d");
    const N = 19;
    const SIZE = 40;
    const SPRITES = {head_down: [256,64], head_up:[192,0], head_left:[192,64], head_right:[256,0],apple:[0,192], body_horizontal:[64,0],
                    body_vertical:[128,64], tail_down:[192,128],tail_up:[256,192], tail_right:[192,192],tail_left:[256,128],
                    turn_down_left:[128,0], turn_down_right:[0,0], turn_up_right:[0,64], turn_up_left:[128,128]}
  
                    //                                         [x,y] 
    let snake = { head: [5, Math.round((N - 1) / 2)], turns: [[2,Math.round((N - 1) / 2)]],head_position:SPRITES.head_right, length: 4, moves:[] }
    let apple = [N-3 ,Math.round((N - 1) / 2)]
    let game = false
    canvas.setAttribute("width", SIZE*N)
    canvas.setAttribute("height", SIZE*N)

    function draw_grid() {
        ctx.beginPath();
        for (let x = SIZE; x < N * SIZE; x += SIZE) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, N * SIZE)
        }
        for (let y = SIZE; y < N * SIZE; y += SIZE) {
            ctx.moveTo(0, y)
            ctx.lineTo(N * SIZE, y)
        }}

    function draw_snake_and_apple() {
        //drwing apple
        ctx.drawImage(spritesheet, SPRITES.apple[0],SPRITES.apple[1], 64, 64, apple[0] * SIZE, apple[1] * SIZE , SIZE, SIZE)
        //drawing snakes head
        ctx.drawImage(spritesheet, snake.head_position[0], snake.head_position[1] , 64, 64, snake.head[0] * SIZE, snake.head[1] * SIZE, SIZE, SIZE)
        let current_position = [snake.head[0], snake.head[1]]
        //drawing snakes body + turns
        let snakePieces = 1
        snake.turns.forEach((turn,index) => {   
            const nextTurn = snake.turns[index+1] || null
            let direction = 0
            //drawing body horizontal
            if (turn[0] - current_position[0] != 0) {
                direction = (turn[0] - current_position[0]) > 0 ? 1 : -1
                let length = Math.abs(turn[0] - current_position[0])
                for (let i = length; i > 1; i--) {
                    snakePieces+=1
                    current_position[0] += direction
                    ctx.drawImage(spritesheet,SPRITES.body_horizontal[0],SPRITES.body_horizontal[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }
                snakePieces+=1
                current_position[0] += direction
                if(snakePieces === snake.length){
                    if(direction===-1) ctx.drawImage(spritesheet,SPRITES.tail_left[0],SPRITES.tail_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                    else ctx.drawImage(spritesheet,SPRITES.tail_right[0],SPRITES.tail_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }else{
                    //drawing turns
                    if (nextTurn){
                        const nextDir = nextTurn[1] - current_position[1] > 0 ? 1 : -1
                        if (direction>0){
                            if (nextDir>0)ctx.drawImage(spritesheet,SPRITES.turn_down_left[0],SPRITES.turn_down_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                            else ctx.drawImage(spritesheet,SPRITES.turn_up_left[0],SPRITES.turn_up_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)   
                        }else{
                            if (nextDir<0)ctx.drawImage(spritesheet,SPRITES.turn_up_right[0],SPRITES.turn_up_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                            else ctx.drawImage(spritesheet,SPRITES.turn_down_right[0],SPRITES.turn_down_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                        }
                    }
                }
            } else if  (turn[1] - current_position[1] != 0) {
                //drawing body vertical
                direction = (turn[1] - current_position[1]) > 0 ? 1 : -1
                let length = Math.abs(turn[1] - current_position[1])
                for (let i = length; i > 1; i--) {
                    snakePieces+=1
                    current_position[1] += direction
                    ctx.drawImage(spritesheet,SPRITES.body_vertical[0],SPRITES.body_vertical[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }
                snakePieces+=1
                current_position[1] += direction
                if(snakePieces === snake.length){
                    if(direction===1) ctx.drawImage(spritesheet,SPRITES.tail_down[0],SPRITES.tail_down[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                    else ctx.drawImage(spritesheet,SPRITES.tail_up[0],SPRITES.tail_up[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }else{
                    if (nextTurn){
                        //drawing turns
                        const nextDir =nextTurn[0] - current_position[0] > 0 ? 1 : -1
                        if (direction>0){
                            if (nextDir>0)ctx.drawImage(spritesheet,SPRITES.turn_up_right[0],SPRITES.turn_up_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                            else ctx.drawImage(spritesheet,SPRITES.turn_up_left[0],SPRITES.turn_up_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)   
                        }else{
                            if (nextDir>0)ctx.drawImage(spritesheet,SPRITES.turn_down_right[0],SPRITES.turn_down_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                            else ctx.drawImage(spritesheet,SPRITES.turn_down_left[0],SPRITES.turn_down_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                        }
                    }
                }
            }     
    })
    }
    function AddMoveToQueue(e){
        if (snake.moves.length<=3)snake.moves.push(e.code)
        
    }
    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw_grid()
        ctx.stroke()
        draw_snake_and_apple()
    }

    function update() {
        if (snake.moves.length===0){
            if (snake.head[0] !==  snake.turns[0][0]) {
                let direction = snake.head[0] >  snake.turns[0][0] ? 1 : -1;
                snake.head[0]+=direction
            } else  {
                let direction = snake.head[1] > snake.turns[0][1] ? 1 : -1;
                snake.head[1]+=direction
            }
        }else{
            snake.turns.unshift([snake.head[0], snake.head[1]])
            if (snake.moves[0] ==="ArrowDown"){
                snake.head[1]+=1
                snake.head_position = SPRITES.head_down
            }
            else if (snake.moves[0] ==="ArrowUp"){
                snake.head[1]-=1
                snake.head_position = SPRITES.head_up
            }
            else if (snake.moves[0] ==="ArrowLeft"){
                snake.head[0]-=1
                snake.head_position = SPRITES.head_left
            }
            else if (snake.moves[0] ==="ArrowRight"){
                snake.head[0]+=1
                snake.head_position = SPRITES.head_right
            }
            snake.moves.splice(0,1)
        }

        let tail = snake.turns[snake.turns.length-1]
        let tail_turn = snake.turns[snake.turns.length-2] || snake.head
        if (tail[0]===tail_turn[0] && tail[1]===tail_turn[1])snake.turns.splice(snake.turns.length-2,1)
        tail_turn = snake.turns[snake.turns.length-2] || snake.head
        if (tail[0] !==  tail_turn[0]) {
            let direction = tail[0] >  tail_turn[0] ? -1 : 1;
            tail[0]+=direction
        } else  {
            let direction = tail[1] > tail_turn[1] ? -1 : 1;
            tail[1]+=direction
        }
        drawFrame()

    }
    function initialize() {
        drawFrame()
        document.getElementById("body").onkeydown = (e)=>{
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)){
                if (!game){
                    test = setInterval(update,250)
                    game=true
                }
                AddMoveToQueue(e)
            }else if (e.code==="Space"){
                clearInterval(test)
                game= false
            }
        }
    }

    initialize()

    
}
   