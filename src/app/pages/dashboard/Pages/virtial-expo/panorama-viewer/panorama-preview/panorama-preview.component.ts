import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { VirtualExpoDashboardView } from '../../../../../../core/api/clients';

@Component({
  selector: 'app-panorama-preview',
  standalone: true,
  imports: [],
  templateUrl: './panorama-preview.component.html',
  styleUrl: './panorama-preview.component.css',
})
export class PanoramaPreviewComponent implements OnInit, AfterViewInit {
  @Output() openPhotoPreview = new EventEmitter<boolean>();
  @Input() virtualExpo!: VirtualExpoDashboardView;
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  onClosePreview() {
    this.openPhotoPreview.emit(false);
  }

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private isDragging = false;
  private previousMouseX = 0;
  private previousTouchX = 0;
  private previousMouseY = 0;
  private previousTouchY = 0;
  ngOnInit(): void {
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.renderScene();
  }
  ngAfterViewInit(): void {
    this.addListeners();
  }
  private onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.previousMouseX = event.clientX;
    this.previousMouseY = event.clientY;
  }

  private onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    if (this.isDragging) {
      const movementX = event.clientX - this.previousMouseX;
      const movementY = event.clientY - this.previousMouseY;
      this.previousMouseX = event.clientX;
      this.previousMouseY = event.clientY;
      this.rotateScene(movementX, movementY);
    }
  }

  private onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.previousTouchX = event.touches[0].clientX;
    this.previousTouchY = event.touches[0].clientY;
  }

  private onTouchMove(event: TouchEvent): void {
    event.preventDefault();
    if (this.isDragging) {
      const movementX = event.touches[0].clientX - this.previousTouchX;
      const movementY = event.touches[0].clientY - this.previousTouchY;
      this.previousTouchX = event.touches[0].clientX;
      this.previousTouchY = event.touches[0].clientY;
      this.rotateScene(movementX, movementY);
    }
  }
  private addListeners(): void {
    const canvas = this.canvasRef.nativeElement;

    // Capture mouse events
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));

    // Capture touch events
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  private onMouseUp(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }
  private rotateScene(deltaX: number, deltaY: number): void {
    const rotationSpeed = 0.001;
    this.scene.rotation.y += deltaX * rotationSpeed;
    this.scene.rotation.x += deltaY * rotationSpeed;
  }

  private onTouchEnd(event: TouchEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.001,
      100000,
    );
    this.camera.position.set(0, 0, 0);
  }
  textureLoader = new THREE.TextureLoader();
  img = new Image();
  renderScene(): void {
    const geometry = new THREE.SphereGeometry(500, 600, 400);
    this.img.src = this.virtualExpo.photos[0].photoUrl;
    geometry.scale(-1, 1, 1); // Flip the geometry to the inside
    const material = new THREE.MeshBasicMaterial({
      map: this.textureLoader.load(
        this.virtualExpo.photos[0].photoUrl + '?not-from-cache-please',
      ),
    });
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);

    const animate = (): void => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
