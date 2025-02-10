import { Component, OnInit, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

@Component({
  selector: 'app-viewer',
  imports: [],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.css'
})
export class ViewerComponent implements OnInit{
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  AFID!: number;
  raycaster: THREE.Raycaster = new THREE.Raycaster;
  cargaCompleta: boolean = false;
  zoomTarget: number = 1; // Valor objetivo del zoom
  zoomSpeed: number = 0.2;
  rotationTarget: number = 0; // Valor objetivo de la rotación en Y
  rotationSpeed: number = 0.05;
  scroll: number = 0;

  constructor(
    private renderer2: Renderer2
  ){}

  ngOnInit(): void {
    this.createScene();
  }

  private async createScene() {
    const modelName = 'scene-2.glb';

    this.createBasicScene();
    this.loadModel(modelName);
    this.createLights();
    this.initializeRenderer();
    this.initializeCamera();
    this.animate();
    this.setupResizeListener();
  }

  private createBasicScene() {
    this.scene = new THREE.Scene();
    this.addHdrBg();
  }

  private addHdrBg(){
    new RGBELoader()
    .setPath( 'assets/hdr/' )
    .load( 'prueba.hdr',  ( texture: THREE.Texture ) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      var toneMappingExposure = 0.7;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      var pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      pmremGenerator.compileEquirectangularShader();

      var envMap = pmremGenerator.fromEquirectangular(texture).texture;
      this.scene.environment = envMap;

      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = toneMappingExposure;
      this.renderer.render(this.scene, this.camera);

    });
  }

  private loadModel(modelName: string): void {
    const manager = new THREE.LoadingManager();
    manager.onLoad = (() => {
      this.cargaCompleta = true;
    })

    const loader = new GLTFLoader(manager);
    loader.load('assets/models/' + modelName, async (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap>; }) => {
      gltf.scene.traverse(n => {
        if ((<THREE.Mesh>n).isMesh) {
          const mesh = n as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      })

      gltf.scene.position.set(0,0,0);
      this.scene.add(gltf.scene);
    },
    );

    console.log(this.scene);
  }

  private initializeRenderer(){
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('lightgray', 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.CineonToneMapping;

    const container = document.getElementById('three-container');

    if(container) {
      container.appendChild(this.renderer.domElement);
    }
    else {
      console.error("No se encontró el contenedor con id 'three-container'.");
    }
  }

  private initializeCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 50;
    this.camera.position.y = 20;
    this.camera.lookAt(0, 4, 0);
  }

  async createLights(){
    //Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.name = 'AmbientLight';
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(-6, 2, 6);
    directionalLight.name = 'DirectionalLight';

    directionalLight.castShadow = true;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    this.scene.add(directionalLight);
  }

  private animate() {
    const render = () => {
      this.renderer.render(this.scene, this.camera);
    }

    const animateLoop = () => {
      this.AFID = requestAnimationFrame(animateLoop);
      render();
    };

    animateLoop();
  }

  private setupResizeListener() {
    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);
  }

}
