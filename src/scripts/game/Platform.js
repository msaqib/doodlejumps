import * as PIXI from 'pixi.js'
import { App } from '../system/App'
import { MatterUtil } from './MatterUtil'

export class Platform {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.createSprite()
        const mu = new MatterUtil()
        this.body = mu.createBody(this.x + this.sprite.width / 2, this.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, App.physics.world, {isStatic: true, isSensor: true})
        this.body.gamePlatform = this
    }

    createSprite() {
        this.sprite = new PIXI.Sprite(App.res('Block'))
        this.sprite.x = this.x
        this.sprite.y = this.y
        this.sprite.scale = 0.15
    }

    update(dt) {
        this.sprite.y = this.body.position.y
    }

    destroy() {
        this.sprite.visible = false
    }
}