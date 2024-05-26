import { Platform } from "./Platform";
import { App } from "../system/App";
import * as Matter from 'matter-js'
export class Platforms {
    constructor(callback) {
        this.platforms = []
        this.addPlatformCallback = callback
        this.createPlatforms()
    }

    createPlatforms() {
        let x = 130
        let y = 450
        while(y >= App.config.platforms.distance.y.min) {
            this.platforms.push(this.createPlatform(x, y))
            y = y - (Math.random()*(App.config.platforms.distance.y.max - App.config.platforms.distance.y.min) + App.config.platforms.distance.y.min)
            const xOffset = Math.random() * (App.config.platforms.distance.x.max - App.config.platforms.distance.x.min) + App.config.platforms.distance.x.min
            if (x > App.config.screen.width / 2) {
                x = Math.max(x - xOffset, 0)
            }
            else {
                x = Math.min(x + xOffset, App.config.screen.width - 0.15 * this.platforms[0].sprite.width)
            }
        }
    }

    createPlatform(x, y) {
        return new Platform(x, y)
    }

    update(dt) {
        this.platforms.forEach(platform => {
            platform.update(dt)
        })
        const minY = Math.min(...this.platforms.map(platform => platform.sprite.y))
        if (minY > App.config.platforms.distance.y.max) {
            const y = Math.random()*(minY - App.config.platforms.distance.y.min)
            const currentX = this.platforms[this.platforms.length - 1].sprite.x
            let x = Math.random() * (App.config.platforms.distance.x.max - App.config.platforms.distance.x.min) + App.config.platforms.distance.x.min
            if (currentX > App.config.screen.width / 2) {
                x = currentX - x
            }
            else {
                x = currentX + x
            }
            this.platforms.push(this.createPlatform(x, y))
            this.addPlatformCallback(this.platforms[this.platforms.length - 1])
        }
        const gone = this.platforms.findIndex( platform => platform.sprite.y > App.config.screen.height)
        if (gone !== -1) {
            this.platforms[gone].destroy()
            Matter.World.remove(App.physics.world, this.platforms[gone].body)
            this.platforms.splice(gone, 1)
        }
    }

    destroy() {
        this.platforms.forEach(platform => {
            Matter.World.remove(App.physics.world, platform.body)
            platform.destroy()
        })
    }
}