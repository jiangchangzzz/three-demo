/**
     * 创建场景对象Scene
     */
 var scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

 /**
  * 创建网格模型
  */
//  var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
 var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
 var material = new THREE.MeshLambertMaterial({
   color: 0x0000ff,
 }); //材质对象Material
//  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//  scene.add(mesh); //网格模型添加到场景中

const textureLoader = new THREE.TextureLoader();
textureLoader.load('./src/test01_hair_woman.png', (texture) => {
  const material = new THREE.MeshLambertMaterial({
    map: texture
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  render();
});

/**
 * 创建球体网格模型
 */
// const ballGeometry = new THREE.SphereGeometry(60, 40, 40);
// const ballMaterial = new THREE.MeshLambertMaterial({
//   color: 0x0000ff
// }); //材质对象Material
// const ball = new THREE.Mesh(ballGeometry, ballMaterial);
// scene.add(ball);
// ball.position.set(0, 0, 0);

 /**
  * 光源设置
  */
 //点光源
 var point = new THREE.PointLight(0xffffff);
 point.position.set(400, 200, 300); //点光源位置
 scene.add(point); //点光源添加到场景中

 const bottomPoint = new THREE.PointLight(0xffffff);
 bottomPoint.position.set(-400, -200, -300);
 scene.add(bottomPoint);

 //环境光
 var ambient = new THREE.AmbientLight(0x444444);
 scene.add(ambient);
 console.log(scene)
 console.log(scene.children)

 /**
  * 相机设置
  */
 var width = window.innerWidth; //窗口宽度
 var height = window.innerHeight; //窗口高度
 var k = width / height; //窗口宽高比
 var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
 //创建相机对象
 var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
 camera.position.set(200, 300, 200); //设置相机位置
 camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

 /**
  * 创建渲染器对象
  */
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(width, height);//设置渲染区域尺寸
 renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
 document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

 function render() {
  //执行渲染操作   指定场景、相机作为参数
  renderer.render(scene, camera);
 }
render();

// 动画
// let last = Date.now();
// function animation() {
//   const now = Date.now();
//   const duration = now - last;
//   last = now;
//   renderer.render(scene, camera);
//   mesh.rotateY(0.001 * duration); // 旋转0.01弧度

//   requestAnimationFrame(() => {
//     animation();
//   });
// }
// animation();

// 自动检测鼠标事件，转化为相机旋转角度
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
