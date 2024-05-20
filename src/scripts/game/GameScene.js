import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { App } from "../system/App";
import { Platforms } from "./Platforms";

export class GameScene extends Scene {
    create() {
        this.createBackground();
        this.createHero(App.config.screen.width / 2, App.config.screen.height * 3 / 4)
        this.createPlatforms()
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    async createHero(x, y) {
        this.hero = new Hero(x, y )
        await this.hero.createSprite()
        this.hero.createBody()
        this.container.addChild(this.hero.sprite)
        this.hero.startJump()
    }

    createPlatforms() {
        this.platforms = new Platforms()
        this.platforms.platforms.forEach(platform => {
            this.container.addChild(platform.sprite)
        })
    }

    update(dt) {
        super.update(dt)
        this.hero.update(dt)
        if (this.landedOnPlatform()) 
            this.hero.startJump()
    }

    landedOnPlatform() {
        if (this.hero.body.velocity.y >= 0) {
            return this.platforms.platforms.some(platform => {
                if (this.hero.sprite.x + this.hero.sprite.width * 3 / 4 >= platform.sprite.x && this.hero.sprite.x + this.hero.sprite.width / 2 <= platform.sprite.x + platform.sprite.width) {
                    if (this.hero.sprite.y + this.hero.sprite.height - platform.sprite.y > -0.1) {
                        return true
                    }
                }
                return false
            })
        }
        return false
    }
}