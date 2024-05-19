import * as PIXI from 'pixi.js'
import { App } from '../system/App'
export class Platform {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.createSprite()
    }

    createSprite() {
        this.sprite = new PIXI.Sprite(App.res('Block'))
        this.sprite.x = this.x
        this.sprite.y = this.y
        this.sprite.scale = 0.15
    }
}