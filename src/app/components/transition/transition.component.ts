import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transition',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="content fade-in">
        <h2 class="romantic-text message">Only someone who truly remembers us<br>can unlock what's next 💕</h2>
        <button class="romantic-button" (click)="proceed()">
          Okay… I'm ready 🥹
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #ffe0ec 0%, #ffc0d9 50%, #ff9ec5 100%);
      background-size: 400% 400%;
      animation: gradientShift 12s ease infinite;
      position: relative;
      overflow: hidden;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .container::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: sparkle 20s linear infinite;
      pointer-events: none;
    }

    @keyframes sparkle {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .content {
      position: relative;
      z-index: 10;
      padding: 40px 20px;
      animation: fadeInScale 1s ease-out;
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .message {
      font-size: 36px;
      color: var(--primary-red);
      margin-bottom: 50px;
      font-weight: 600;
      line-height: 1.4;
      text-shadow: 0 2px 10px rgba(255, 107, 157, 0.3);
      animation: messageGlow 3s ease-in-out infinite;
    }

    @keyframes messageGlow {
      0%, 100% {
        text-shadow: 0 2px 10px rgba(255, 107, 157, 0.3);
      }
      50% {
        text-shadow: 0 2px 20px rgba(255, 107, 157, 0.5), 0 0 30px rgba(255, 107, 157, 0.3);
      }
    }

    .romantic-button {
      margin-top: 40px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      animation: buttonFloat 2s ease-in-out infinite;
      animation-delay: 0.5s;
    }

    @keyframes buttonFloat {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }

    .romantic-button:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 12px 35px rgba(255, 107, 157, 0.5);
    }

    .romantic-button:active {
      transform: translateY(-2px) scale(1.02);
    }

    @media (max-width: 768px) {
      .message {
        font-size: 26px;
      }

      .content {
        padding: 30px 20px;
      }
    }
  `]
})
export class TransitionComponent implements OnInit {
  constructor(private router: Router) {}

  proceed() {
    this.router.navigate(['/quiz']);
  }

  ngOnInit() {
    // No auto-navigate, wait for button click
  }
}
