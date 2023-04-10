class Sprite {
    constructor({position, scale = 1, frames_max = 1, image_source, offset = {x: 0, y:0}}){
        this.frames_max = frames_max
        this.position = position
        this.offset = offset    
        this.image = new Image()
        this.image.src = image_source
        this.scale = scale
        this.frame = 0
        this.frames_elapsed = 0
        this.frames_hold = 5
    }

    draw(){
        c.drawImage(
            this.image, 
            this.image.width / this.frames_max * this.frame,
            0,
            this.image.width/this.frames_max,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            this.image.width/this.frames_max * this.scale, 
            this.image.height * this.scale)
    }

    animate_frames(){
        this.draw()
        this.frames_elapsed++
        if(this.frames_elapsed%this.frames_hold != 0){
            return
        }
        if(this.frame < this.frames_max - 1){
            this.frame++
        }
        else{
            this.frame = 0
        }
    }

    update(){
        this.animate_frames()
    }
}      

class Fighter extends Sprite {
    constructor({position, velocity, color = 'red', attack_box, health_id, scale = 1, frames_max = 1, image_source, offset = {x: 0, y: 0}, sprites, attack_delay}){
        super({
            position, 
            scale, 
            frames_max, 
            offset
        })
        this.attack_box = attack_box
        this.image = new Image()
        this.image.src = image_source
        this.frames_elapsed = 0
        this.frames_hold = 5
        this.frame = 0
        console.log(image_source)
        this.velocity = velocity
        this.health_id = health_id
        this.height = 150
        this.width = 50
        this.health = 100
        this.damage = 10
        this.attack_delay = attack_delay
        this.color = color
        this.is_attacking
        this.attack_lock = false
        this.dodge_frame = false
        this.grounded = false
        this.sprites = sprites
        this.dead = false

        for (const sprite in sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].image_source
        }
        console.log(this.sprites)
    }


    update(){
        this.draw()
        this.animate_frames()
        this.position.x += this.velocity.x
                
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 90){
            this.velocity.y = 0
            this.position.y = canvas.height - 90 - this.height
            this.grounded = true
        } else {
            this.velocity.y += gravity
            this.grounded = false
        }
    }

    

    attack(){
        if (!this.attack_lock){
            this.switch_sprite("attack_1")
            this.is_attacking = true
        }
    }

    

    switch_sprite(sprite){
        if (this.dead){
            return
        }
        if (this.health <= 0){
            console.log("Im dying")
            if (this.frame == this.frames_max - 1){
                console.log("I died")
                this.dead = true
            }
        }
        if (this.image == this.sprites.attack_1.image || this.image == this.sprites.hit.image){
            if (this.frame == this.frames_max - 1){
                this.image = this.sprites.idle.image
                this.frames_max = this.sprites.idle.frames_max
            }
            else {
                return
            }
        }
        switch (sprite){
            case 'idle':
                if (this.image != this.sprites.idle.image)
                {
                    this.frames_max = this.sprites.idle.frames_max
                    this.frame = 0
                    this.image = this.sprites.idle.image
                }
                break
            case 'run':
                if (this.image != this.sprites.run.image)
                {
                    this.frames_max = this.sprites.run.frames_max
                    this.frame = 0
                    this.image = this.sprites.run.image
                }
                break
            case 'jump':
                if (this.image != this.sprites.jump.image)
                {
                    this.frames_max = this.sprites.jump.frames_max
                    this.frame = 0
                    this.image = this.sprites.jump.image
                }
                break
            case 'fall':
                if (this.image != this.sprites.fall.image)
                {
                    this.frames_max = this.sprites.fall.frames_max
                    this.frame = 0
                    this.image = this.sprites.fall.image
                }
                break
            case 'attack_1':
                if (this.image != this.sprites.attack_1.image)
                {
                    this.frames_max = this.sprites.attack_1.frames_max
                    this.frame = 0
                    this.image = this.sprites.attack_1.image
                }
                break
            case 'hit':
                if (this.image != this.sprites.hit.image)
                {
                    this.frames_max = this.sprites.hit.frames_max
                    this.frame = 0
                    this.image = this.sprites.hit.image
                }
                break
            case 'death':
                if (this.image != this.sprites.death.image)
                {
                    this.frames_max = this.sprites.death.frames_max
                    this.frame = 0
                    this.image = this.sprites.death.image
                }
        }
    }

    take_damage(damage){

        if (!this.dodge_frame){
            this.health -= damage
            console.log(this.health_id)
            gsap.to('#'+this.health_id, {
                width: this.health + "%",
            })
            this.dodge_frame = true
            if (this.health <= 0){
                this.switch_sprite("death")
            } else this.switch_sprite("hit")
            setTimeout(() => {
                this.dodge_frame = false
            }, 100)
        }
        

    }
}