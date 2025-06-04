# Copilot Agent Toolkit (CAT) - VS Code Extension

A comprehensive Visual Studio Code extension for designing and customizing Microsoft Copilot agent interfaces with real-time preview, theme gallery, and export capabilities. Features 6 professional themes, comprehensive styling options, mock DirectLine testing, and one-click export to production-ready JSON/HTML code.

## Screenshots

![Copilot Agent Toolkit Interface](https://raw.githubusercontent.com/Ramakrishnan24689/vscode-copilot-agent-tool-extension/main/screenshots/ToolScreenshot.png)

*The Copilot Agent Toolkit provides a comprehensive interface featuring:*
- **Theme Gallery**: 6 professional themes with visual preview cards
- **Live WebChat Preview**: Real-time Bot Framework WebChat integration
- **Customization Panels**: Comprehensive styling options organized in accordion panels
- **Export Functionality**: One-click export to production-ready JSON/HTML code

## Features

### Professional Theme Gallery
- **6 Professional Themes**: Microsoft Default, Modern Purple, Dark Professional, Light Minimal, Teams Inspired, Ocean Blue
- **Visual Preview Cards**: Each theme displays gradient headers, accent color squares, and color previews
- **One-Click Application**: Instant theme switching with real-time WebChat preview
- **Accent Color Focus**: Prominent 24x24px gradient accent color squares for easy identification

### Key Capabilities

- **Theme Gallery**: 6 professionally designed themes with visual preview cards
- **Live WebChat Preview**: Authentic Microsoft Bot Framework WebChat integration
- **Comprehensive Customization**: Full styling control organized in intuitive accordion panels
- **Font Selection**: Popular font families dropdown (Segoe UI, Arial, Helvetica, Times New Roman, Georgia, Verdana)
- **Mock DirectLine**: Test designs instantly without requiring live bot connection
- **Export Ready**: Generate production-ready JSON styleOptions and HTML code
- **Responsive Design**: Optimized layout that adapts to VS Code panel sizes

### Customization Categories
- **General**: Accent colors, background, fonts, root height
- **Send Box**: Input styling, button colors, upload button toggle
- **Avatar**: Size controls, border radius, bot/user avatar customization  
- **Bubble**: Message bubble styling for both user and bot messages
- **Suggested Actions**: Action button styling and layout options
- **Advanced**: Typography, padding, scrolling behavior, emoji settings

## Professional Theme Gallery

Choose from 6 professionally designed themes with instant visual preview:

### Microsoft Default
- Primary: #0078D4 | Accent: #106EBE 
- Clean, professional Microsoft styling | Perfect for corporate environments

### Modern Purple
- Primary: #6B46C1 | Accent: #8B5CF6 
- Contemporary design with modern purple tones | Ideal for creative applications

### Dark Professional
- Primary: #1F2937 | Accent: #3B82F6 
- Sleek dark theme for professional use | Great for developer tools

### Light Minimal
- Primary: #F8FAFC | Accent: #10B981 
- Clean minimal design with subtle accents | Perfect for clean interfaces

### Teams Inspired
- Primary: #464775 | Accent: #6264A7 
- Microsoft Teams color palette | Familiar for Teams users

### Ocean Blue
- Primary: #0EA5E9 | Accent: #0284C7 
- Fresh ocean-inspired blues | Calming and professional

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions view (`Ctrl+Shift+X`)
3. Search for "Copilot Agent Toolkit"
4. Click "Install" on the extension by RamakrishnanR
5. **Alternative**: [Install directly from marketplace](https://marketplace.visualstudio.com/items?itemName=RamakrishnanR.copilot-agent-tools)

### From VSIX Package
1. Download the latest `copilot-agent-tools.vsix` file
2. Open VS Code
3. Open Command Palette (Ctrl+Shift+P)
4. Type "Extensions: Install from VSIX"
5. Select the downloaded VSIX file

### From Source
1. Clone the repository:
   ```powershell
   git clone https://github.com/Ramakrishnan24689/vscode-copilot-agent-tool-extension.git
   cd vscode-copilot-agent-tool-extension
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Build the webview:
   ```powershell
   npm run build-webview
   ```

4. Compile the extension:
   ```powershell
   npm run compile
   ```

5. Package the extension:
   ```powershell
   vsce package
   ```

6. Install the generated VSIX file in VS Code

## Usage

### Quick Start
1. **Open Extension**: Press `Ctrl+Shift+P` → Type "Copilot Agent Toolkit" → Select "Open Copilot Agent Toolkit"
2. **Choose Theme**: Browse the theme gallery at the top and click any theme card
3. **Customize**: Use the configuration and customization panels below
4. **Export**: Click "Export JSON" or "Export HTML" buttons to get production code

### Interface Layout
```
┌─────────────────────────────────────────────────────────┐
│ 🎨 Copilot Agent Toolkit                                │
├─────────────────────────────────────────────────────────┤
│  Theme Gallery + Config      │  🤖 Live WebChat Preview │
│  ┌─────────────────────────┐ │  ┌─────────────────────────┐ │
│  │ 🎭 6 Professional Themes│ │  │ ✅ Real Bot Framework   │ │
│  │ ┌─────┐ ┌─────┐ ┌─────┐ │ │  │    WebChat Integration │ │
│  │ │🔵MS │ │🟣Mod│ │🖤Dark│ │ │  │                       │ │
│  │ │     │ │     │ │     │ │ │  │ 🤖 Bot: Hello! This   │ │
│  │ └─────┘ └─────┘ └─────┘ │ │  │     looks great!      │ │
│  │ ┌─────┐ ┌─────┐ ┌─────┐ │ │  │                       │ │
│  │ │⚪Light│ │🔷Teams│ │🌊Ocean│ │  │ 👤 User: I love the   │ │
│  │ │     │ │     │ │     │ │ │  │      real-time preview│ │
│  │ └─────┘ └─────┘ └─────┘ │ │  │                       │ │
│  └─────────────────────────┘ │  │ 🤖 Bot: Colors update │ │
│  📋 DirectLine Configuration │  │     instantly!        │ │
│  🎨 Chat Customization Panel │  └─────────────────────────┘ │
│  📤 Export JSON/HTML         │                             │
└─────────────────────────────────────────────────────────┘
```

### Key Interface Sections
- **Top**: Theme Gallery with 6 professional theme cards
- **Middle**: DirectLine configuration (Mock vs Real connection)  
- **Bottom Left**: Comprehensive chat customization options
- **Bottom**: Export buttons for JSON and HTML
- **Right Panel**: Live Bot Framework WebChat preview with real-time updates

## Export Formats

### Bot Framework WebChat JSON
The extension generates complete styleOptions for Microsoft Bot Framework WebChat:

```json
{
  "accent": "#106EBE",
  "backgroundColor": "#FFFFFF", 
  "botMessageBackground": "#F3F2F1",
  "userMessageBackground": "#0078D4",
  "primaryFont": "Segoe UI",
  "rootHeight": "100%",
  "hideUploadButton": true,
  "bubbleBackground": "#F3F2F1",
  "bubbleFromUserBackground": "#0078D4",
  "bubbleFromUserTextColor": "#FFFFFF",
  "sendBoxBackground": "#FFFFFF",
  "sendBoxButtonColor": "#0078D4",
  "sendBoxButtonColorOnFocus": "#106EBE",
  "sendBoxButtonColorOnHover": "#106EBE"
}
```

### Production HTML
Complete HTML file with DirectLine integration:
- Bot Framework WebChat CDN integration
- DirectLine token endpoint configuration  
- Production-ready styling
- Responsive design

## Development & Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Fluent UI v9
- **WebChat**: Microsoft Bot Framework WebChat
- **Build**: Webpack + VS Code Extension API
- **Styling**: CSS-in-JS with Fluent UI design tokens

### Key Features
- **Real-time Preview**: Instant WebChat updates without page reloads
- **Theme System**: Professional color schemes with proper accent mapping
- **Font Selection**: Popular web fonts with live preview
- **Mock DirectLine**: Test without bot connection
- **Export Ready**: Production JSON and HTML generation

### Project Structure
```
src/
├── extension.ts              # Main extension entry point
├── commands/
│   └── colorSelector.ts      # Copilot Agent Toolkit command
├── providers/
│   └── colorPickerPanel.ts   # Webview panel provider
├── webview/
│   ├── App.tsx              # Main React application
│   ├── index.tsx            # React entry point
│   ├── components/
│   │   ├── ThemeGallery.tsx # Theme selection with visual cards
│   │   ├── WebChatPreview.tsx # Live Bot Framework WebChat
│   │   └── ChatCustomizationPanel.tsx # Styling controls
│   ├── data/
│   │   ├── defaultThemes.ts # 6 predefined professional themes
│   │   └── defaultStyleOptions.json # Default WebChat config
│   ├── hooks/
│   │   ├── useThemeSelection.ts # Theme state management
│   │   └── useVSCodeAPI.ts  # VS Code integration
│   └── utils/
│       └── MockDirectLine.ts # Mock DirectLine for testing
└── test/
    └── suite/
        └── extension.test.ts # Extension functionality tests

out/webview/
├── index.html              # Compiled React application
└── index.js               # Webpack bundle (optimized)
│   │   ├── WebChatPreview.tsx # Live Bot Framework WebChat
│   │   └── ChatCustomizationPanel.tsx # Styling controls
│   ├── data/
│   │   ├── defaultThemes.ts # 6 predefined professional themes
│   │   └── defaultStyleOptions.json # Default WebChat config
│   ├── hooks/
│   │   ├── useThemeSelection.ts # Theme state management
│   │   └── useVSCodeAPI.ts  # VS Code integration
│   └── utils/
│       └── MockDirectLine.ts # Mock DirectLine for testing
└── test/
    └── suite/
        └── extension.test.ts # Extension functionality tests

out/webview/
├── index.html              # Compiled React application
└── index.js               # Webpack bundle (optimized)
```

### Available Scripts
- `npm run compile` - Compile TypeScript extension
- `npm run build-webview` - Build React webview bundle  
- `npm run watch` - Watch for changes and compile
- `vsce package` - Package extension for distribution

## Contributing

Contributions are welcome! Please feel free to:
- Submit pull requests
- Report issues
- Suggest new features
- Improve documentation

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For questions or support, please open an issue on the GitHub repository.