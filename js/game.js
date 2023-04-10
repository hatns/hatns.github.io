function decrease_timer(){
    if (timer > 0){
        timer -= 1
        document.querySelector("#timer").innerHTML = timer
        setTimeout(decrease_timer, 1000)
    }
}

function end_game(){
    if (player.health > enemy.health) {
        
        document.querySelector("#result").innerHTML = "Samurai wins"

    }
    else if (player.health < enemy.health) {
        document.querySelector("#result").innerHTML = "Kenji wins"
    }
    else {
        document.querySelector("#result").innerHTML = "Tie"
    }
}

function rectangular_collision(rectangle1, rectangle2){
    return (rectangle1.position.x + rectangle1.attack_box.offset.x + rectangle1.attack_box.width >= rectangle2.position.x 
        && rectangle1.position.x + rectangle1.attack_box.offset.x  <= rectangle2.position.x + rectangle2.width 
        && rectangle1.position.y + rectangle1.attack_box.offset.y + rectangle1.attack_box.height >= rectangle2.position.y 
        && rectangle1.position.y + rectangle1.attack_box.offset.y <= rectangle2.position.y + rectangle2.height)
}
    