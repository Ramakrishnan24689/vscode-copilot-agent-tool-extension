// filepath: src/webview/types/index.ts

export interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'default' | 'modern' | 'dark' | 'light' | 'custom';
  preview: string; // Preview image URL or base64
  colors: ThemeColors;
  tags: string[];
  isCustom?: boolean;
}

export interface ThemeColors {
  // Bot message colors
  botMessageBackground: string;
  botMessageText: string;
  botMessageBorder: string;
  
  // User message colors
  userMessageBackground: string;
  userMessageText: string;
  userMessageBorder: string;
  
  // Chat interface colors
  chatBackground: string;
  chatBorder: string;
  chatShadow: string;
  
  // Input area colors
  inputBackground: string;
  inputText: string;
  inputBorder: string;
  inputPlaceholder: string;
  
  // Button colors
  primaryButtonBackground: string;
  primaryButtonText: string;
  primaryButtonBorder: string;
  
  secondaryButtonBackground: string;
  secondaryButtonText: string;
  secondaryButtonBorder: string;
  
  // Accent colors
  accentColor: string;
  linkColor: string;
  errorColor: string;
  successColor: string;
  warningColor: string;
}

export interface CustomColorOverrides {
  [key: string]: string;
}

export interface VSCodeMessage {
  command: 'applyColor' | 'exportTheme' | 'saveTheme' | 'loadThemes';
  theme?: Theme;
  customColors?: CustomColorOverrides;
  format?: 'json' | 'html';
  data?: any;
}

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface ExportFormat {
  id: 'json' | 'css' | 'scss';
  name: string;
  description: string;
  extension: string;
}

export interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export interface ThemeGalleryProps {
  themes: Theme[];
  selectedTheme: Theme | null;
  onSelectTheme: (theme: Theme) => void;
  isLoading: boolean;
}

export interface WebChatPreviewProps {
  theme: Theme | null;
  customColors: CustomColorOverrides;
  onColorChange: (colorKey: string, color: string) => void;
}

export interface ExportPanelProps {
  theme: Theme | null;
  customColors: CustomColorOverrides;
  onExport: (format: 'json' | 'css' | 'scss') => void;
  isExporting: boolean;
}
