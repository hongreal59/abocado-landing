# Abocado Design System

## Typography

**Headlines:** Manrope (800 weight) — sharp, modern, geometric sans-serif

**Accent/Highlight:** Caveat (700 weight) — casual handwritten accent on key words like "meaningful" and "you earned"

**Body:** DM Sans (400/500/700) — clean, readable

**Logo:** Caveat (700 weight) — matches the accent, ties branding together

**Sizes scale with clamp() for responsiveness:**
- Hero headline: 2.6rem–3.8rem
- Section headlines: 2rem–2.8rem
- Body: 1.05rem

## Colors

**Background primary:** #FDFBF5 (warm off-white)

**Background warm:** #F7F3E8 (alternating sections like reframe and about)

**Moe Green Dark:** #4A9657 (buttons, nav, primary actions, logo, hover/pressed states)

**Moe Green:** #5CB86A (primary action, hover states)

**Moe Green Light:** #4ade80 (subtle accents, gradient borders, underlines)

**Green light:** #E8F5E2 (badges, step number backgrounds)

**Text primary:** #1A1A1A

**Text secondary:** #5A5A4F

**Text muted:** #8A8A7F

**White:** used in dark sections (progress section) for contrast

## Spacing & Layout

**Max content width:** 1100px (1200px for hero)

**Section padding:** 6rem vertical, 2rem horizontal (7rem for final CTA)

**Grid-based 2-column layouts** for hero, steps, and progress section

**Steps alternate left/right** using CSS direction trick

**Gap:** 4rem between grid columns, 5rem between steps

## Components

**Pill buttons:** 100px border radius, green-dark background, white text, box-shadow with green tint

**Phone mockups:** 32px border radius, gradient border glow (green-bright to green-dark at 0.4 opacity), large drop shadow

**Badges:** pill-shaped, green-light background, green-dark text, 0.85rem font

**Step numbers:** 44px square, 14px border radius, green-light background, Caveat font

**Email form:** pill-shaped container with white background, 2px green-light border, input + button inside

**Nav:** sticky, blurred background (rgba + backdrop-filter), subtle bottom border

## Effects & Animations

**Grain overlay:** SVG noise texture at 0.03 opacity, fixed position, covers entire page

**Radial gradient blobs:** green (top-right) and gold (bottom-left) for atmospheric depth

**Scroll-triggered reveals:** fade-up (translateY 40px → 0) via IntersectionObserver, 0.7s cubic-bezier easing

**Hero phone:** continuous floating animation (5s ease-in-out infinite, 10px vertical movement)

**Button hover:** translateY(-2px), scale(1.03), deeper shadow

**Phone mockup hover:** rotation resets to 0deg, slight scale up

**Stagger delays:** 0.1s, 0.2s, 0.3s classes for sequential reveals

**Hero text:** fade-up on load (0.8s), phone follows at 0.2s delay

**Email success:** button text changes to "🥑 You're in!", color shifts to green-bright

## Responsive (breakpoint: 768px)

- All grids collapse to single column
- Phone screenshots reorder above text
- Phone mockup width reduces to 220px
- Email form stacks vertically with full-width button
- Section padding reduces to 4rem vertical, 1.5rem horizontal
- Nav padding tightens

## Page Structure

1. **Sticky nav:** logo (left) + Join Beta button (right)
2. **Hero:** headline + sub + CTA (left), dashboard phone mockup (right)
3. **Reframe:** centered text block on warm background
4. **How It Works:** 3 alternating steps with phone mockups
5. **Progress:** dark green background, text + stats phone mockup
6. **About:** centered, warm background, avatar + personal story from Shawn
7. **Final CTA:** headline + email capture form
8. **Footer:** minimal copyright line

