import {Player} from './player.js';
import {Road} from './road.js';
import {npcController} from './npcController.js';
(function () {
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
})();