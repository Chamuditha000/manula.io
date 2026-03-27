// js/modelViewer.js

function createViewer(canvasId, modelPath) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  console.log("Loading:", modelPath);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(300, 300);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const loader = new THREE.GLTFLoader();

  loader.load(
    modelPath,
    function (gltf) {
      console.log("SUCCESS:", modelPath);

      const model = gltf.scene;

      // SIMPLE FIX (no scaling complexity)
      model.scale.set(1, 1, 1);
      model.position.set(0, 0, 0);

      scene.add(model);
    },
    undefined,
    function (error) {
      console.error("FAILED:", modelPath);
    }
  );

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}


// 🔥 LOAD MODELS (TEST ONE BY ONE FIRST)
createViewer("model1", "models/linac_4.glb");
createViewer("model2", "models/psb_peiode_01.glb");
createViewer("model3", "models/ps.glb");
createViewer("model4", "models/cms_detector.glb");
