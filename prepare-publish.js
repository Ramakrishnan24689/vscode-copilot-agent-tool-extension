#!/usr/bin/env node

/**
 * Copilot Agent Tools - Publishing Preparation Script
 * 
 * This script prepares the extension for publishing by:
 * 1. Cleaning previous builds
 * 2. Building TypeScript and webview components
 * 3. Running tests
 * 4. Packaging the extension
 * 5. Validating the package
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Copilot Agent Tools for publishing...\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function execCommand(command, description) {
  try {
    log(`${colors.blue}➤ ${description}...${colors.reset}`);
    const result = execSync(command, { stdio: 'pipe', encoding: 'utf8' });
    log(`${colors.green}✓ ${description} completed${colors.reset}`);
    return result;
  } catch (error) {
    log(`${colors.red}✗ ${description} failed:${colors.reset}`);
    log(`${colors.red}${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Step 1: Clean previous builds
log(`${colors.cyan}Step 1: Cleaning previous builds${colors.reset}`);
try {
  if (fs.existsSync('./out')) {
    fs.rmSync('./out', { recursive: true, force: true });
    log(`${colors.green}✓ Cleaned ./out directory${colors.reset}`);
  }
  if (fs.existsSync('./copilot-agent-tools.vsix')) {
    fs.unlinkSync('./copilot-agent-tools.vsix');
    log(`${colors.green}✓ Removed previous .vsix package${colors.reset}`);
  }
} catch (error) {
  log(`${colors.yellow}⚠ Warning: Could not clean all previous builds${colors.reset}`);
}

// Step 2: Install dependencies
log(`\n${colors.cyan}Step 2: Installing dependencies${colors.reset}`);
execCommand('npm ci', 'Installing dependencies');

// Step 3: Compile TypeScript
log(`\n${colors.cyan}Step 3: Compiling TypeScript${colors.reset}`);
execCommand('npm run compile', 'Compiling TypeScript extension code');

// Step 4: Build webview
log(`\n${colors.cyan}Step 4: Building webview components${colors.reset}`);
execCommand('npm run build-webview', 'Building React webview components');

// Step 5: Run tests (optional, but recommended)
log(`\n${colors.cyan}Step 5: Running tests${colors.reset}`);
try {
  execCommand('npm test', 'Running extension tests');
} catch (error) {
  log(`${colors.yellow}⚠ Warning: Tests failed or not configured. Continuing with packaging...${colors.reset}`);
}

// Step 6: Validate package.json
log(`\n${colors.cyan}Step 6: Validating package configuration${colors.reset}`);
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const requiredFields = ['name', 'displayName', 'description', 'version', 'publisher', 'engines'];
const missingFields = requiredFields.filter(field => !packageJson[field]);

if (missingFields.length > 0) {
  log(`${colors.red}✗ Missing required package.json fields: ${missingFields.join(', ')}${colors.reset}`);
  process.exit(1);
}

// Check for icon
if (!fs.existsSync('./media/icon.png')) {
  log(`${colors.yellow}⚠ Warning: No icon.png found in ./media/ directory${colors.reset}`);
}

// Check for README
if (!fs.existsSync('./README.md')) {
  log(`${colors.yellow}⚠ Warning: No README.md found${colors.reset}`);
}

log(`${colors.green}✓ Package configuration validated${colors.reset}`);

// Step 7: Package the extension
log(`\n${colors.cyan}Step 7: Packaging extension${colors.reset}`);
execCommand('npm run package', 'Creating .vsix package');

// Step 8: Validate the package
log(`\n${colors.cyan}Step 8: Validating package contents${colors.reset}`);
try {
  const packageInfo = execCommand('npx vsce ls', 'Listing package contents');
  log(`${colors.green}✓ Package contents validated${colors.reset}`);
} catch (error) {
  log(`${colors.yellow}⚠ Warning: Could not validate package contents${colors.reset}`);
}

// Final summary
log(`\n${colors.bright}${colors.green}🎉 Publishing preparation completed successfully!${colors.reset}`);
log(`\n${colors.cyan}📦 Package file: ${colors.bright}copilot-agent-tools.vsix${colors.reset}`);
log(`\n${colors.cyan}Next steps:${colors.reset}`);
log(`${colors.yellow}  1. Test the extension: code --install-extension copilot-agent-tools.vsix${colors.reset}`);
log(`${colors.yellow}  2. Publish to marketplace: npm run publish${colors.reset}`);
log(`${colors.yellow}  3. Or publish with version bump: npm run publish-patch/minor/major${colors.reset}`);

// Display package info
log(`\n${colors.cyan}📋 Package Information:${colors.reset}`);
log(`   Name: ${packageJson.displayName} (${packageJson.name})`);
log(`   Version: ${packageJson.version}`);
log(`   Publisher: ${packageJson.publisher}`);
log(`   Description: ${packageJson.description}`);

log(`\n${colors.green}Ready for publishing! 🚀${colors.reset}`);
