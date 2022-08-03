
import "./static/src/objects.js";
import "./static/src/PCcontroller.js"
import "./static/src/shooter.js"

import "./static/src/objects.js";
import "./static/src/mobilecontroller.js"
import "./static/src/friendlyerror.js"

import { GameSocket } from "./static/src/socket.js";

var PostInitEvent = new Event('postInit');
var AnimateEvent = new CustomEvent('animateEvent', { 'delta': null })
var prevTime = performance.now();

window.camera = null;
window.renderer = null;
window.scene = null;
window.objects = [];

initsys();
// var sck = new GameSocket(new URL(window.location.href).searchParams.get("ip"));
document.dispatchEvent(PostInitEvent);
animate();


function initsys() {

    window.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    window.scene = new THREE.Scene();
    window.scene.add(window.camera);
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([  //load pictures with sky texture
        './static/textures/sky/5.png',//    |#1#|
        './static/textures/sky/3.png',//    |###|
        './static/textures/sky/1.png',// #3#|#4#|#5#|#6#|
        './static/textures/sky/2.png',// ###|###|###|###|
        './static/textures/sky/4.png',//    |#2#|
        './static/textures/sky/6.png',//    |###|
    ]);
    texture.minFilter = THREE.LinearFilter;
    window.scene.background = texture;

    window.renderer = new THREE.WebGLRenderer({ antialias: true });
    window.renderer.shadowMap.enabled = true;
    window.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    window.renderer.setPixelRatio(window.devicePixelRatio);
    window.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(window.renderer.domElement);

    window.addEventListener('resize', function () {
        window.camera.aspect = window.innerWidth / window.innerHeight;
        window.camera.updateProjectionMatrix();
        window.renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
}


function animate() {
    requestAnimationFrame(animate);
    var time = performance.now();
    var delta = (time - prevTime) / 1000;

    AnimateEvent.delta = delta;
    document.dispatchEvent(AnimateEvent);
    prevTime = time;
    window.renderer.render(window.scene, window.camera);
}
