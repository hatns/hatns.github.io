window.addEventListener('keydown', (event) => {
    switch(event.key){
        // Player controls
        case 'w':
            if(player.grounded && player.health > 0)
                player.velocity.y = -20
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case 's':
            player.attack()
            player.attack_lock = true
            break

        // Enemy controls
        case 'ArrowUp':
            if (enemy.grounded && enemy.health > 0)
                enemy.velocity.y = -20
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case 'ArrowDown':
            enemy.attack()
            enemy.attack_lock = true
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 's':
            player.attack_lock = false
            break
        case 'ArrowDown':
            enemy.attack_lock = false
            break;

    }
})