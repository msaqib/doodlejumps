import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { App } from "../system/App";

export class GameScene extends Scene {
    create() {
        this.createBackground();
        this.createHero(App.config.screen.width / 2, App.config.screen.height * 3 / 4)
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
    }

    update(dt) {
        super.update(dt)
        this.hero.update(dt)
        // /this.bg.update(dt.deltaTime);
    }
}