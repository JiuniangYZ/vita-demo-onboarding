# VitaFlow Onboarding Demo

An interactive onboarding prototype with A/B testing capabilities for a health and wellness app.

## Features

- 🎯 **Interactive Onboarding Flow**: 37-40 screen comprehensive onboarding experience
- 🔀 **A/B Testing**: Switch between Version 1 (Baseline) and Version 2 (Optimized)
- 🔗 **URL-based Version**: Access `/v1` or `/v2` to force specific version
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- 📱 **Mobile-First Design**: Responsive phone frame preview
- 📲 **Native App Experience**: Full-screen mode on mobile devices with touch gestures
- 👆 **Touch Gestures**: Swipe left/right to navigate on mobile
- 🛠️ **Mobile Dev Tools**: Hidden developer panel (3-finger long press on top)
- ⌨️ **Keyboard Shortcuts**: Navigate with arrow keys, reset with R (desktop)
- 💾 **State Management**: Zustand for efficient state handling

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open with your browser:
- [http://localhost:3000](http://localhost:3000) - Default (last selected version)
- [http://localhost:3000/v1](http://localhost:3000/v1) - Force V1 (37 pages)
- [http://localhost:3000/v2](http://localhost:3000/v2) - Force V2 (40 pages)

### Build

```bash
npm run build
npm start
```

## Project Structure

```
onboarding-test/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main demo page
│   └── globals.css        # Global styles
├── components/
│   ├── screens/           # Screen components
│   └── ui/                # Reusable UI components
├── data/                  # Screen configurations
├── store/                 # Zustand stores
├── hooks/                 # Custom React hooks
└── docs/                  # Documentation
```

## Controls

### Desktop (Keyboard Shortcuts)
- `→` or `Space`: Next screen
- `←`: Previous screen
- `R`: Reset demo

### Mobile (Touch Gestures)
- **Swipe Left**: Next screen
- **Swipe Right**: Previous screen
- **3-Finger Long Press** (top of screen, 2 seconds): Open developer tools
  - Switch between V1/V2
  - Jump to any screen
  - Reset demo

### Responsive Design
- **Mobile Devices** (< 768px): Full-screen native app experience
  - Removes phone frame
  - Hides desktop controls
  - Touch-optimized navigation
- **Desktop/Tablet**: Full demo interface with phone simulator

## Screen Types

- **Launch**: App launch screen with branding
- **Welcome**: Welcome and introduction
- **Question**: Single/multi-choice questions
- **Number Input**: Age, weight, height inputs
- **Value Prop**: Feature highlights
- **Loading**: Calculation/transition screens
- **Result**: Personalized results
- **Game**: Engagement mechanics (scan, spin)
- **Permission**: System permissions (notifications, tracking)
- **Paywall**: Subscription offerings
- **Celebration**: Success/completion screens

## License

MIT

# vita-demo-onboarding
