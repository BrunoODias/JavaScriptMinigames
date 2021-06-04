export const INTERVAL_MILISECONDS = 20;
export const _display = document.getElementById('display');

export class Road{
    
    _distanceMeter = document.getElementById('distanceMeter');
    init = () => {
        this.stop();
        display.scrollBy(0,999999);
        this._speed = -4;
        this._distance = 0;
        this._initRefreshRoad();
    }

    _refreshRoad(){
        display.scrollBy(0, this._speed);
        this._distance+=this._speed;
        this._distanceMeter.innerText = `Distância percorrida: ${(this._distance/2500).toFixed(2)*-1}km`;
    }

    _initRefreshRoad() {
        this._interval = setInterval(() => {
            this._refreshRoad();
        }, INTERVAL_MILISECONDS);
    }

    increaseSpeed(){
        this._speed--;
    }

    stop = ()=>{
        if (this._interval)
            clearInterval(this._interval);
    }
}