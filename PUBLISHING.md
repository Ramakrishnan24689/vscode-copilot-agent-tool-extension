# 📦 Copilot Agent Tools - Publishing Checklist

## Pre-Publishing Checklist

### ✅ Code Quality & Functionality
- [ ] **Extension loads without errors**
- [ ] **All commands work correctly**
  - [ ] `Ctrl+Shift+A` / `Cmd+Shift+A` opens the extension
  - [ ] Theme gallery displays correctly
  - [ ] Theme selection updates preview
  - [ ] Customization panels function properly
  - [ ] Export JSON/HTML works
- [ ] **WebChat preview displays mock interface**
- [ ] **No console errors in development**
- [ ] **Clean compilation** (`npm run compile`)
- [ ] **Clean webview build** (`npm run build-webview`)

### ✅ Package Configuration
- [ ] **Package.json is complete**
  - [ ] Correct name: `copilot-agent-tools`
  - [ ] Proper displayName: `Copilot Agent Tools`
  - [ ] Descriptive description
  - [ ] Correct version number
  - [ ] Publisher name set
  - [ ] Categories appropriate
  - [ ] Keywords relevant
- [ ] **Icon file exists** (`media/icon.png`)
- [ ] **README.md is comprehensive**
- [ ] **CHANGELOG.md is updated**
- [ ] **LICENSE file exists**

### ✅ VS Code Integration
- [ ] **Commands registered properly**
- [ ] **Keybindings work**
- [ ] **Menu items appear correctly**
- [ ] **Extension activates on command**
- [ ] **Status bar integration works**

### ✅ Build & Package
- [ ] **Clean build process**
- [ ] **All dependencies resolved**
- [ ] **Output files generated**
  - [ ] `out/extension.js`
  - [ ] `out/webview/index.js`
  - [ ] `out/webview/index.html`
- [ ] **.vscodeignore configured**
- [ ] **Package size reasonable** (< 10MB recommended)

---

## Publishing Process

### 1. 🧹 Preparation
```bash
# Run the comprehensive preparation script
npm run prepare-publish
```

### 2. 🔍 Manual Testing
```bash
# Install and test the packaged extension
code --install-extension copilot-agent-tools.vsix
```

**Test scenarios:**
- [ ] Open VS Code, use `Ctrl+Shift+A` to open extension
- [ ] Select different themes and verify preview updates
- [ ] Customize colors and verify changes reflect in preview
- [ ] Export JSON configuration
- [ ] Export HTML embed code
- [ ] Toggle between mock and real DirectLine
- [ ] Verify responsive design at different panel sizes

### 3. 📋 Final Validation
- [ ] **Extension metadata is correct**
- [ ] **Screenshots/GIFs are up to date**
- [ ] **Documentation matches functionality**
- [ ] **Version number incremented appropriately**
- [ ] **All TODOs resolved or documented**

### 4. 🚀 Publishing Commands

**For first-time publishing:**
```bash
npm run publish
```

**For version updates:**
```bash
# Patch version (0.1.0 → 0.1.1) - Bug fixes
npm run publish-patch

# Minor version (0.1.0 → 0.2.0) - New features
npm run publish-minor

# Major version (0.1.0 → 1.0.0) - Breaking changes
npm run publish-major
```

---

## Post-Publishing Checklist

### ✅ Marketplace Verification
- [ ] **Extension appears in VS Code Marketplace**
- [ ] **Description and metadata correct**
- [ ] **Screenshots display properly**
- [ ] **Install count begins tracking**
- [ ] **Download and test from marketplace**

### ✅ Documentation Updates
- [ ] **Update GitHub repository README**
- [ ] **Add marketplace badges**
- [ ] **Update any external documentation**
- [ ] **Announce release** (if applicable)

### ✅ Monitoring
- [ ] **Monitor marketplace reviews**
- [ ] **Check for bug reports**
- [ ] **Monitor download/install statistics**
- [ ] **Update CHANGELOG.md for next version**

---

## 🔧 Troubleshooting Common Issues

### Build Failures
```bash
# Clean and rebuild
npm run clean  # (if script exists)
rm -rf out node_modules
npm install
npm run compile && npm run build-webview
```

### Package Size Too Large
- Check `.vscodeignore` excludes unnecessary files
- Ensure `node_modules` is excluded
- Exclude source TypeScript files (`.ts`, `.tsx`)
- Exclude development/test files

### Authentication Issues
```bash
# Login to VS Code marketplace
vsce login <publisher-name>
```

### Missing Dependencies
- Ensure all required dependencies are in `dependencies` not `devDependencies`
- Check for missing peer dependencies

---

## 📊 Quality Metrics

**Target metrics for a quality extension:**
- **Install Size:** < 10MB
- **Activation Time:** < 2 seconds
- **Memory Usage:** < 50MB
- **CPU Usage:** < 5% during normal operation
- **Bundle Size:** < 5MB (webview)

---

## 🎯 Success Criteria

- ✅ Extension installs without errors
- ✅ All advertised features work correctly
- ✅ Performance is acceptable
- ✅ UI is responsive and intuitive
- ✅ Documentation is clear and complete
- ✅ No breaking changes for existing users (minor/patch versions)

**Ready to publish when all checkboxes are ✅!**
