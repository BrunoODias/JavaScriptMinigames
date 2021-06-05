import { _display, INTERVAL_MILISECONDS } from './road.js'

export const lanes = Object.freeze([120, 206, 293, 380, 468, 550]);

const rangeIntersect = (min0, max0, min1, max1) => Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)

const rectIntersect = (r0, r1) => rangeIntersect(r0.left, r0.right, r1.left, r1.right) && rangeIntersect(r0.top, r0.bottom, r1.top, r1.bottom)

const BBoxC = document.getElementById('infos').getBoundingClientRect();

export class npcController {
    constructor(player, callBack) {
        this._player = player;
        this._callBack = callBack;
    }

    init = () => {
        this.stop();
        this._timerToAddCar = 1_000;

        this._addCar();
        this._interval = setInterval(() => this.validCrash(), INTERVAL_MILISECONDS);
        this._addEventAddCar();
    }

    stop = () => {
        if (this._interval)
            clearInterval(this._interval);
        if (this._intervalAddCar)
            clearInterval(this._intervalAddCar);
    }

    _addEventAddCar() {
        if (this._timerToAddCar < 300)
            this._timerToAddCar = 300;

        this._addCar();
        this._addCar();
        this._intervalAddCar = setInterval(() => {
            this._addCar();
        }, this._timerToAddCar);
    }

    _addCar() {
        const npcCar = document.createElement('div');
        var carSprite = (Math.round(Math.random() * (Cars.length + 0.49999)));
        if(carSprite == 0){
            carSprite = 1;
        }

        npcCar.style.background = `Url(Images/car${carSprite}.png)`;
        npcCar.className = 'car NPC';
        npcCar.innerHTML = '<div class="w-100 h-100 carContent"></div>';
        var leftNPC = (lanes[Math.round(Math.random() * lanes.length - 0.1)]);
        if(leftNPC == null){
            leftNPC = lanes[0];
        }
        npcCar.style.left = leftNPC + 'px';
        npcCar.style.top = (this._player._player.style.top.replace('px', '') - _display.clientHeight) + 'px';

        document.getElementsByClassName('road')[0].appendChild(npcCar);
    }

    validCrash() {
        for (var current of document.getElementsByClassName('carContent')) {
            var BBoxB = current.getBoundingClientRect(); 
            if (rectIntersect(BBoxB, BBoxC)) {
                current.parentElement.remove();
            }

            var BBoxA = this._player._player.children[0].getBoundingClientRect();

            if (rectIntersect(BBoxA, BBoxB)) {
                this.stop();
                this._callBack();
            }
        }
    }

    increaseTransit = () => {
        if (this._intervalAddCar)
            clearInterval(this._intervalAddCar);

        this._timerToAddCar -= 450;
        this._addEventAddCar();
    }
}