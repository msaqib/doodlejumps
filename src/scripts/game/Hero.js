import * as PIXI from 'pixi.js'
import {App} from '../system/App.js'

export class Hero {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vy = App.config.hero.velocity
    }

    async createSprite() {
        const atlasData = {
            frames: {
                straight: {
                    frame: { x: 30, y:50, w:70, h:78 },
                },
            },
            meta: {
                image: '../sprites/Jump.png',
                format: 'RGBA8888',
                size: { w: 1408, h: 128 },
                scale: 1
            },
        }
        this.spritesheet = new PIXI.Spritesheet(App.res('Jump'), atlasData)
        await this.spritesheet.parse()
        this.sprite = new PIXI.Sprite(this.spritesheet.textures.straight)
        this.x = this.x - this.sprite.width / 2
        this.sprite.x = this.x 
        this.sprite.y = this.y
    }

    // createBody() {
    //     this.body = Matter.Bodies.rectangle(this.x + this.sprite.width / 2, this.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0})
    //     Matter.World.add(App.physics.world, this.body)
    //     this.body.gameHero = this
    // }

    // update(dt) {
    //     this.sprite.x = this.body.position.x - this.sprite.width / 2
    //     this.sprite.y = this.body.position.y - this.sprite.height / 2
    // }

    // startJump() {
    //     Matter.Body.setVelocity(this.body, {x: 0, y: -this.vy})
    // }
}