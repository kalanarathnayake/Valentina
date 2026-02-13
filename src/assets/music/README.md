# 🎵 Music File

## Place Your Song Here

**File name:** `ehema-baluwama.mp3`

**Location:** `src/assets/music/ehema-baluwama.mp3`

## Instructions:

1. **Get your song file** - "Ehema Baluwama Mage Diha"
2. **Rename it to:** `ehema-baluwama.mp3` (or update the path in the code)
3. **Place it in this folder:** `src/assets/music/`
4. **Supported formats:** `.mp3`, `.wav`, `.ogg`, `.m4a`

## How It Works:

- The song will **automatically start playing** when the correct answer is selected for the song question (Question 1)
- It will **continue playing** throughout the rest of the quiz
- It will **keep playing** on the final reveal page
- The music **loops** continuously for a romantic atmosphere

## Note:

If your filename is different, update the path in:
- `src/app/components/quiz/quiz.component.ts` (line ~652)
- `src/app/components/reveal/reveal.component.ts` (line ~227)

The music will start playing automatically after the first question is answered correctly! 🎶💕
