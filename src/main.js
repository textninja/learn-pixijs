import spriteUrl from './sample.png';
import './main.css';
import * as pixi from 'pixi.js';

const width = 800;
const height = 600;
const app = new pixi.Application({ width: width, height: height, resolution: 2, antialiasing: true, autoDensity: true });

const binaryStrip = Array.from({length: 400}, n => Math.random()*256|0);
const dimFactor = binaryStrip.map(n => 1);

var c = document.createElement("canvas");
const pixHeight = 5;
c.width = 800; c.height = 8*pixHeight;
var ctx = c.getContext("2d");
var data = ctx.getImageData(0, 0, c.width, c.height);
const texture = pixi.Texture.from(c);

let p1 = 0; let p2 = binaryStrip.length - 1;
function updateScrubber(currentBit=0) {
    for (let y = 0; y < 8*pixHeight; y++) {
        for (let x = 0; x < c.width; x++) {
            const [r, g, b, a] = [0, 1, 2, 3].map(n => y*c.width*4+x*4+n);
    
            let stripNum = x/2|0;
            let bit = y/pixHeight|0;
            let active = binaryStrip[stripNum]&2**bit;
            data.data[a] = 255;
    
            if (stripNum == p1 || stripNum == p2) {

                if (bit == currentBit) {
                    data.data[r] = data.data[a] = 255;
                    data.data[g] = data.data[b] = 0;
                } else {
                    data.data[r] = data.data[g] = data.data[b] = data.data[a] = 255;
                }
            } else {
                data.data[r] = 0;
                data.data[b] = active ? 197 * dimFactor[stripNum] : 0;
                data.data[g] = active ? 255 * dimFactor[stripNum] : 0;
                data.data[a] = 255;
            }
        }
    }
    ctx.putImageData(data, 0, 0);
}


updateScrubber();
const s1 = new pixi.Sprite(texture);
app.stage.addChild(s1);



let step = 0;
let bit = 0;
let rangeStart = 0;
let rangeEnd = binaryStrip.length;
app.ticker.add((delta) => {
    step += delta;

    for (let i = 0; i < delta; i++) {
        if (bit == 8) continue;

        if (p2 > p1) {
            let [a, b] = [binaryStrip[p1], binaryStrip[p2]];
            let [b1, b2] = [a, b].map(v => v&2**bit);

            if (b1 && !b2) {
                [binaryStrip[p1], binaryStrip[p2]] = [binaryStrip[p2], binaryStrip[p1]];
            } else {
                if (p2 > p1 && !b1) p1++;
                if (p2 > p1 && b2) p2--;
            }
        } else {
            if (p1 > rangeStart + rangeEnd/2) {
                rangeStart = p1;
            } else {
                rangeEnd = p1;
            }

            for (let i = 0; i < dimFactor.length; i++) {
                if (i < rangeStart || i > rangeEnd) {
                    dimFactor[i] = dimFactor[i] * 0.8;
                }
            }

            p1 = rangeStart;
            p2 = rangeEnd;
            bit++;
        }
    }

    updateScrubber(bit);
    texture.update();

});

document.body.append(app.view); 