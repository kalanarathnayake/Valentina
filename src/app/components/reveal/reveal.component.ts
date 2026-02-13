import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
// @ts-ignore - heic2any doesn't have TypeScript definitions
import heic2any from 'heic2any';

@Component({
  selector: 'app-reveal',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('1.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="container" [style.background-image]="backgroundImage ? 'url(' + backgroundImage + ')' : 'none'">
      <!-- Background music continues from quiz -->
      <audio #backgroundMusic [src]="musicSrc" loop autoplay *ngIf="musicSrc && musicPlaying" (loadeddata)="playMusic()"></audio>

      <!-- Background gradient overlay -->
      <div class="background-overlay"></div>
      
      <!-- Vignette effect -->
      <div class="vignette"></div>

      <!-- Minimal floating hearts -->
      <div class="floating-hearts">
        <span *ngFor="let heart of floatingHearts"
              class="floating-heart"
              [style.left.%]="heart.left"
              [style.top.%]="heart.top"
              [style.animation-delay.s]="heart.delay"
              [style.animation-duration.s]="heart.duration"
              [style.font-size.px]="heart.size">
          {{ heart.emoji }}
        </span>
      </div>

      <!-- Falling memory photos (rain effect) -->
      <div class="floating-photos">
        <div *ngFor="let photo of floatingPhotos" 
             class="photo-frame"
             [style.left.%]="photo.left"
             [style.top.%]="photo.top"
             [style.animation-delay.s]="photo.delay"
             [style.animation-duration.s]="photo.floatDuration"
             [style.width.px]="photo.size"
             [style.height.px]="photo.size">
          <img [src]="photo.src" 
               [alt]="'Memory ' + photo.id">
        </div>
      </div>

      <!-- Main content -->
      <div class="content-wrapper">
        <div class="love-letter-card" [@fadeIn]>
          <h1 class="title">My Love, Happy Valentine's Day ❤️</h1>
          
          <div class="letter-content">
            <p class="letter-text">
              You are the most loving and cutest soul I have ever met. Before you, I didn't even know I needed healing… but you came into my life and quietly fixed parts of me I didn't even understand.
            </p>
            
            <p class="letter-text highlight-text">
              You didn't just love me — you cured me. You gave me peace, strength, and a reason to smile without forcing it.
            </p>
            
            <p class="letter-text">
              Your heart is soft, your soul is pure, and your love feels like home. I love you more than words can ever explain. And no matter what happens in life, I promise I will always choose you — the same way you chose me.
            </p>
            
            <p class="letter-text closing">
              Happy Valentine's Day, my beautiful girl. 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .container {
      position: relative;
      overflow: hidden;
      min-height: 100vh;
      width: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    /* Blurred background effect */
    .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      filter: blur(20px) brightness(0.9);
      transform: scale(1.1);
      z-index: 0;
    }

    .background-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(255, 182, 193, 0.4) 0%,
        rgba(255, 192, 203, 0.5) 25%,
        rgba(255, 160, 180, 0.45) 50%,
        rgba(255, 182, 193, 0.4) 75%,
        rgba(255, 192, 203, 0.5) 100%
      );
      z-index: 1;
      pointer-events: none;
    }

    .vignette {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        ellipse at center,
        transparent 0%,
        transparent 60%,
        rgba(0, 0, 0, 0.15) 100%
      );
      z-index: 2;
      pointer-events: none;
    }

    .content-wrapper {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 700px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .love-letter-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-radius: 32px;
      padding: 60px 50px;
      box-shadow: 
        0 8px 32px rgba(255, 105, 135, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.25);
      position: relative;
      width: 100%;
      animation: fadeInUp 1.2s ease-out;
    }

    .love-letter-card::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(
        135deg,
        rgba(255, 182, 193, 0.3),
        rgba(255, 192, 203, 0.2),
        rgba(255, 160, 180, 0.3)
      );
      border-radius: 32px;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .title {
      font-family: 'Playfair Display', 'Great Vibes', serif;
      font-size: 56px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 40px;
      background: linear-gradient(
        135deg,
        #d63384 0%,
        #ff6b9d 30%,
        #ff8fab 60%,
        #ffb3c1 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
      letter-spacing: -0.5px;
      position: relative;
    }


    .letter-content {
      text-align: center;
      line-height: 2;
      position: relative;
    }

    .letter-text {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 20px;
      font-weight: 400;
      color: rgba(75, 45, 42, 0.9);
      margin: 25px 0;
      text-align: center;
      line-height: 1.8;
    }

    .highlight-text {
      font-size: 22px;
      font-weight: 600;
      color: #c7356f;
      margin: 35px 0;
      text-shadow: 0 2px 10px rgba(255, 182, 193, 0.3);
    }

    .closing {
      font-family: 'Great Vibes', 'Playfair Display', cursive;
      font-size: 24px;
      color: #d63384;
      margin-top: 50px;
      text-align: center;
      font-weight: 400;
      font-style: italic;
    }

    .signature {
      display: block;
      margin-top: 15px;
      font-size: 20px;
      font-style: italic;
      color: #d63384;
      font-weight: 500;
    }

    /* Floating Photos */
    .floating-photos {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
      overflow: hidden;
    }

    .photo-frame {
      position: absolute;
      border-radius: 50%;
      border: 4px solid rgba(255, 255, 255, 0.9);
      box-shadow: 
        0 8px 24px rgba(255, 105, 135, 0.3),
        0 0 0 2px rgba(255, 182, 193, 0.2),
        inset 0 0 20px rgba(255, 255, 255, 0.3);
      overflow: hidden;
      background: rgba(255, 255, 255, 0.1);
      animation: fallPhoto linear forwards;
    }

    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    /* Minimal Floating Hearts */
    .floating-hearts {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 3;
      overflow: hidden;
    }

    .floating-heart {
      position: absolute;
      opacity: 0.4;
      animation: floatHeart 12s ease-in-out infinite;
      filter: drop-shadow(0 2px 8px rgba(255, 105, 135, 0.2));
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fallPhoto {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateY(110vh) translateX(20px);
        opacity: 0.8;
      }
    }

    @keyframes floatHeart {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translateY(-30px) translateX(15px) scale(1.1);
        opacity: 0.5;
      }
    }

    /* Fallback gradient if no background image */
    .container:not([style*="background-image"]) {
      background: linear-gradient(
        135deg,
        #ffb6c1 0%,
        #ffc0cb 25%,
        #ffb3c1 50%,
        #ffc0cb 75%,
        #ffb6c1 100%
      );
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .love-letter-card {
        padding: 40px 30px;
        border-radius: 24px;
      }

      .title {
        font-size: 42px;
        margin-bottom: 30px;
      }

      .letter-text {
        font-size: 18px;
        margin: 25px 0;
      }

      .highlight-text {
        font-size: 22px;
        margin: 35px 0;
      }

      .closing {
        font-size: 20px;
        margin-top: 40px;
      }

      .photo-frame {
        border-width: 3px;
      }
    }

    @media (max-width: 480px) {
      .love-letter-card {
        padding: 30px 20px;
        border-radius: 20px;
      }

      .title {
        font-size: 36px;
      }

      .letter-text {
        font-size: 16px;
      }

      .highlight-text {
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
  backgroundImage: string | null = '/assets/images/background/IMG_4279.jpeg'; // Set to null to use gradient instead
  
  // Floating photos around the card
  floatingPhotos: Array<{
    src: string;
    left: number;
    top: number;
    delay: number;
    size: number;
    floatDuration: number;
    id: number;
  }> = [];

  // Minimal floating hearts
  floatingHearts: Array<{
    emoji: string;
    left: number;
    top: number;
    delay: number;
    size: number;
    duration: number;
    id: number;
  }> = [];

  /**
   * 📸 Your memory images - already configured!
   * HEIC images removed as they don't display properly on the web
   */
  private imageFiles: string[] = [
    '050A3908-5035-4CA3-8036-EDF4DD8C3D7D.PNG',
    '06A898AB-364E-4A47-BD98-7794F996A422.PNG',
    '0a8cdb4e-15d8-4c90-9f43-e87de80937b2.jpg',
    '28F3E268-16D5-4A3B-923F-87472515E318.PNG',
    '5a4ab691-c3cf-4b91-8d81-cb53fb66587e.JPG',
    '6fd8b943-09c2-41f5-bb17-684b66d350e4.JPG',
    '9B2D40D0-2ED8-4FFE-9EDE-C9FEBF5463E6.PNG',
    'b66c8b3e-55ca-4162-913a-486f30ec28ef.JPG',
    'ce7c7b2d-3ed1-46d1-b760-c3563633a99f.JPG',
    'F430DF4E-F67A-42FE-A2DF-C9DC24BDDC3C.PNG',
    'feaa579b-f848-4b88-bb60-6d3bb13d5b03.jpg',
    'IMG_1781.JPG',
    'IMG_1829.jpeg',
    'IMG_2072.jpeg',
    'IMG_2684.jpeg',
    'IMG_2741.jpeg',
    'IMG_2743.jpeg',
    'IMG_3122.jpeg',
    'IMG_3651.jpeg',
    'IMG_3663.jpeg',
    'IMG_3666.jpeg',
    'IMG_3839.jpeg',
    'IMG_3923.jpeg',
    'IMG_3924.jpeg',
    'IMG_3934.jpeg',
    'IMG_3993.jpeg',
    'IMG_3998.jpeg',
    'IMG_4025.jpeg',
    'IMG_4278.jpeg',
    'IMG_4279.jpeg',
    'IMG_4283.jpeg',
    'IMG_4309.jpeg',
    'IMG_4898.jpeg',
    'IMG_4917.jpeg',
    'IMG_5007.jpeg',
    'IMG_5258.jpeg',
    'IMG_5490.jpeg',
    'IMG_5820.jpg',
    'IMG_5833.jpeg',
    'IMG_5867.jpeg',
    'IMG_6126.jpg',
    'IMG_6198.jpeg',
    'IMG_6230.jpeg',
    'IMG_6234.jpeg',
    'IMG_6235.jpeg',
    'IMG_6299.jpeg',
    'IMG_6305.jpeg',
    'IMG_6627.jpeg',
    'IMG_6819.jpeg',
    'IMG_6836.jpeg',
    'IMG_6890.jpeg',
    'IMG_6987.jpeg'
  ];

  // Cache for converted HEIC images
  private heicCache: Map<string, string> = new Map();

  ngOnInit() {
    this.initializeFloatingPhotos();
    this.startMinimalHearts();
    
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

  async initializeFloatingPhotos() {
    // Create initial falling photos (rain effect)
    const initialCount = 100;
    
    for (let i = 0; i < initialCount; i++) {
      await this.createFallingPhoto(i * 0.8); // Stagger the start times
    }
    
    // Continuously add new falling photos to create rain effect
    setInterval(async () => {
      if (this.floatingPhotos.length < 15) {
        await this.createFallingPhoto(0);
      }
    }, 1); // Add a new photo every 0.8 seconds
  }

  async createFallingPhoto(delay: number = 0) {
    const randomImage = await this.getRandomImage();
    const size = 100 + Math.random() * 60; // 100-160px
    const left = 5 + Math.random() * 90; // Random horizontal position
    const fallDuration = 8 + Math.random() * 4; // 8-12 seconds to fall
    
    const photoId = Date.now() + Math.random();
    
    this.floatingPhotos.push({
      src: randomImage,
      left: left,
      top: -10, // Start above the viewport
      delay: delay,
      size: size,
      floatDuration: fallDuration,
      id: photoId
    });
    
    // Remove photo after it falls off screen
    setTimeout(() => {
      this.floatingPhotos = this.floatingPhotos.filter(p => p.id !== photoId);
    }, (fallDuration + delay) * 1000 + 1000);
  }

  startMinimalHearts() {
    // Create very minimal floating hearts (only 3-5 at a time)
    const initialHearts = 4;
    for (let i = 0; i < initialHearts; i++) {
      setTimeout(() => {
        this.createFloatingHeart();
      }, i * 2000);
    }
    
    // Occasionally add new hearts (every 8-12 seconds)
    setInterval(() => {
      if (this.floatingHearts.length < 5) {
        this.createFloatingHeart();
      }
    }, 10000);
  }

  createFloatingHeart() {
    const heartEmojis = ['❤️', '💕'];
    const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const size = 20 + Math.random() * 15; // 20-35px (smaller, minimal)
    
    this.floatingHearts.push({
      emoji: randomEmoji,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      size: size,
      duration: 12 + Math.random() * 4, // 12-16 seconds
      id: Date.now() + Math.random()
    });

    // Keep only 5 hearts max
    if (this.floatingHearts.length > 5) {
      this.floatingHearts = this.floatingHearts.slice(-4);
    }

    // Clean up after animation
    setTimeout(() => {
      this.floatingHearts = this.floatingHearts.filter(heart => heart.id !== this.floatingHearts[0]?.id);
    }, 18000);
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

}
