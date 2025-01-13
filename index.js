window.onload = function () {
    const canvas = document.getElementById("gameBoard");
    const ctx = canvas.getContext("2d");
    const N = 19;
    const SIZE = 40;
    //                                               1 for rigth -1 for left 0 for tail
    let snake = { head: [2, Math.round((N - 1) / 2)], turns: [[9, 10, 1], [9, 2, 1], [1, 2, 1], [1, 5, 0]], direciton: -1, axis: 'y', length: 20 }
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
        let snake_head_x = 0
        let snake_head_y = 0
        if (snake.direciton === -1) {
            snake_head_y = 64
            if (snake.axis === "x") {
                snake_head_x = 192
            } else {
                snake_head_x = 256
            }
        } else {
            if (snake.axis === "y") {
                snake_head_x = 192
            } else {
                snake_head_x = 256
            }
        }

        ctx.drawImage(document.getElementById("spritesheet"), snake_head_x, snake_head_y, 64, 64, snake.head[0] * SIZE, (snake.head[1]) * SIZE, SIZE, SIZE)
        //ctx.fillRect(snake.head[0] * SIZE, (snake.head[1]) * SIZE, SIZE, SIZE)

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