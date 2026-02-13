import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// @ts-ignore - heic2any doesn't have TypeScript definitions
import heic2any from 'heic2any';

@Component({
  selector: 'app-reveal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" [style.background-image]="backgroundImage ? 'url(' + backgroundImage + ')' : 'none'">
      <!-- Background music continues from quiz -->
      <audio #backgroundMusic [src]="musicSrc" loop autoplay *ngIf="musicSrc && musicPlaying" (loadeddata)="playMusic()"></audio>

      <div class="content fade-in">
        <div class="love-letter">
          <h1 class="romantic-text title">Happy Valentine's Day, Babu ❤️</h1>
          
          <div class="letter-content">
            <p class="letter-text final-reveal-text">
              Every memory here is real.<br>
              Every feeling is true.
            </p>
            
            <p class="letter-text final-reveal-text">
              And if I had to choose again…<br>
              I'd still choose you.<br>
              Always.
            </p>
            
            <p class="romantic-text closing">
              Forever yours,<br>
              <span class="signature">Your Valentine 💕</span>
            </p>
          </div>
        </div>
      </div>

      <!-- SVG Heart Shape Definition (hidden) -->
      <svg width="0" height="0" style="position: absolute;">
        <defs>
          <clipPath id="heart-shape" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.33 C0.5,0.33 0.61,0.55 0.98,0.55 C0.98,0.55 0.68,0.89 0.5,1 C0.32,0.89 0.02,0.55 0.02,0.55 C0.39,0.55 0.5,0.33 0.5,0.33 Z"/>
          </clipPath>
        </defs>
      </svg>

      <!-- Falling Images & Hearts Rain Effect -->
      <div class="falling-images-container">
        <!-- Falling Images (heart-shaped) -->
        <img *ngFor="let image of fallingImages" 
             [src]="image.src"
             [alt]="'Memory ' + image.id"
             class="falling-image heart-shaped-image" 
             [style.left.%]="image.left"
             [style.animation-delay.s]="image.delay"
             [style.width.px]="image.size"
             [style.height.px]="image.size"
             [style.animation-duration.s]="image.duration">
        
        <!-- Falling Heart Emojis -->
        <span *ngFor="let heart of fallingHearts"
              class="falling-heart-emoji"
              [style.left.%]="heart.left"
              [style.animation-delay.s]="heart.delay"
              [style.animation-duration.s]="heart.duration"
              [style.font-size.px]="heart.size">
          {{ heart.emoji }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .container {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      /* Overlay for better text readability */
      background-blend-mode: overlay;
    }

    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 224, 236, 0.7) 0%, rgba(255, 192, 217, 0.7) 50%, rgba(255, 158, 197, 0.7) 100%);
      z-index: 0;
      pointer-events: none;
    }

    .content {
      max-width: 700px;
      width: 100%;
      z-index: 2;
      position: relative;
      animation: contentFadeIn 1.2s ease-out;
      padding: 40px 20px;
    }

    @keyframes contentFadeIn {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .love-letter {
      background: rgba(255, 255, 255, 0.98);
      border-radius: 30px;
      padding: 50px;
      box-shadow: 0 25px 70px rgba(255, 77, 122, 0.4);
      backdrop-filter: blur(15px);
      border: 2px solid rgba(255, 107, 157, 0.2);
      animation: letterFloat 3s ease-in-out infinite;
      position: relative;
      overflow: hidden;
    }

    .love-letter::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 107, 157, 0.1) 1px, transparent 1px);
      background-size: 30px 30px;
      animation: sparkle 20s linear infinite;
      pointer-events: none;
    }

    @keyframes letterFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @keyframes sparkle {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .title {
      font-size: 48px;
      color: var(--primary-red);
      text-align: center;
      margin-bottom: 35px;
      font-weight: 700;
      text-shadow: 0 2px 15px rgba(255, 107, 157, 0.4);
      animation: titlePulse 3s ease-in-out infinite;
      position: relative;
      z-index: 1;
    }

    @keyframes titlePulse {
      0%, 100% {
        transform: scale(1);
        text-shadow: 0 2px 15px rgba(255, 107, 157, 0.4);
      }
      50% {
        transform: scale(1.02);
        text-shadow: 0 4px 25px rgba(255, 107, 157, 0.6);
      }
    }

    .letter-content {
      text-align: left;
      line-height: 1.9;
      position: relative;
      z-index: 1;
      animation: contentReveal 1.5s ease-out 0.3s both;
    }

    @keyframes contentReveal {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .letter-text {
      font-size: 19px;
      color: var(--text-dark);
      margin: 25px 0;
      text-align: justify;
      animation: textFadeIn 1s ease-out both;
    }

    .letter-text:nth-child(1) { animation-delay: 0.5s; }
    .letter-text:nth-child(2) { animation-delay: 0.8s; }

    @keyframes textFadeIn {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .final-reveal-text {
      font-size: 24px;
      color: var(--primary-red);
      text-align: center;
      font-weight: 600;
      line-height: 2.2;
      margin: 35px 0;
      text-shadow: 0 1px 5px rgba(255, 107, 157, 0.3);
      animation: revealTextGlow 4s ease-in-out infinite;
      position: relative;
    }

    @keyframes revealTextGlow {
      0%, 100% {
        text-shadow: 0 1px 5px rgba(255, 107, 157, 0.3);
      }
      50% {
        text-shadow: 0 2px 10px rgba(255, 107, 157, 0.5);
      }
    }

    .closing {
      font-size: 26px;
      color: var(--primary-red);
      margin-top: 40px;
      text-align: right;
      font-weight: 600;
      animation: closingFadeIn 1s ease-out 1.2s both;
      position: relative;
    }

    @keyframes closingFadeIn {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .signature {
      display: block;
      margin-top: 10px;
      font-size: 20px;
    }

    .falling-images-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    }

    /* Fallback gradient if no background image */
    .container:not([style*="background-image"]) {
      background: linear-gradient(135deg, #ffe0ec 0%, #ffc0d9 50%, #ff9ec5 100%);
    }

    .falling-image {
      position: absolute;
      object-fit: cover;
      box-shadow: 0 6px 20px rgba(255, 77, 122, 0.5);
      animation: imageFall 5s ease-out forwards;
      border: 3px solid rgba(255, 255, 255, 0.95);
      transition: transform 0.3s ease;
    }

    .falling-image:hover {
      transform: scale(1.1) !important;
      z-index: 10;
    }

    .heart-shaped-image {
      border-radius: 50%;
      object-fit: cover;
      background: transparent;
      border: 4px solid rgba(255, 255, 255, 0.95);
      box-shadow: 0 0 20px rgba(255, 107, 157, 0.4);
    }

    .falling-heart-emoji {
      position: absolute;
      animation: heartFall 4s ease-out forwards;
      pointer-events: none;
      filter: drop-shadow(0 3px 10px rgba(255, 77, 122, 0.5));
      user-select: none;
      -webkit-user-select: none;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes imageFall {
      0% {
        transform: translateY(-100vh) rotate(0deg) scale(0.6);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      50% {
        opacity: 1;
        transform: translateY(50vh) rotate(360deg) scale(1);
      }
      100% {
        transform: translateY(100vh) rotate(720deg) scale(0.9);
        opacity: 0;
      }
    }

    @keyframes heartFall {
      0% {
        transform: translateY(-100vh) rotate(0deg) scale(0.7);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      50% {
        opacity: 1;
        transform: translateY(50vh) rotate(180deg) scale(1.1);
      }
      100% {
        transform: translateY(100vh) rotate(360deg) scale(1.3);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .love-letter {
        padding: 25px;
      }

      .title {
        font-size: 32px;
      }

      .letter-text {
        font-size: 16px;
      }

      .final-reveal-text {
        font-size: 20px;
      }

      .closing {
        font-size: 20px;
      }
    }
  `]
})
export class RevealComponent implements OnInit {
  @ViewChild('backgroundMusic') backgroundMusic?: ElementRef<HTMLAudioElement>;
  
  musicSrc = '/assets/music/sinhanada.net-Ehema-Baluwama-Yasas-Medagedara.mp3'; // Same song continues from quiz
  musicPlaying = false;
  
  // Background image - add your image to src/assets/images/background/
  backgroundImage: string | null = '/assets/images/background/background.png'; // Set to null to use gradient instead
  fallingImages: Array<{ 
    src: string; 
    left: number; 
    delay: number; 
    size: number;
    duration: number;
    id: number;
  }> = [];

  fallingHearts: Array<{
    emoji: string;
    left: number;
    delay: number;
    size: number;
    duration: number;
    id: number;
  }> = [];

  /**
   * 📸 Your memory images - already configured!
   */
  private imageFiles: string[] = [
    '5a4ab691-c3cf-4b91-8d81-cb53fb66587e.JPG',
    '87a13fa3-b347-4d4a-8e61-d1f0a3248056.JPG',
    'f5bc5703-19db-4f26-af90-e3568fd51497.JPG',
    'IMG_1763.HEIC',
    'IMG_1829.heic',
    'IMG_1833.heic',
    'IMG_2069.heic',
    'IMG_2681.heic',
    'IMG_2743.heic',
    'IMG_2747.heic',
    'IMG_3125.HEIC',
    'IMG_3651.heic',
    'IMG_3928.heic',
    'IMG_3996.heic',
    'IMG_3998.heic',
    'IMG_4025.heic',
    'IMG_4278.heic',
    'IMG_4281.heic',
    'IMG_4917.heic',
    'IMG_4918.heic',
    'IMG_4924.heic',
    'IMG_5007.heic',
    'IMG_5493.HEIC',
    'IMG_5867.HEIC',
    'IMG_6126.jpg',
    'IMG_6198.heic',
    'IMG_6229.heic',
    'IMG_6231.heic',
    'IMG_6234.heic',
    'IMG_6819.heic',
    'IMG_6926.jpg'
  ];

  // Cache for converted HEIC images
  private heicCache: Map<string, string> = new Map();

  ngOnInit() {
    this.startFallingImages();
    this.startFallingHearts();
    
    // Check if music was playing from previous pages (stored in sessionStorage)
    const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    const savedMusicSrc = sessionStorage.getItem('musicSrc');
    
    if (wasPlaying && savedMusicSrc) {
      this.musicSrc = savedMusicSrc;
      this.musicPlaying = true;
      // Small delay to ensure audio element is ready
      setTimeout(() => this.playMusic(), 200);
    }
  }
  
  playMusic() {
    if (this.backgroundMusic?.nativeElement && this.musicPlaying) {
      const audio = this.backgroundMusic.nativeElement;
      audio.volume = 0.5;
      
      // Try to play, catch autoplay restrictions
      audio.play().catch((error) => {
        console.log('Music autoplay prevented, will play on user interaction');
        // Music will play when user interacts (scrolls, clicks, etc.)
      });
    }
  }

  startFallingImages() {
    // Create initial falling images
    this.createFallingImage().catch(err => console.error('Error creating falling image:', err));
    
    // Continuously create new falling images
    setInterval(() => {
      this.createFallingImage().catch(err => console.error('Error creating falling image:', err));
    }, 2000);
  }

  startFallingHearts() {
    // Create initial falling hearts
    this.createFallingHeart();
    
    // Continuously create new falling hearts
    setInterval(() => {
      this.createFallingHeart();
    }, 800);
  }

  async createFallingImage() {
    const randomImage = await this.getRandomImage();
    const size = 100 + Math.random() * 60; // Random size between 100-160px (larger!)
    
    this.fallingImages.push({
      src: randomImage,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: size,
      duration: 4 + Math.random() * 2, // 4-6 seconds
      id: Date.now() + Math.random()
    });

    // Remove old images after animation (keep max 30 on screen)
    if (this.fallingImages.length > 30) {
      this.fallingImages = this.fallingImages.slice(-20);
    }

    // Clean up after animation completes
    setTimeout(() => {
      this.fallingImages = this.fallingImages.filter(img => img.id !== this.fallingImages[0]?.id);
    }, 6000);
  }

  async getRandomImage(): Promise<string> {
    if (this.imageFiles.length === 0) {
      // Fallback: return a heart emoji as data URI
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDU2QzMyIDU2IDQ4IDQwIDQ4IDI4QzQ4IDIwIDQ0IDE2IDM4IDE2QzM0IDE2IDMyIDE4IDMyIDIwQzMyIDE4IDMwIDE2IDI2IDE2QzIwIDE2IDE2IDIwIDE2IDI4QzE2IDQwIDMyIDU2IDMyIDU2WiIgZmlsbD0iI2ZmNkI5RCIvPgo8L3N2Zz4K';
    }
    
    const randomFile = this.imageFiles[Math.floor(Math.random() * this.imageFiles.length)];
    const filePath = `/assets/images/memories/${randomFile}`;
    
    // Check if it's a HEIC file
    const isHeic = randomFile.toLowerCase().endsWith('.heic') || randomFile.toLowerCase().endsWith('.heif');
    
    if (isHeic) {
      // Check cache first
      if (this.heicCache.has(randomFile)) {
        return this.heicCache.get(randomFile)!;
      }
      
      // Convert HEIC to JPEG
      try {
        const response = await fetch(filePath);
        const blob = await response.blob();
        const convertedBlob = await heic2any({
          blob: blob,
          toType: 'image/jpeg',
          quality: 0.8
        });
        
        // heic2any can return an array or a single blob
        const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
        const convertedUrl = URL.createObjectURL(resultBlob);
        
        // Cache the converted URL
        this.heicCache.set(randomFile, convertedUrl);
        
        return convertedUrl;
      } catch (error) {
        console.error('Error converting HEIC file:', error);
        // Fallback to heart emoji on error
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDU2QzMyIDU2IDQ4IDQwIDQ4IDI4QzQ4IDIwIDQ0IDE2IDM4IDE2QzM0IDE2IDMyIDE4IDMyIDIwQzMyIDE4IDMwIDE2IDI2IDE2QzIwIDE2IDE2IDIwIDE2IDI4QzE2IDQwIDMyIDU2IDMyIDU2WiIgZmlsbD0iI2ZmNkI5RCIvPgo8L3N2Zz4K';
      }
    }
    
    return filePath;
  }

  createFallingHeart() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];
    const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const size = 30 + Math.random() * 25; // Random size between 30-55px
    
    this.fallingHearts.push({
      emoji: randomEmoji,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: size,
      duration: 3 + Math.random() * 2, // 3-5 seconds
      id: Date.now() + Math.random()
    });

    // Remove old hearts after animation (keep max 40 on screen)
    if (this.fallingHearts.length > 40) {
      this.fallingHearts = this.fallingHearts.slice(-30);
    }

    // Clean up after animation completes
    setTimeout(() => {
      this.fallingHearts = this.fallingHearts.filter(heart => heart.id !== this.fallingHearts[0]?.id);
    }, 6000);
  }
}
