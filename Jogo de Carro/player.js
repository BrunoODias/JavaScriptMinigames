import { INTERVAL_MILISECONDS } from './road.js';
import {_display} from './road.js';
var dirx = 0;
var diry = 0;

function initKeyEvents() {
    const events = Object.freeze({
        ArrowLeft: () => {
            dirx = -1;
        },
        ArrowUp: () => {
            diry = -1;
        },
        ArrowRight: () => {
            dirx = 1;
        },
        ArrowDown: () => {
            diry = 1;
        }
    });
    const eventsUp = Object.freeze({
        ArrowLeft: () => {
            dirx = 0;
        },
        ArrowUp: () => {
            diry = 0;
        },
        ArrowRight: () => {
            dirx = 0;
        },
        ArrowDown: () => {
            diry = 0;
        }
    });

    document.addEventListener('keydown', function (e) {
        if (events[e.key] != null)
            events[e.key]();
    })

    document.addEventListener('keyup', function (e) {
        if (eventsUp[e.key] != null)
            eventsUp[e.key]();
    })
}



export class Player {
    _player = document.getElementById('Player');
    init = () => {
        this.stop();

        this._player.style.top = + '79800px';
        this._player.style.left = + '325px';
        this._velx = 5;
        this._vely = 7;


        initKeyEvents();
        this._initPlayerMovement();
    }

    _getDirection = (el, prop) => Number(el.style[prop]?.replace('px', ''));
    _setDirection = (el, prop, value) => el.style[prop] = (value + 'px');

    _refreshPlayerPosition() {
        var newX = this._getDirection(this._player, 'left') + (this._velx * dirx);
        if (newX < 550 && newX > 100)
            this._setDirection(this._player, 'left', newX);

        // var vely = diry == 1 ? this._vely : (this._vely /0.5);
        var vely = this._vely;
        var novoTop = this._getDirection(this._player, 'top') + (vely * diry);
        var minTop = _display.scrollTop, maxTop = (minTop + _display.clientHeight - this._player.clientHeight);
        if (novoTop > minTop && novoTop < maxTop)
            this._setDirection(this._player, 'top', novoTop);
        else if (novoTop > maxTop)
            this._setDirection(this._player, 'top', maxTop - 1);
    }

    _initPlayerMovement() {
        this._movementInterval = setInterval(() => this._refreshPlayerPosition(), INTERVAL_MILISECONDS);
    }

    increaseSpeed() {
        this._velx++;
        this._vely++;
    }

    stop = () => {
        if (this._movementInterval)
            clearInterval(this._movementInterval);
    }
}