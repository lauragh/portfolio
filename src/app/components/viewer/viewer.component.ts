import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChildren, inject } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import * as english from '@en';
import * as spanish from '@es';
import { DataService } from '../../services/data.service';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-viewer',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.css'
})
export class ViewerComponent implements OnInit, AfterViewInit{
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  private dataService = inject(DataService);
  private router = inject(Router)
  private renderer2 = inject(Renderer2)

  public divShadow?: HTMLElement;
  public cargaCompleta: boolean = false;
  public cloudsSrc = [
    'assets/img/cloud1.svg',
    'assets/img/cloud2.svg',
    'assets/img/cloud3.svg',
    'assets/img/cloud4.svg',
    'assets/img/cloud5.svg',
    'assets/img/cloud6.svg',
    'assets/img/cloud8.svg',
    'assets/img/cloud7.svg',
  ]
  public translate: any = english;
  public language: string = 'en';
  public isResumeOptionsOpen: boolean = false;

  @ViewChildren('clouds') clouds: QueryList<ElementRef> | undefined;
  @ViewChildren('itemMenu') itemMenu: QueryList<ElementRef> | undefined;
  @ViewChildren('languageInput') languageInput: ElementRef | undefined;

  constructor(

  ){}

  async ngAfterViewInit(): Promise<void> {
    await this.createScene();
    this.initializeScrollControls();
  }

  async ngOnInit(): Promise<void> {
    this.language = this.dataService._language();
  }

  private async createScene() {
    const modelName = 'plane.glb';

    await this.createBasicScene();
    await this.initializeRenderer();
    await this.loadModel(modelName);
    this.createLights();
    this.initializeCamera();
    this.animate();
    this.setupResizeListener();
    this.clearSky();

  }

  private async createBasicScene() {
    this.scene = new THREE.Scene();
    this.addHdrBg();
  }

  private addHdrBg(){
    new RGBELoader()
    .setPath( 'assets/hdr/' )
    .load( 'prueba.hdr',  ( texture: THREE.Texture ) => {
      if(!texture){
        console.error('HDR texture failed to load');
      }
      else {
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
        texture.mapping = THREE.EquirectangularReflectionMapping;
      }
    }, undefined, (error) => {
      console.error('Error loading HDR texture:', error);
    });
  }

  private async loadModel(modelName: string): Promise<void> {
    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
        console.log('modelo cargado')
    };

    const loader = new GLTFLoader(manager);
    loader.load('assets/models/' + modelName, async (gltf: { scene: THREE.Object3D<THREE.Object3DEventMap>; }) => {
      gltf.scene.traverse(n => {
        if((<THREE.Mesh>n).isMesh){
          const mesh = n as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      gltf.scene.scale.set(1.5, 1.5, 1.5);
      gltf.scene.position.set(0, 0, 0);

      this.scene.add(gltf.scene);
      this.initializeFlight();
    });
  }

  private async initializeRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0); // El valor '0' significa completamente transparente
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.CineonToneMapping;

    const container = document.getElementById('three-container');
    if(container) {
      container.appendChild(this.renderer.domElement);
      setTimeout(() => {
        this.cargaCompleta = true;
      }, 100);
    }
    else {
      console.error("No se encontró el contenedor con id 'three-container'.");
    }

  }


  private initializeCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.z = 0;
    this.camera.position.y = 2;
    this.camera.position.x = -5;

    this.camera.lookAt(0, 0, 0);
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

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
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
        // this.clearSky();
    }, { passive: false });

    // Scroll en móviles
    window.addEventListener('touchstart', (event) => {
        touchStartY = event.touches[0].clientY;

    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
        event.preventDefault();
        const touchEndY = event.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        touchStartY = touchEndY;
    }, { passive: false });
  }

  // private initializeFlight(){
  //   const plane = this.scene.getObjectByName('plane');

  //   console.log(this.scene);
  //   if(plane){
  //     gsap.to(plane.position, {
  //       x: -10,
  //       z: -20,
  //       y: 0,
  //       duration: 6,
  //       ease: "power2.inOut"
  //     });

  //     gsap.to(plane.rotation, {
  //       y: Math.PI / 4,
  //       duration: 2,
  //       ease: "power2.inOut"
  //     });
  //   }
  // }

  private initializeFlight() {
    const plane = this.scene.getObjectByName('plane');

    if(plane) {
      // Movimiento del avión con el scroll
      gsap.to(plane.position, {
        scrollTrigger: {
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        x: -5,
        z: -5,
        y: 0,
        duration: 8,
        ease: "power2.inOut"
      });

      gsap.to(plane.rotation, {
        scrollTrigger: {
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: Math.PI / 4,
        duration: 2,
        ease: "power2.inOut"
      });
    }
  }

  private clearSky(){
    if(this.clouds && this.clouds.length > 0){
      this.moveCloud(0, 4, '-100%');
      this.moveCloud(4, 8, '100%');
    }
  }

  private moveCloud(init: number, end: number, movement: string){
    for(let i = init; i < end; i++){
      const cloudElement = this.clouds?.toArray()[i]?.nativeElement;
      gsap.to(cloudElement, {
        scrollTrigger: {
          trigger: '.clouds',
          start: 'top 0%',
          end: 'top -50%',
          scrub: 1,
        },
        x: movement,
        duration: 4,
        ease: 'power2.inOut',
      });
    }
  }

  changeLanguage(input: HTMLSelectElement){
    this.dataService._language.set(input.value);
    console.log(this.dataService._language);
    this.translate = this.dataService._language() === 'en' ? english : spanish;
  }

  openResumeOptions(){
    this.isResumeOptionsOpen = true;
  }

  downloadResume(value: string){
    if(value === 'es'){
      window.open('assets/cv_lauragh.pdf', '_blank');
    }
    else{
      window.open('assets/cv_lauragh_en.pdf', '_blank');
    }
    this.isResumeOptionsOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const resumeElement = document.getElementById('resume');

    // Si el clic NO está dentro de #resume, cierra el menú
    if (resumeElement && !resumeElement.contains(event.target as Node)) {
      this.isResumeOptionsOpen = false;
    }
  }

  // private moveClouds(leftMovement: string, rightMovement: string){
  //   const clouds = this.clouds?.toArray()!;

  //   // Aplicar animación a todas las nubes de una vez, diferenciando el movimiento por índice
  //   gsap.to(clouds, {
  //     scrollTrigger: {
  //       trigger: clouds[0]?.nativeElement, // El primer elemento como trigger general
  //       start: 'top bottom',
  //       end: 'bottom top',
  //       scrub: true,
  //       markers: true,
  //     },
  //     x: (index) => index < 4 ? leftMovement : rightMovement,  // Si el índice es menor que 4, mueve a la izquierda, de lo contrario a la derecha
  //     z: 0,
  //     y: 0,
  //     duration: 2,
  //     ease: 'power2.inOut',
  //   });
  // }

  // public selectItem(index: number | 0){
  //   const width = `${this.itemMenu?.get(index)?.nativeElement.offsetWidth}px`;
  //   const height = `${this.itemMenu?.get(index)?.nativeElement.offsetHeight}px`;

  //   console.log({width}, {height});

  //   if(this.divShadow){
  //     this.renderer2.removeChild(this.itemMenu?.get(index)?.nativeElement, this.divShadow);
  //   }

  //   this.divShadow = this.renderer2.createElement('div');
  //   this.renderer2.addClass(this.divShadow, 'itemMenuShadow');
  //   this.itemMenu?.get(index)?.nativeElement.prepend(this.divShadow!);
  //   this.renderer2.setStyle(this.divShadow, 'width', width);
  //   this.renderer2.setStyle(this.divShadow, 'height', height);

  // }

}
