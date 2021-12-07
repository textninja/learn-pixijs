import spriteUrl from './sample.png';
import './main.css';
import * as pixi from 'pixi.js';

const width = 500;
const height = 400;
const app = new pixi.Application({ width: 500, height: 400, resolution: 2, antialiasing: true, autoDensity: true });

// Sprite 
let sprite = pixi.Sprite.from(spriteUrl);
sprite.scale.set(0.5);

const graphics = new pixi.Graphics;
graphics.beginFill(0x101010);
graphics.drawRoundedRect(30, 30, width-60, height-60, 20);


// Main animation loop
let elapsed = 0.0;
app.ticker.add(delta => {
    elapsed += delta;
    sprite.x = width / 2 - sprite.width/2 + Math.cos(elapsed/50) * width * 0.4;
    sprite.y = (height-sprite.height)/2;
}); 


app.stage.addChild(graphics);
app.stage.addChild(sprite);
document.body.append(app.view); 