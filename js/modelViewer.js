// js/modelViewer.js

function createViewer(canvasId, modelPath) {

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / 300,
    0.1,
    1000
  );

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });

  renderer.setSize(canvas.clientWidth, 300);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lighting
  const light1 = new THREE.DirectionalLight(0xffffff, 2);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Loader
  const loader = new THREE.GLTFLoader();

  loader.load(
    modelPath,

    function (gltf) {
      const model = gltf.scene;

      // Auto center + scale
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      const scale = 2 / size;
      model.scale.set(scale, scale, scale);

      scene.add(model);
    },

    undefined,

    function (error) {
      console.error("Error loading model:", error);
    }
  );

  camera.position.set(0, 1, 5);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

// 🔥 LOAD 4 MODELS
createViewer("model1", "models/linac_4.glb");
createViewer("model2", "models/ps.glb");
createViewer("model3", "models/psb_peiode_01.glb");
createViewer("model4", "models/cms_detector.glb");
