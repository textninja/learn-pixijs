import spriteUrl from './sample.png';
import './main.css';
import * as pixi from 'pixi.js';

const width = 800;
const height = 600;
const app = new pixi.Application({ antialias: true });
//const graphics = new pixi.Graphics;

let sprite = pixi.Sprite.from(spriteUrl);

app.stage.addChild(sprite);

let elapsed = 0.0;

app.ticker.add(delta => {
    elapsed += delta;
    sprite.x = width / 2 - sprite.width/2 + Math.cos(elapsed/50) * width * 0.4;
}); 


document.body.append(app.view); 