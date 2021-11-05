const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const FBXloader = new THREE.FBXLoader();
FBXloader.load('assets/G-RumbaDancing.fbx', obj => {
  console.warn(obj);
  scene.add(obj);
  render();
});

// const GLTFlaoder = new THREE.GLTFLoader();
// GLTFlaoder.load('assets/RumbaDancing.glb', obj => {
//   console.warn(obj);
//   scene.add(obj.scene);
//   render();
// });

//环境光
// var ambient = new THREE.AmbientLight(0x444444);
// scene.add(ambient);

var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 5; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 自动检测鼠标事件，转化为相机旋转角度
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);

function render() {
  renderer.render(scene, camera);
}
