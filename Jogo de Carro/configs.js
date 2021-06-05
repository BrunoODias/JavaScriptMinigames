import {Player} from './player.js';
import {Road} from './road.js';
import {npcController} from './npcController.js';

window.Cars = [];

export function InitGame() {
    const player = new Player();
    const road = new Road();
    function Init() {
        road.init();
        player.init();
        var stop = ()=>{
            controller.stop();
            player.stop();
            road.stop();
            clearInterval(intervalSpeed);
            document.getElementById('fim').className = '';
            document.getElementsByClassName('road')[0].className = 'road position-relative d-none';
            document.getElementById('infos').className = 'd-none'; 
        }
        var controller = new npcController(player,stop);
        var intervalSpeed = setInterval(function(){
            road.increaseSpeed();
            player.increaseSpeed();
            controller.increaseTransit();
        },30000);
        controller.init();
        window.stop = stop;
    };
    Init();
};

export function InitMenu(){
    function seq(){
        const container = document.getElementsByClassName('car-selector-container')[0];
        container.innerHTML = '';
        for(var current of Cars){
            container.innerHTML += `<img class="car-selector" src="${current}">`;
        }
        for(var current of document.getElementsByClassName('car-selector')){
            current.addEventListener('click',function(){
                document.getElementById('Player').style.background = `url(${this.src})`;
                document.getElementById('menu').remove();
                document.getElementsByClassName('road')[0].className = 'road position-relative'; 
                document.getElementById('infos').className = 'd-flex'; 
                
                InitGame();
            });
        }
    }

    fetch('./cars.json').then(x=>x.json()).then(obj => {
        Cars = obj.cars;
        seq();
    });
}