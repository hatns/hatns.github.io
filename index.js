    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 1024
    canvas.height = 576

    c.fillRect(0, 0, canvas.width, canvas.height)

    const gravity = 0.7

    const background = new Sprite({
        position: {
            x: 0,
            y: 0,
            width: 1024,
            height: 576,
        },
        image_source: "img/background.png"
    })

    const shop = new Sprite({
        position: {
            x: 600,
            y: 128,
        },
        scale: 2.75,
        frames_max: 6,
        frame: 3,
        image_source: "img/shop.png"
    })

    const player = new Fighter({
        position:{
            x: 0,
            y: 0
        },
        velocity:{
            x: 0,
            y: 10
        },
        offset: {
            x: 215,
            y: 157
        },
        attack_box: {
            offset: {
                x: 30,
                y: 40
            },
            width: 200,
            height: 50,
        },
        attack_delay: 1000,
        image_source: "img/samuraiMack/Idle.png",
        scale: 2.5,
        frames_max: 8,
        health_id: 'player_health',
        sprites: {
            idle: {
                image_source: "img/samuraiMack/Idle.png",
                frames_max: 8,
            },
            run: {
                image_source: "img/samuraiMack/Run.png",
                frames_max: 8,
            },
            jump: {
                image_source: "img/samuraiMack/Jump.png",
                frames_max: 2,
            },
            fall: {
                image_source: "img/samuraiMack/Fall.png",
                frames_max: 2,
            },
            attack_1: {
                image_source: "img/samuraiMack/Attack1.png",
                frames_max: 6,
            },
            hit: {
                image_source: "img/samuraiMack/Take Hit.png",
                frames_max: 4,
            },
            death: {
                image_source: "img/samuraiMack/Death.png",
                frames_max: 6,
            }
        }
    })

    const enemy = new Fighter({
        position:{
            x: 400,
            y: 100
        },
        velocity:{
            x: 0,
            y: 0
        },
        offset: {
            x: 215,
            y: 167
        },
        attack_box: {
            offset: {
                x: 30 - 200,
                y: 40
            },
            width: 200,
            height: 50,
        },
        attack_delay: 1000,
        image_source: "img/kenji/Idle.png",
        scale: 2.5,
        frames_max: 4,
        health_id: 'enemy_health',
        color: 'green',
        sprites: {
            idle: {
                image_source: "img/kenji/Idle.png",
                frames_max: 4,
            },
            run: {
                image_source: "img/kenji/Run.png",
                frames_max: 8,
            },
            jump: {
                image_source: "img/kenji/Jump.png",
                frames_max: 2,
            },
            fall: {
                image_source: "img/kenji/Fall.png",
                frames_max: 2,
            },
            attack_1: {
                image_source: "img/kenji/Attack1.png",
                frames_max: 4,
            },
            hit: {
                image_source: "img/kenji/Take hit.png",
                frames_max: 3,
            },
            death: {
                image_source: "img/kenji/Death.png",
                frames_max: 7,
            }
        }
    })


    const keys = {
        a: {
            pressed: false,
        },
        d: {
            pressed: false,
        },
        ArrowLeft: {
            pressed: false,
        },
        ArrowRight: {
            pressed: false,
        },
    }

    let timer = 60
    decrease_timer()

    function animate(){
        background.update()
        shop.update()
        player.update()
        enemy.update()
        window.requestAnimationFrame(animate)
        
        player.velocity.x = 0
        enemy.velocity.x = 0
        
        if (player.dead || enemy.dead) end_game()
        if (player.dead)player.frame = player.frames_max - 1
        else if (player.health <= 0) player.switch_sprite("death")
        else{
            if (keys.a.pressed) {
                player.velocity.x += -5 
                player.switch_sprite("run")
            } else if (keys.d.pressed) {
                player.velocity.x += 5
                player.switch_sprite("run")
            } else if (player.health > 0) {
                player.switch_sprite("idle")
            }
            if (player.velocity.y < 0){
                player.switch_sprite("jump")
            } else if (!player.grounded){
                player.switch_sprite("fall")
            }
        }
        if (enemy.dead) enemy.frame = enemy.frames_max - 1
        else if (enemy.health <= 0) enemy.switch_sprite("death")
        else{
            // enemy controls
            if (keys.ArrowLeft.pressed) {
                enemy.velocity.x += -5 
                enemy.switch_sprite("run")
            } else if (keys.ArrowRight.pressed) {
                enemy.velocity.x += 5
                enemy.switch_sprite("run")
            } else if (enemy.health > 0) {
                enemy.switch_sprite("idle")
            }
            if (enemy.velocity.y < 0){
                enemy.switch_sprite("jump")
            } else if (!enemy.grounded){
                enemy.switch_sprite("fall")
            }
        }
        // detect collision
        if(rectangular_collision(player, enemy) && player.is_attacking && player.image == player.sprites.attack_1.image && player.frame > 3){
            enemy.take_damage(player.damage)
        }
        if(rectangular_collision(enemy, player) && enemy.is_attacking && enemy.image == enemy.sprites.attack_1.image && enemy.frame > 1){
            player.take_damage(enemy.damage)
        }
        console.log(player.grounded)
    }
    animate()