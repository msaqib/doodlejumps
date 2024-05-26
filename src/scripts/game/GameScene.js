import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { App } from "../system/App";
import { Platforms } from "./Platforms";
import * as Matter from 'matter-js'
import { Tools } from "../system/Tools";
import { Stats } from "./Stats";
import { Hud } from "./Hud";

export class GameScene extends Scene {
    create() {
        this.stats = new Stats()
        this.createBackground();
        this.createHero(App.config.screen.width / 2, App.config.screen.height * 3 / 4 - 100)
        this.createPlatforms()
        this.registerEvents()
        this.createHud()
        this.currentPlatform = null
        this.collisionHandler = this.onCollisionStart.bind(this)
    }

    createHud() {
        this.hud = new Hud(this.stats.livesRemaining, this.stats.score)
        this.container.addChild(this.hud.container)
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
        this.hero.sprite.once('die', () => {
            App.app.ticker.remove(this.update, this)
            this.unRegisterEvents()
            this.platforms.destroy()
            Matter.World.remove(App.physics.world, this.hero.body)
            this.currentPlatform = null
            this.stats.livesRemaining--
            if (this.stats.livesRemaining > 0) {
                App.scenes.start('Game')
            }
            else {
                App.scenes.start('GameOver')
            }
        })
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
        this.boundCollisionHandler = this.onCollisionStart.bind(this)
        Matter.Events.on(App.physics, 'collisionStart', this.boundCollisionHandler)
    }

    unRegisterEvents() {
        Matter.Events.off(App.physics, 'collisionStart', this.boundCollisionHandler)
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB]
        const hero = colliders.find((body) => body.gameHero)
        const platform = colliders.find((body) => body.gamePlatform)
        if (hero && platform && hero.velocity.y >= 0 && hero.gameHero.sprite.y <= platform.gamePlatform.sprite.y) {
            if (!this.currentPlatform || (this.currentPlatform !== platform && this.currentPlatform.gamePlatform.sprite.y > platform.gamePlatform.sprite.y)) {
                this.currentPlatform = platform
                this.stats.score += 100
                this.hud.update(this.stats.score)
            }
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
    }

    addPlatform(platform) {
        this.container.addChild(platform.sprite)
    }
}