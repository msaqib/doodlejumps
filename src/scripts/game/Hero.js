import * as PIXI from 'pixi.js'
import {App} from '../system/App.js'
import * as Matter from 'matter-js'
import { MatterUtil } from './MatterUtil.js'

export class Hero {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.dx = 0
        this.vy = App.config.hero.velocity
    }

    async createSprite() {
        const atlasData = {
            frames: {
                straight: {
                    frame: { x: 35, y:50, w:45, h:78 },
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

    createBody() {
        const mu = new MatterUtil()
        this.body = mu.createBody(this.x + this.sprite.width / 2, this.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, App.physics.world, {friction: 0})
        this.body.gameHero = this
    }

    update(dt) {
        Matter.Body.setVelocity(this.body, {x: this.dx, y:this.body.velocity.y})
        if(this.body.position.x >= App.config.screen.width + this.sprite.width/2) {
            Matter.Body.setPosition(this.body, {x: 0, y:this.body.position.y})
        }
        if(this.body.position.x <= -this.sprite.width/2) {
            Matter.Body.setPosition(this.body, {x: App.config.screen.width, y:this.body.position.y})
        }
        this.sprite.x = this.body.position.x - this.sprite.width / 2
        this.sprite.y = this.body.position.y - this.sprite.height / 2
    }

    startJump() {
        Matter.Body.setVelocity(this.body, {x: 0, y: -this.vy})
    }

    moveRight() {
        this.dx = App.config.hero.velocityx
    }

    moveLeft() {
        this.dx = -App.config.hero.velocityx
    }

    straighten() {
        this.dx = 0
    }
}