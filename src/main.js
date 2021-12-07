import './main.css';
import * as pixi from 'pixi.js';

const width = 800;
const height = 600;
const app = new pixi.Application({ antialias: true });
const graphics = new pixi.Graphics;

graphics
    .lineStyle(3, 0xffffff, 1)
    .drawRoundedRect(100, 100, width-200, height-200, 20);

app.stage.addChild(graphics);

document.body.append(app.view); 