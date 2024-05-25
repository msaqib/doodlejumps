import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { App } from "../system/App";
import { Platforms } from "./Platforms";
import * as Matter from 'matter-js'
import { Tools } from "../system/Tools";

export class GameScene extends Scene {
    create() {
        this.createBackground();
        this.createHero(App.config.screen.width / 2, App.config.screen.height * 3 / 4)
        this.createPlatforms()
        this.registerEvents()
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    async createHero(x, y) {
        this.hero = new Hero(x, y )
        await this.hero.createSprite()
        this.hero.sprite.zIndex = 10
        this.hero.createBody()
        const right = Tools.keyboard('ArrowRight')
        right.press = this.hero.moveRight.bind(this.hero)
        right.release = this.hero.straighten.bind(this.hero)
        const left = Tools.keyboard('ArrowLeft')
        left.press = this.hero.moveLeft.bind(this.hero)
        left.release = this.hero.straighten.bind(this.hero)
        this.container.addChild(this.hero.sprite)
        this.hero.startJump()
    }

    createPlatforms() {
        this.platforms = new Platforms(this.addPlatform.bind(this))
        this.platforms.platforms.forEach(platform => {
            this.container.addChild(platform.sprite)
            platform.sprite.once('include', () => {
                this.container.addChild(platform.sprite)
            })
        })
    }

    registerEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this))
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB]
        const hero = colliders.find((body) => body.gameHero)
        const platform = colliders.find((body) => body.gamePlatform)
        if (hero && platform && this.hero.body.velocity.y >= 0) {
            this.hero.startJump()
        }
    }

    update(dt) {
        super.update(dt)
        this.hero.update(dt)
        this.platforms.update(dt)
        if (this.hero.sprite.y < App.config.screen.height / 4) {
            App.physics.world.bodies.forEach( body => {
                Matter.Body.translate(body, {x: 0, y: -this.hero.body.velocity.y / dt.deltaTime})
            })
        }
        // if (this.platforms.platforms[this.platforms.platforms.length - 1].sprite.y > App.config.platforms.distance.max) {
        //     this.platforms.platforms.push(this.platforms.createPlatform(Math.random()*App.config.screen.width, Math.random()*(App.config.platforms.distance.max - App.config.platforms.distance.min) + App.config.platforms.distance.min))
        //     this.container.addChild(this.platforms.platforms[this.platforms.platforms.length - 1].sprite)
        // }
    }

    addPlatform(platform) {
        this.container.addChild(platform.sprite)
    }
}