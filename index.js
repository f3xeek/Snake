window.onload = function () {
    const canvas = document.getElementById("gameBoard");
    const spritesheet = document.getElementById("spritesheet");
    const ctx = canvas.getContext("2d");
    const N = 19;
    const SIZE = 40;
    const SPRITES = {head_down: [256,64], head_up:[192,0], head_left:[192,64], head_right:[256,0],apple:[0,192], body_horizontal:[64,0],
                    body_vertical:[128,64], tail_down:[192,128],tail_up:[256,192], tail_right:[192,192],tail_left:[256,128],
                    turn_down_left:[128,0], turn_down_right:[0,0],  turn_up_right:[0,64], turn_up_left:[128,128]}
  
                    //                                               [x,y,state] 1 for turn 0 for tail
    let snake = { head: [5, Math.round((N - 1) / 2)], turns: [[2, 5, 0] ],head_position:[SPRITES.head_right[0],SPRITES.head_right[1]], length: 20 }
    let apple = [N-3 ,Math.round((N - 1) / 2)]
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
        //drawing snakes body 
        snake.turns.forEach((turn,index) => {
            const nextTurn = snake.turns[index+1] || 0
            let direction = 0
            if (turn[0] - current_position[0] != 0) {
                direction = (turn[0] - current_position[0]) > 0 ? 1 : -1
                let length = Math.abs(turn[0] - current_position[0])
                for (let i = length; i > 1; i--) {
                    current_position[0] += direction
                    ctx.drawImage(spritesheet,SPRITES.body_horizontal[0],SPRITES.body_horizontal[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }
                current_position[0] += direction
                if(turn[2]==0){
                    if(direction===-1) ctx.drawImage(spritesheet,SPRITES.tail_left[0],SPRITES.tail_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                    else ctx.drawImage(spritesheet,SPRITES.tail_right[0],SPRITES.tail_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
            }else{
                const nextDir = current_position[0]-nextTurn[0] > 0 ? 1 : -1
                if (direction>0){
                    if (nextDir>0)ctx.drawImage(spritesheet,SPRITES.turn_down_left[0],SPRITES.turn_down_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                    else ctx.drawImage(spritesheet,SPRITES.turn_up_left[0],SPRITES.turn_up_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)   
                }else{
                    if (nextDir>0)ctx.drawImage(spritesheet,SPRITES.turn_down_right[0],SPRITES.turn_down_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                    else ctx.drawImage(spritesheet,SPRITES.turn_up_right[0],SPRITES.turn_up_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }
            }
            } else {
                direction = (turn[1] - current_position[1]) > 0 ? 1 : -1
                let length = Math.abs(turn[1] - current_position[1])
                for (let i = length; i > 0; i--) {
                    current_position[1] += direction
                    ctx.drawImage(spritesheet,SPRITES.body_vertical[0],SPRITES.body_vertical[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }
                current_position[1] += direction
                if(turn[2]===0){
                    if(direction===1) ctx.drawImage(spritesheet,SPRITES.tail_down[0],SPRITES.tail_down[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                    else ctx.drawImage(spritesheet,SPRITES.tail_up[0],SPRITES.tail_up[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                }else{
                    const nextDir = current_position[0]-nextTurn[0] > 0 ? 1 : -1
                    if (direction>0){
                        if (nextDir>0)ctx.drawImage(spritesheet,SPRITES.turn_up_left[0],SPRITES.turn_up_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                        else ctx.drawImage(spritesheet,SPRITES.turn_up_right[0],SPRITES.turn_up_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)   
                    }else{
                        if (nextDir>0)ctx.drawImage(spritesheet,SPRITES.turn_down_left[0],SPRITES.turn_down_left[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                        else ctx.drawImage(spritesheet,SPRITES.turn_down_right[0],SPRITES.turn_down_right[1],64,64,current_position[0] * SIZE,current_position[1] * SIZE, SIZE, SIZE)
                    }
            }
        }       
    })
    }   

    draw_grid()
    ctx.stroke()
    draw_snake_and_apple()
    
}
   