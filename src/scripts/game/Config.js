import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";
import { Game } from "./Game";

export const Config = {
    loader: Tools.importAll(require.context('./../../sprites', true, /\.(png|mp3)$/)),
    bgSpeed: 2,
    scenes: {
        "Game": GameScene,
        "startScene": Game
    },
    screen: {
        width: 300,
        height: 600
    },
    hero: {
        velocity: 10
    }
}