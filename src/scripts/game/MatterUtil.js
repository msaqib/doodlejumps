import * as Matter from 'matter-js'
export class MatterUtil {
    createBody(x, y, width, height, world, options = {}) {
        const body = Matter.Bodies.rectangle(x, y, width, height, options)
        Matter.World.add(world, body)
        return body
    }
}