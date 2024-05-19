import { Platform } from "./Platform";
export class Platforms {
    constructor() {
        this.platforms = []
        this.createPlatforms()
    }

    createPlatforms() {
        const numPlatforms = 1
        for (let i = 0 ; i < numPlatforms ; i++) {
            const x = 115
            const y = 450
            this.platforms.push(this.createPlatform(x, y))
        }
    }

    createPlatform(x, y) {
        return new Platform(x, y)
    }
}