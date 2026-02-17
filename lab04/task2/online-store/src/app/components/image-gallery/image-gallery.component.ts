import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  currentIndex: number = 0;
  lightboxOpen: boolean = false;
  private rotateInterval: any;

  ngOnInit() {
    if (this.images.length === 0) {
      this.images = ['https://via.placeholder.com/300'];
    }
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  openLightbox() {
    this.lightboxOpen = true;
    this.stopAutoRotate();
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  startAutoRotate() {
    this.rotateInterval = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  stopAutoRotate() {
    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
    }
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }
}
