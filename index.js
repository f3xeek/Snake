window.onload = function () {
    const canvas = document.getElementById("gameBoard");
    const ctx = canvas.getContext("2d");
    const N = 19;
    const SIZE = 40;
    const SPRITES = {head_down: [256,64], head_up:[192,0], head_left:[192,64], head_right:[256,0],apple:[0,192], body_horizontal:[64,0],
                    body_vertical:[128,64], tail_down:[192,128],tail_up:[256,192], tail_right:[192,192],tail_left:[256,192],
                    turn_down_left:[128,0], turn_down_right:[0,0],  turn_up_right:[0,64], turn_up_left:[128,128]}
  
                    //                                               [x,y,state] 1 for rigth -1 for left 0 for tail
    let snake = { head: [4, Math.round((N - 1) / 2)], turns: [[2, 5, 0]], direciton: -1, axis: 'y', length: 20 }
    
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
        }
    }
    function draw_snake() {
        //drawing snakes head
        ctx.drawImage(document.getElementById("spritesheet"), SPRITES.head_right[0],SPRITES.head_right[1], 64, 64, snake.head[0] * SIZE, (snake.head[1]) * SIZE, SIZE, SIZE)
        let current_position = [snake.head[0], snake.head[1]]
        snake.turns.forEach((turn) => {

            if (turn[0] - current_position[0] != 0) {
                let direciton = (turn[0] - current_position[0]) > 0 ? 1 : -1

                let length = Math.abs(turn[0] - current_position[0])
                for (let i = length; i > 0; i--) {
                    current_position[0] += direciton
                    ctx.fillRect(current_position[0] * SIZE, (current_position[1]) * SIZE, SIZE, SIZE)
                }
            } else {
                let direciton = (turn[1] - current_position[1]) > 0 ? 1 : -1
                let length = Math.abs(turn[1] - current_position[1])
                for (let i = length; i > 0; i--) {
                    current_position[1] += direciton
                    ctx.fillRect(current_position[0] * SIZE, (current_position[1]) * SIZE, SIZE, SIZE)
                }
            }
        })
    }

    draw_grid()
    draw_snake()
    ctx.stroke()
}