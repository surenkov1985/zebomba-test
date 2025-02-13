import "./assets/game/script";
import {Game, points} from "./assets/game/script";

const hero = document.querySelector('.hero')
const game = new Game(hero, points)

game.start()