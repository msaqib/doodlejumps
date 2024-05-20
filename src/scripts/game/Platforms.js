import { Platform } from "./Platform";
export class Platforms {
    constructor() {
        this.platforms = []
        this.createPlatforms()
    }

    createPlatforms() {
        const numPlatforms = 2
        for (let i = 0 ; i < numPlatforms ; i++) {
            const x = 130
            const y = 450
            this.platforms.push(this.createPlatform(x, y-100*i ))
        }
    }

    createPlatform(x, y) {
        return new Platform(x, y)
    }
}