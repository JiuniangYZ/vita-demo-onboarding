# VitaFlow Onboarding Demo

An interactive onboarding prototype with A/B testing capabilities for a health and wellness app.

## Features

- 🎯 **Interactive Onboarding Flow**: 37-40 screen comprehensive onboarding experience
- 🔀 **A/B Testing**: Switch between Version 1 (Baseline) and Version 2 (Optimized)
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- 📱 **Mobile-First Design**: Responsive phone frame preview
- ⌨️ **Keyboard Shortcuts**: Navigate with arrow keys, reset with R
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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

## Keyboard Shortcuts

- `→` or `Space`: Next screen
- `←`: Previous screen
- `R`: Reset demo

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
