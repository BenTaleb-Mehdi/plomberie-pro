# Design System: Premium Minimalist Dashboard

This document defines the visual rules and aesthetic principles for the "Plomberie Pro" Admin Console, inspired by modern, clean SaaS dashboards.

## Core Rules

1. **Light & Airy**: Use solid white (`bg-white`) for sidebars and headers. Backgrounds should be very light gray (`bg-[#F9FAFB]`).
2. **Refined Shadows**: Use `shadow-sm` or `shadow-[0_8px_30px_rgb(0,0,0,0.04)]` for a subtle, professional elevation.
3. **Pill-Based Navigation**: 
   - Sidebar items use `rounded-2xl`.
   - Active state: Indigo/Blue background with white text or subtle blue background with blue text.
4. **Data Presentation**: 
   - Stat values: `font-black text-slate-900`.
   - Descriptions: `text-slate-400 font-bold uppercase tracking-widest text-[10px]`.
5. **Chart Aesthetics**: Sparklines should be minimalist, using primary blue strokes without heavy grids.

## Components Style

| Component | Background | Border | Shadow |
| :--- | :--- | :--- | :--- |
| Sidebar | White | Slate-100 (Right) | None |
| Header | White | Slate-100 (Bottom) | None / Sm |
| Card | White | Slate-100 | Sm / Md |

## Typography
- **Headings**: `font-black tracking-tight text-slate-900`
- **Body**: `font-medium text-slate-600`
- **Metadata**: `font-bold text-slate-400 uppercase tracking-widest`

## Rule Enforcement
All future Admin-related UI changes MUST adhere to this high-fidelity light theme. Avoid using the previous dark-sidebar aesthetic.
