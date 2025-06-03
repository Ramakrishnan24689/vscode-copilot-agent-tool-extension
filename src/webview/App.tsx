import React, { useState, useCallback, useEffect } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Body1,
  Button,
  Card,
  CardHeader,
  CardPreview,
  Spinner,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  Switch,
  Accordion,
  AccordionItem,
  AccordionHeader,  AccordionPanel,
  Slider,
  Field,
} from '@fluentui/react-components';
import { Dismiss24Regular, ChevronDown24Regular, DocumentArrowDown24Regular, Code24Regular } from '@fluentui/react-icons';
import { WebChatPreview } from './components/WebChatPreview';
import { ChatCustomizationPanel } from './components/ChatCustomizationPanel';
import { ThemeGallery } from './components/ThemeGallery';
import { useThemeSelection } from './hooks/useThemeSelection';
import { useVSCodeAPI } from './hooks/useVSCodeAPI';
import { Input, Label } from '@fluentui/react-components';
import { Save24Regular } from '@fluentui/react-icons';
import defaultStyleOptions from './data/defaultStyleOptions.json';

console.log('App component loading...');

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding('16px'),
    ...shorthands.gap('16px'),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding('8px', '0'),
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '60fr 40fr',
    ...shorthands.gap('24px'),
    flex: 1,
    minHeight: 0,
    height: 'calc(100vh - 120px)', /* Subtract header height + padding */
    overflow: 'hidden',
  },  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('0'), /* Remove gap to control spacing manually */
    height: '100%',
    overflow: 'auto',
    paddingRight: '8px', /* Add padding for scrollbar */
  },themeSection: {
    flexShrink: 0, /* Don't let theme gallery shrink */
    marginBottom: '0', /* No space after theme gallery */
  },
  configSection: {
    flexShrink: 0, /* Don't let config section shrink */
    marginTop: '0',
    marginBottom: '0', /* No space around config section */
  },
  customizationSection: {
    flex: 1, /* Let customization panel take remaining space */
    minHeight: 0, /* Allow shrinking below content height */
    marginTop: '0', /* No space before customization */
    marginBottom: '0', /* No space after customization */
  },  customDivider: {
    height: '1px',
    backgroundColor: tokens.colorNeutralStroke2,
    margin: '8px 0', /* Minimal controlled spacing */
    border: 'none',
    opacity: 0.3,
  },  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    height: '100%',
    overflow: 'hidden', /* Prevent scrollbars */
    flex: 1, /* Take remaining space */
    position: 'relative', /* For absolute positioning if needed */
  },
  actions: {
    display: 'flex',
    ...shorthands.gap('8px'),
  },
  contentResponsive: {
    '@media (max-width: 1200px)': {
      gridTemplateColumns: '1fr !important',
      gridTemplateRows: 'auto 1fr',
    },
  },  styleForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '0', /* Remove bottom margin */
    marginTop: '0', /* Remove top margin */
  },
  styleField: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  colorInput: {
    width: '120px',
  },
  textInput: {
    width: '180px',
  },  exportButtons: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
    padding: '8px 0',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

export const App: React.FC = () => {
  const styles = useStyles();
  const {
    selectedTheme,
    customColors,
    themes,
    selectTheme,
    updateCustomColor,
    isLoading,
  } = useThemeSelection();
    const { sendMessage, showNotification, notification } = useVSCodeAPI();
  const [isExporting, setIsExporting] = useState(false);  const [styleOptions, setStyleOptions] = useState<any>(defaultStyleOptions);
  const [directLineTokenEndpoint, setDirectLineTokenEndpoint] = useState<string>('');
  const [useMockDirectLine, setUseMockDirectLine] = useState<boolean>(true); // Default to mock for better development experience  // Apply default Microsoft theme when component mounts and selectedTheme is available
  useEffect(() => {
    if (selectedTheme && selectedTheme.colors) {
      console.log('Applying theme:', selectedTheme.name, selectedTheme.colors);
      setStyleOptions((prev: any) => ({
        ...prev,
        // Core WebChat properties
        accent: selectedTheme.colors.accentColor,
        backgroundColor: selectedTheme.colors.chatBackground,
        primaryFont: prev.primaryFont || 'Segoe UI',
        
        // Send box styling
        sendBoxBackground: selectedTheme.colors.inputBackground,
        sendBoxTextColor: selectedTheme.colors.inputText,
        sendBoxButtonColor: selectedTheme.colors.primaryButtonBackground,
        sendBoxButtonColorOnHover: selectedTheme.colors.primaryButtonBorder,
        sendBoxPlaceholderColor: selectedTheme.colors.inputPlaceholder,
        
        // Bot message bubble styling
        bubbleBackground: selectedTheme.colors.botMessageBackground,
        bubbleTextColor: selectedTheme.colors.botMessageText,
        bubbleBorderColor: selectedTheme.colors.botMessageBorder,
        
        // User message bubble styling
        bubbleFromUserBackground: selectedTheme.colors.userMessageBackground,
        bubbleFromUserTextColor: selectedTheme.colors.userMessageText,
        bubbleFromUserBorderColor: selectedTheme.colors.userMessageBorder,
        
        // Suggested actions
        suggestedActionBackgroundColor: selectedTheme.colors.secondaryButtonBackground,
        suggestedActionBackgroundColorOnHover: selectedTheme.colors.accentColor,
        suggestedActionBorderColor: selectedTheme.colors.secondaryButtonBorder,
        suggestedActionTextColor: selectedTheme.colors.secondaryButtonText,
        
        // Avatar colors
        botAvatarBackgroundColor: selectedTheme.colors.botMessageBackground,
        userAvatarBackgroundColor: selectedTheme.colors.userMessageBackground,
        
        // Additional WebChat styling
        subtleColor: selectedTheme.colors.inputPlaceholder || '#8A8886',
      }));
    } else {
      console.log('No theme selected or theme has no colors');
    }
  }, [selectedTheme]);

  const handleApplyTheme = useCallback(async () => {
    if (!selectedTheme) return;
    
    try {
      await sendMessage({
        command: 'applyColor',
        theme: selectedTheme,
        customColors,
      });
      showNotification('Theme applied successfully!', 'success');
    } catch (error) {
      showNotification('Failed to apply theme', 'error');
    }
  }, [selectedTheme, customColors, sendMessage, showNotification]);

  const handleExport = useCallback(async (format: 'json' | 'html') => {
    if (!selectedTheme) return;
    
    setIsExporting(true);
    try {
      await sendMessage({
        command: 'exportTheme',
        theme: selectedTheme,
        customColors,
        format,
      });
      showNotification(`Theme exported as ${format.toUpperCase()}!`, 'success');
    } catch (error) {
      showNotification('Failed to export theme', 'error');
    } finally {
      setIsExporting(false);
    }
  }, [selectedTheme, customColors, sendMessage, showNotification]);  // Handle style option changes
  const handleStyleChange = useCallback((key: string, value: any) => {
    console.log(`handleStyleChange called - ${key}:`, value);
    setStyleOptions((prev: any) => {
      const newOptions = {
        ...prev,
        [key]: value,
      };
      console.log('Updated styleOptions:', newOptions);
      return newOptions;
    });
  }, []);

  // Handle theme selection - update style options when theme changes
  const handleThemeSelect = useCallback((theme: any) => {
    selectTheme(theme);
    
    // Update style options to reflect the selected theme
    if (theme?.colors) {
      setStyleOptions((prev: any) => ({
        ...prev,
        // Bot message styling
        botMessageBackground: theme.colors.botMessageBackground,
        botMessageTextColor: theme.colors.botMessageText,
        botMessageBorderColor: theme.colors.botMessageBorder,
        
        // User message styling  
        userMessageBackground: theme.colors.userMessageBackground,
        userMessageTextColor: theme.colors.userMessageText,
        userMessageBorderColor: theme.colors.userMessageBorder,
          // General chat styling
        backgroundColor: theme.colors.chatBackground,
        primaryFont: prev.primaryFont, // Keep existing font
        accent: theme.colors.accentColor, // This is the key WebChat accent color property
        
        // Send box styling
        sendBoxBackground: theme.colors.inputBackground,
        sendBoxTextColor: theme.colors.inputText,
        sendBoxButtonColor: theme.colors.primaryButtonBackground,
        sendBoxButtonColorOnHover: theme.colors.primaryButtonBorder,
        
        // Bubble styling to match theme colors
        bubbleBackground: theme.colors.botMessageBackground,
        bubbleTextColor: theme.colors.botMessageText,
        bubbleBorderColor: theme.colors.botMessageBorder,
        bubbleFromUserBackground: theme.colors.userMessageBackground,
        bubbleFromUserTextColor: theme.colors.userMessageText,
        bubbleFromUserBorderColor: theme.colors.userMessageBorder,
        
        // Suggested actions
        suggestedActionBackgroundColor: theme.colors.secondaryButtonBackground,
        suggestedActionBackgroundColorOnHover: theme.colors.accentColor,
        suggestedActionBorderColor: theme.colors.secondaryButtonBorder,
      }));
    }
  }, [selectTheme]);

  // Export JSON
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(styleOptions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webchat-style.json';
    a.click();
    URL.revokeObjectURL(url);
  };  // Export HTML
  const handleExportHTML = () => {
    const tokenEndpointValue = directLineTokenEndpoint || '{INJECT_TOKENENDPOINT}';
    const html = `
<!doctype html>
<html lang="en">
  <head>
    <title>Contoso Sample Web Chat</title>
    <script crossorigin="anonymous" src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
  </head>
  <body>
    <div id="webchat"></div>
    <script>
      const tokenEndpoint = '${tokenEndpointValue}';
      const styleOptions = ${JSON.stringify(styleOptions, null, 2)};
      (async function () {
        const response = await fetch(tokenEndpoint);
        if (!response.ok) throw new Error('Failed to retrieve Direct Line token.');
        const { token } = await response.json();
        const directLine = window.WebChat.createDirectLine({ token });
        window.WebChat.renderWebChat({ directLine, styleOptions }, document.getElementById('webchat'));
      })();
    <\/script>
  </body>
</html>
    `.trim();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webchat-embed.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.root}>      {/* Header */}
      <header className={styles.header}>
        <div>
          <Title1>Copilot Agent Tools</Title1>
          <br />
          <Body1>Customize your Microsoft Copilot agent interfaces with real-time preview, themes & export capabilities.</Body1>
        </div>
      </header>
      <div className={`${styles.content} ${styles.contentResponsive}`}>        {/* Left Panel - Theme Gallery, Style Options & Token */}
        <div className={styles.leftPanel}>
          {/* Theme Gallery Section */}
          <div className={styles.themeSection}>
            <ThemeGallery
              themes={themes}
              selectedTheme={selectedTheme}
              onSelectTheme={handleThemeSelect}
              isLoading={isLoading}            />
          </div>

          <div className={styles.customDivider} />

          {/* Configuration Section */}
          <div className={`${styles.styleForm} ${styles.configSection}`}>
              {/* Mock DirectLine Toggle */}
              <div className={styles.styleField}>
                <Label htmlFor="useMockDirectLine">Use Mock DirectLine</Label>
                <Switch
                  id="useMockDirectLine"
                  checked={useMockDirectLine}
                  onChange={(_, data) => setUseMockDirectLine(data.checked)}
                />
                <Body1 style={{ fontSize: '12px', color: tokens.colorNeutralForeground2 }}>
                  {useMockDirectLine ? 'Using mock data for development' : 'Using real DirectLine connection'}
                </Body1>
              </div>              {/* DirectLine Token Endpoint (only show when not using mock) */}
              {!useMockDirectLine && (
                <div className={styles.styleField}>
                  <Label htmlFor="directLineTokenEndpoint">DirectLine Token Endpoint</Label>
                  <Input
                    id="directLineTokenEndpoint"
                    type="text"
                    value={directLineTokenEndpoint}
                    className={styles.textInput}
                    onChange={(_, data) => setDirectLineTokenEndpoint(data.value)}
                    placeholder="https://your-endpoint.com/api/directline/token"
                  />
                  <Body1 style={{ fontSize: '12px', color: tokens.colorNeutralForeground2 }}>
                    URL that returns a DirectLine token
                  </Body1>
                </div>              )}            </div>

            <div className={styles.customDivider} />            {/* Chat Customization Section */}
            <div className={styles.customizationSection}>
              <ChatCustomizationPanel
                styleOptions={styleOptions}
                onStyleChange={handleStyleChange}
              />
            </div>
        </div>        {/* Right Panel - Live WebChat Preview */}
        <div className={styles.rightPanel}>
          <div className={styles.exportButtons}>
            <Button icon={<Code24Regular />} onClick={handleExportJSON} type="button">Export JSON</Button>
            <Button icon={<Save24Regular />} onClick={handleExportHTML} type="button">Export HTML</Button>
          </div>
            <WebChatPreview
            directLineTokenEndpoint={directLineTokenEndpoint || undefined}
            useMockDirectLine={useMockDirectLine}
            styleOptions={styleOptions}
          />
        </div>
      </div>
    </div>
  );
};
