# 📸 Memory Images

Place your photos here to create a beautiful falling image effect on the reveal page!

## How to Add Your Images:

1. **Copy your images** into this folder: `src/assets/images/memories/`
2. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
3. **Open** `src/app/components/reveal/reveal.component.ts`
4. **Find** the `imageFiles` array (around line 240)
5. **Add** your image filenames, for example:
   ```typescript
   private imageFiles: string[] = [
     'photo1.jpg',
     'photo2.png',
     'our-memory.jpg',
     'beach-day.jpeg',
     // ... add all your images
   ];
   ```

## Tips:
- Use square images for best effect (they'll be displayed as circles)
- Recommended size: 200-500px (images will be resized automatically)
- The more images you add, the more variety in the falling effect!

## Example:
If you have a file named `sunset-together.jpg`, add it to the array:
```typescript
private imageFiles: string[] = [
  'sunset-together.jpg',
  // ... more images
];
```

The images will fall like romantic confetti on the final reveal page! 💕
