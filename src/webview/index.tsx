import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { App } from './App';

console.log('React app starting to load...');
console.log('Current location:', window.location.href);
console.log('VS Code API available:', typeof (window as any).vscode !== 'undefined');

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error in React app:', event.error);
  console.error('Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Get VS Code theme
const theme = document.body.getAttribute('data-vscode-theme-kind') === 'vscode-dark' 
  ? webDarkTheme 
  : webLightTheme;

console.log('Current VS Code theme:', document.body.getAttribute('data-vscode-theme-kind'));

const container = document.getElementById('root');
if (!container) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

console.log('Root element found:', container);
console.log('Root element HTML:', container.outerHTML.substring(0, 200));

const root = createRoot(container);

// Signal that React app is loaded
(window as any).reactAppLoaded = true;

try {
  console.log('Rendering React app...');
  root.render(
    <React.StrictMode>
      <FluentProvider theme={theme}>
        <App />
      </FluentProvider>
    </React.StrictMode>
  );
  console.log('React app rendered successfully');
  
  // Add a timeout to check if the app actually rendered
  setTimeout(() => {
    const rootContent = container.innerHTML;
    console.log('Root content after 1 second:', rootContent.substring(0, 500));
    if (rootContent.includes('loading')) {
      console.warn('App still showing loading state after 1 second');
    }
  }, 1000);
  
} catch (error) {
  console.error('Error rendering React app:', error);  // Show error in the UI
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  container.innerHTML = `
    <div style="padding: 20px; color: red; text-align: center;">
      <h3>React App Failed to Load</h3>
      <p>Error: ${errorMessage}</p>
      <p>Check the console for more details.</p>
    </div>
  `;
}

// Listen for VS Code theme changes
window.addEventListener('message', (event) => {
  const message = event.data;
  if (message.type === 'themeChanged') {
    const newTheme = message.theme === 'dark' ? webDarkTheme : webLightTheme;
    // Re-render with new theme - in a real app you'd use state management
    root.render(
      <React.StrictMode>
        <FluentProvider theme={newTheme}>
          <App />
        </FluentProvider>
      </React.StrictMode>
    );
  }
});
