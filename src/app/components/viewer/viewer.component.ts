import { Component, OnInit, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { Tween, update } from '@tweenjs/tween.js';

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
    this.initializeScrollControls()
  }

  private async createScene() {
    const modelName = 'scene.glb';

    this.createBasicScene();
    this.loadModel(modelName);
    this.createLights();
    this.initializeRenderer();
    this.initializeCamera();
    this.addEventListeners();
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
      var toneMappingExposure = 0.5;
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
    this.renderer.setClearColor('#EEE6DD', 1);
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
    this.camera.lookAt(0, 5, 0);
  }

  async createLights(){
    //Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.name = 'AmbientLight';
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffeaa0, 2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.name = 'DirectionalLight';

    directionalLight.castShadow = true;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    this.scene.add(directionalLight);
  }

  private addEventListeners() {
    // this.controls.addEventListener('change', () => {
      // console.log(`Posición de la cámara: x=${this.camera.position.x}, y=${this.camera.position.y}, z=${this.camera.position.z}`);
      // console.log(`Target de los controles: x=${this.controls.target.x}, y=${this.controls.target.y}, z=${this.controls.target.z}`);
    // });

    document.addEventListener('click', () => {
    });
  }

  private animate() {
    const render = () => {
      this.renderer.render(this.scene, this.camera);
    }

    const animateLoop = () => {
      this.AFID = requestAnimationFrame(animateLoop);
      update();
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

  private initializeScrollControls() {
    let touchStartY = 0;
    // Scroll en PC
    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        this.handleScroll(event.deltaY);
    }, { passive: false });

    // Scroll en móviles
    window.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
        event.preventDefault();
        const touchEndY = event.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        this.handleScroll(deltaY);
        touchStartY = touchEndY;
    }, { passive: false });

    this.smoothTransform();
  }

  private handleScroll(deltaY: number) {
    this.zoomTarget += deltaY * -0.001;
    this.zoomTarget = Math.min(Math.max(1, this.zoomTarget), 1.7);

    this.rotationTarget = -this.zoomTarget * 0.2;
    this.rotationTarget = Math.min(Math.max(-1, this.rotationTarget), 1);
  }

  private smoothTransform() {
    requestAnimationFrame(() => this.smoothTransform());

    // Interpolación del zoom
    this.camera.zoom = THREE.MathUtils.lerp(this.camera.zoom, this.zoomTarget, this.zoomSpeed);
    if(Math.abs(this.camera.zoom - this.zoomTarget) < 0.001){
      this.camera.zoom = this.zoomTarget;
    }

    // Interpolación de la rotación
    this.camera.rotation.y = THREE.MathUtils.lerp(this.camera.rotation.y, this.rotationTarget, this.rotationSpeed);
    if(Math.abs(this.camera.rotation.y - this.rotationTarget) < 0.001){
      this.camera.rotation.y = this.rotationTarget;
    }

    this.camera.updateProjectionMatrix();
  }

}
