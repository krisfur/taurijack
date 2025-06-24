# Blackjack Tauri

A desktop blackjack game built with Next.js and Tauri, featuring a modern UI and full game logic.

## 🎮 Features

- **Complete Blackjack Game**: Full implementation of blackjack rules including hitting, standing, and dealer AI
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Keyboard Shortcuts**: Quick actions with D (Deal), H (Hit), S (Stand)
- **Visual Feedback**: Card animations and winner indicators
- **Desktop Native**: Runs as a native desktop application using Tauri

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS
- **Desktop Framework**: Tauri 1.x (Rust backend)
- **Game Logic**: Custom TypeScript implementation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

### Required Software
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Rust** (latest stable version)
- **Cargo** (comes with Rust)

### System Dependencies (Linux)
On Arch Linux, you'll need:
```bash
sudo pacman -S webkit2gtk
```

On other Linux distributions, install the equivalent webkit2gtk package.

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd taurijack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server

#### Option A: Web Development (Next.js only)
```bash
npm run dev
```
This starts the Next.js development server at `http://localhost:3000`

#### Option B: Desktop App (Tauri)
```bash
npm run tauri:dev
```
This builds and runs the desktop application with hot reload.

### 4. Build for Production

#### Web Build
```bash
npm run build
npm start
```

#### Desktop App Build
```bash
npm run tauri:build
```
This creates platform-specific installers in `src-tauri/target/release/bundle/`

## 🎯 How to Play

1. **Start a Game**: Click "Deal" or press `D` to begin
2. **Hit**: Click "Hit" or press `H` to draw another card
3. **Stand**: Click "Stand" or press `S` to end your turn
4. **Win Conditions**:
   - Get 21 (Blackjack!)
   - Have a higher total than the dealer without going over 21
   - Dealer busts (goes over 21)

### Game Rules
- Dealer must hit on 16 and stand on 17
- Aces are worth 1 or 11 (automatically optimized)
- Face cards (J, Q, K) are worth 10
- Number cards are worth their face value

## 📁 Project Structure

```
taurijack/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx        # Main game page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── BlackjackGame.tsx
│   │   ├── Card.tsx
│   │   └── Hand.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useBlackjack.ts
│   └── lib/                # Game logic
│       └── blackjack.ts
├── src-tauri/              # Tauri backend
│   ├── src/
│   │   ├── main.rs
│   │   └── lib.rs
│   ├── Cargo.toml
│   └── tauri.conf.json
├── public/                 # Static assets
└── package.json
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run tauri:dev` - Start Tauri development
- `npm run tauri:build` - Build Tauri app for distribution

### Key Components

- **`BlackjackGame`**: Main game component with UI and controls
- **`useBlackjack`**: Custom hook managing game state and actions
- **`blackjack.ts`**: Core game logic (deck, hands, scoring)
- **`Card` & `Hand`**: Reusable UI components for displaying cards

## 🎨 Customization

### Styling
The app uses Tailwind CSS. Modify `src/app/globals.css` for global styles or update component classes for specific styling.

### Game Logic
Game rules and logic are in `src/lib/blackjack.ts`. You can modify:
- Deck creation and shuffling
- Scoring rules
- Dealer behavior
- Win conditions

### Tauri Configuration
Desktop app settings are in `src-tauri/tauri.conf.json`:
- Window size and properties
- App permissions
- Build settings
- Bundle configuration

## 🐛 Troubleshooting

### Common Issues

**"webkit2gtk-4.1 not found"**
- This project uses Tauri 1.x which works with webkit2gtk-4.0
- Make sure you have `webkit2gtk` installed on your system

**Build Errors**
- Ensure Rust and Cargo are up to date: `rustup update`
- Clean and rebuild: `cargo clean && npm run tauri:dev`

**Port Already in Use**
- If port 3000 is busy, change it in `next.config.ts` or kill the existing process

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🎯 Future Enhancements

- [ ] Sound effects
- [ ] Multiple deck support
- [ ] Betting system
- [ ] Statistics tracking
- [ ] Multiplayer support
- [ ] Custom themes
- [ ] Save/load game state

---

Enjoy playing Blackjack! 🃏
