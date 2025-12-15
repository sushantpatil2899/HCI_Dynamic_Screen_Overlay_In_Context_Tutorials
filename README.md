# Interactive Tutorial Launcher

A modern, desktop application for browsing, importing, and launching interactive computer tutorials. Built with React, TypeScript, and Tailwind CSS following Apple + Microsoft Fluent design principles.

![Tutorial Launcher](https://img.shields.io/badge/React-18.3-blue) (https://img.shields.io/badge/Electron-27.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple)

---

## 🎯 Features

### 📚 Tutorial Library (Home Screen)
- Browse built-in and imported tutorials
- Search and filter by category, OS, tags
- View tutorial statistics and metadata
- Mark tutorials as favorites
- Quick launch functionality

### ➕ Import Tutorials
- Register new tutorials via form
- JSON file path validation
- Metadata collection (title, description, tags, category, OS)
- Automatic step detection

### 📖 Tutorial Details
- Full tutorial metadata display
- Step-by-step preview with visual items
- Action detection configuration
- Start, edit, and delete operations

### ⚙️ Settings
- Auto-minimize on tutorial start
- Restore window on completion
- Configure overlay script path
- Statistics tracking toggle
- Theme preferences

### 📚 Help & Documentation
- Complete JSON structure reference
- Item types (text, arrow, rect) documentation
- Action types (click, type, any) examples
- Full tutorial examples

### 🏗️ System Architecture
- Visual diagram of app components
- Launcher UI + Overlay Engine interaction
- Data flow visualization

---

## 🔧 Technology Stack

- **Framework:** Electron 27.0.0, React 18.3
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS v4.0
- **Build Tool:** Vite 6.0
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Persistence:** File System (Electron-ready)

---

## 📦 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- VS Code ([Download](https://code.visualstudio.com/))

### Installation

```bash
# 1. Create project
mkdir tutorial-launcher && cd tutorial-launcher

# 2. Initialize Vite project
npm create vite@latest . -- --template react-ts

# 3. Install dependencies
npm install && npm install tailwindcss@next @tailwindcss/vite@next class-variance-authority clsx tailwind-merge @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast lucide-react sonner@2.0.3 date-fns

# 4. Copy project files (see SETUP_GUIDE.md)

# 5. Run development server
npm run dev
```

**Open:** http://localhost:5173

---

## 📁 Project Structure

```
src/
├── App.tsx                          # Main application
├── main.tsx                         # React entry point
├── components/
│   ├── Navigation.tsx              # Top navigation
│   ├── HomeScreen.tsx              # Tutorial library
│   ├── ImportTutorialScreen.tsx    # Import form
│   ├── TutorialDetailsScreen.tsx   # Details view
│   ├── SettingsScreen.tsx          # App settings
│   ├── HelpScreen.tsx              # Documentation
│   ├── SystemDiagram.tsx           # Architecture diagram
│   ├── TutorialCard.tsx            # Tutorial card
│   ├── figma/
│   │   └── ImageWithFallback.tsx   # Image component
│   └── ui/                         # shadcn/ui components
├── lib/
│   ├── storage.ts                  # Persistence system
│   └── utils.ts                    # Utility functions
└── styles/
    └── globals.css                 # Global styles
```

---

## 💾 Data Persistence

### Current (Desktop App)
- Ready for **Electron** migration
- File-based storage
- Path: `%APPDATA%/TutorialLauncher/config.json`
- Only requires updating `/lib/storage.ts`

### What Gets Persisted
✅ All imported tutorials  
✅ Tutorial statistics (runs, dates)  
✅ Favorite status  
✅ Application settings  
✅ Tutorial metadata  

---

## 🎨 Design System

### Color Palette
- **Primary Accent:** Microsoft Blue (#0078D4)
- **Background:** Light Gray (#F8F9FB)
- **Text:** Dark Gray (#1A1A1A)
- **Borders:** Subtle Gray (#E5E7EB)

### Typography
- **Font:** Inter (system fallback)
- **Hierarchy:** Defined in `globals.css`
- **No manual font sizing** (uses semantic HTML)

### Design Principles
- Minimalist and clean
- Generous whitespace
- Subtle interactions
- Distraction-free interface
- Apple + Microsoft Fluent inspired

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **README.md** | This file - project overview |
---

## 🔌 Tutorial JSON Structure

Tutorials are stored in separate JSON files with this structure:

```json
{
  "steps": [
    {
      "items": [
        {
          "type": "text",
          "params": {
            "content": "Welcome!",
            "position": [100, 50],
            "font_family": "Inter",
            "font_size": 24,
            "color": "#FFFFFF"
          }
        },
        {
          "type": "arrow",
          "params": {
            "start": [650, 450],
            "direction": "down",
            "length": 80,
            "color": "#0078D4",
            "thickness": 4
          }
        },
        {
          "type": "rect",
          "params": {
            "position": [600, 500],
            "size": [120, 45],
            "border_color": "#0078D4",
            "border_thickness": 3,
            "fill_opacity": 0.0,
            "corner_radius": 8
          }
        }
      ],
      "action": {
        "type": "click",
        "region": [600, 500, 120, 45],
        "padding": 20
      }
    }
  ]
}
```

### Item Types
- **text** - Display text overlay
- **arrow** - Directional pointer
- **rect** - Highlight rectangle

### Action Types
- **click** - Wait for click in region
- **type** - Wait for text input
- **any** - Multiple action options

---

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
tsc --noEmit
```

### VS Code Tips

- **Open Terminal:** `` Ctrl+` ``
- **Quick File Open:** `Ctrl+P`
- **Format Code:** `Shift+Alt+F`
- **Toggle Sidebar:** `Ctrl+B`

---

## 🧪 Testing Persistence

1. **Import a tutorial** via Import screen
2. **Refresh the page** (F5)
3. ✅ Tutorial should still be there
4. **Toggle favorite** on a tutorial
5. **Refresh again**
6. ✅ Favorite status persists

---

## 🎯 Key Concepts

### Separation of Concerns
- **Launcher UI** (this app) - Manages catalog, metadata, settings
- **Tutorial JSON** - Contains actual step content
- **Python Overlay** - Displays interactive tutorial

### Data Flow
1. **Metadata** stored in app config
2. **Content** stored in tutorial JSON files
3. **Config** references JSON file paths
4. **Python script** reads JSON files

### Built-in vs Imported
- **Built-in:** Pre-loaded tutorials, marked as `source: 'built-in'`
- **Imported:** User-added tutorials, marked as `source: 'imported'`
- Both stored identically in config

---

## 🐛 Troubleshooting

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Not Loading
- Check `vite.config.ts` has tailwindcss plugin
- Verify `main.tsx` imports `globals.css`
- Restart dev server

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### TypeScript Errors
- Check import paths
- Verify all files exist
- Ensure interfaces match

---

## 📝 Tutorial Format

### Minimal Tutorial
```json
{
  "steps": [
    {
      "items": [
        {
          "type": "text",
          "params": {
            "content": "Step 1",
            "position": [100, 50],
            "font_family": "Inter",
            "font_size": 24,
            "color": "#FFFFFF"
          }
        }
      ],
      "action": {
        "type": "click",
        "region": [600, 500, 120, 45],
        "padding": 10
      }
    }
  ]
}
```

---

## 🌟 Features Roadmap

### Completed ✅
- ✅ Tutorial library with search/filter
- ✅ Import tutorial functionality
- ✅ Tutorial details view
- ✅ Settings management
- ✅ Help documentation
- ✅ System architecture diagram
- ✅ File-based persistence
- ✅ Statistics tracking
- ✅ Desktop app (Electron build)

### Future Enhancements 🔮
- [ ] Tutorial editor (visual step builder)
- [ ] Export/import config backups
- [ ] Tutorial categories customization
- [ ] Keyboard shortcuts
- [ ] Tutorial preview mode
- [ ] Multi-language support
- [ ] Tutorial sharing/export

---

## 🤝 Contributing

This project is currently a personal/educational project. 

**To contribute:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is open source and available for educational purposes.

---

## 📞 Support

For setup help, see:
- **QUICK_START.md** - Fast setup commands
- **SETUP_GUIDE.md** - Detailed instructions
- **FILE_STRUCTURE.md** - File organization
- **STORAGE_README.md** - Persistence system

---

## 🎉 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **Radix UI** - Accessible primitives
- **Lucide** - Icon library
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool

---

## 📈 Project Stats

- **Components:** 8 main screens
- **UI Components:** 40+ shadcn/ui components
- **TypeScript:** Fully typed
- **Responsive:** Desktop-focused design
- **Persistence:** Full localStorage implementation
- **Documentation:** 6 comprehensive guides

---

## 🔗 Quick Links

| Link | Description |
|------|-------------|
| [Quick Start](QUICK_START.md) | Get running in 10 minutes |
| [Setup Guide](SETUP_GUIDE.md) | Complete installation |
| [File Structure](FILE_STRUCTURE.md) | File organization |
| [Storage Docs](STORAGE_README.md) | Persistence system |
| [Implementation](IMPLEMENTATION_SUMMARY.md) | Technical details |

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

*Last Updated: December 1, 2025*
