# 📸 How to Add Your Memory Images

Your images will fall like romantic confetti on the final reveal page! Here's how to add them:

## Step 1: Add Your Images
Copy your photos into this folder:
```
src/assets/images/memories/
```

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

## Step 2: Update the Component
1. Open: `src/app/components/reveal/reveal.component.ts`
2. Find the `imageFiles` array (around line 225)
3. Add your image filenames:

```typescript
private imageFiles: string[] = [
  'your-photo1.jpg',      // ← Add your image filename
  'your-photo2.png',      // ← Add another
  'memory-together.jpeg', // ← Add more...
  // Add as many as you want!
];
```

## Step 3: Save and Refresh
The server will auto-reload. Refresh your browser to see your images falling! 💕

## Tips:
- **Square images work best** (they'll be displayed as circles)
- **Recommended size:** 200-500px (auto-resized)
- **More images = more variety** in the falling effect
- Images rotate and fade as they fall

## Example:
If you have these files:
- `sunset.jpg`
- `beach-day.png`
- `first-kiss.jpeg`

Your array should look like:
```typescript
private imageFiles: string[] = [
  'sunset.jpg',
  'beach-day.png',
  'first-kiss.jpeg'
];
```

That's it! Your memories will now fall beautifully on the reveal page! 🥹❤️
