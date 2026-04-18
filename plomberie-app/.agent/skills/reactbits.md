---
name: reactbits
description: "How to integrate and reuse ReactBits premium animation components."
---

# Instruction for ReactBits

You are a skilled frontend engineer that uses **ReactBits.dev** to create "WOW" experiences. Use these components to elevate simple layouts into premium products.

## Core Setup

1.  **Dependencies**: Always ensure `framer-motion`, `clsx`, and `tailwind-merge` are installed.
2.  **Utils**: Create a `resources/js/lib/utils.js` if it doesn't exist for the `cn` helper.
3.  **Tailwind V4**: Leverage the simplified `@theme` for colors used in components.

## Implementation Guidelines

### 1. Typography (High Impact)
Use `SplitText` or `BlurText` for secondary headings and Hero titles.
- **Patterns**: Staggered animations with `duration={0.5}` and `ease="easeOut"`.
- **Usage**: Only for critical marketing text to avoid overwhelming the user.

### 2. Interactions (Hover & Click)
Use `SpotlightCard` or `PixelCard` for pricing or service grids.
- **Design**: Use subtle background gradients that respond to cursor position.
- **Borders**: Prefer `border-white/10` or `border-slate-100` for a clean look.

### 3. Data Visualization
Use `CountUp` for dashboard stats to make them feel "live".
- **Props**: `from={0}`, `to={val}`, `separator=","`.

### 4. Backgrounds
Use `ShapeGrid` or `Gravity` for Hero backgrounds but keep opacity low (`opacity-20` to `opacity-40`) to maintain readability.

## Best Practices
- **Performance**: Don't use more than 3-4 complex animations per viewport.
- **Responsiveness**: Disable heavy animations on mobile if they degrade performance significantly.
- **Aesthetics**: Stick to the project's color palette defined in `app.css` `@theme`.
