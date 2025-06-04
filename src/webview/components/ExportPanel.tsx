// filepath: src/webview/components/ExportPanel.tsx
import React, { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  CardHeader,
  CardPreview,
  Button,
  Text,
  Textarea,
  Select,
  Option,
  Field,
  Title3,
  Body1,
  Caption1,
  Spinner,
  MessageBar,
  MessageBarBody,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-components';
import {
  DocumentArrowDown24Regular,
  Copy24Regular,
  CheckmarkCircle24Regular,
  Code24Regular,
} from '@fluentui/react-icons';
import { ExportPanelProps, ExportFormat } from '../types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  exportOptions: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('12px'),
    ...shorthands.padding('16px'),
  },
  formatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    ...shorthands.gap('8px'),
  },
  formatButton: {
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('4px'),
  },
  previewSection: {
    ...shorthands.padding('16px'),
  },
  codePreview: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('12px'),
    fontFamily: 'monospace',
    fontSize: '12px',
    maxHeight: '200px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  actions: {
    display: 'flex',
    ...shorthands.gap('8px'),
    marginTop: '8px',
  },
  copySuccess: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

const exportFormats: ExportFormat[] = [
  {
    id: 'json',
    name: 'JSON',
    description: 'JavaScript Object Notation for programmatic use',
    extension: '.json',
  },
  {
    id: 'css',
    name: 'CSS',
    description: 'CSS custom properties for web styling',
    extension: '.css',
  },
  {
    id: 'scss',
    name: 'SCSS',
    description: 'Sass variables for advanced styling',
    extension: '.scss',
  },
];

const generateExportCode = (theme: any, customColors: any, format: string): string => {
  const effectiveColors = {
    ...theme.colors,
    ...customColors,
  };

  switch (format) {
    case 'json':
      return JSON.stringify({
        theme: {
          id: theme.id,
          name: theme.name,
          description: theme.description,
          category: theme.category,
          colors: effectiveColors,
        },
      }, null, 2);

    case 'css':
      return `:root {
  /* Bot Message Colors */
  --bot-message-bg: ${effectiveColors.botMessageBackground};
  --bot-message-text: ${effectiveColors.botMessageText};
  --bot-message-border: ${effectiveColors.botMessageBorder};
  
  /* User Message Colors */
  --user-message-bg: ${effectiveColors.userMessageBackground};
  --user-message-text: ${effectiveColors.userMessageText};
  --user-message-border: ${effectiveColors.userMessageBorder};
  
  /* Chat Interface Colors */
  --chat-bg: ${effectiveColors.chatBackground};
  --chat-border: ${effectiveColors.chatBorder};
  --chat-shadow: ${effectiveColors.chatShadow};
  
  /* Input Colors */
  --input-bg: ${effectiveColors.inputBackground};
  --input-text: ${effectiveColors.inputText};
  --input-border: ${effectiveColors.inputBorder};
  --input-placeholder: ${effectiveColors.inputPlaceholder};
  
  /* Button Colors */
  --primary-btn-bg: ${effectiveColors.primaryButtonBackground};
  --primary-btn-text: ${effectiveColors.primaryButtonText};
  --primary-btn-border: ${effectiveColors.primaryButtonBorder};
  --secondary-btn-bg: ${effectiveColors.secondaryButtonBackground};
  --secondary-btn-text: ${effectiveColors.secondaryButtonText};
  --secondary-btn-border: ${effectiveColors.secondaryButtonBorder};
  
  /* Accent Colors */
  --accent-color: ${effectiveColors.accentColor};
  --link-color: ${effectiveColors.linkColor};
  --error-color: ${effectiveColors.errorColor};
  --success-color: ${effectiveColors.successColor};
  --warning-color: ${effectiveColors.warningColor};
}`;

    case 'scss':      return `// ${theme.name} Theme Variables
// Generated from Copilot Agent Toolkit Extension

// Bot Message Colors
$bot-message-bg: ${effectiveColors.botMessageBackground};
$bot-message-text: ${effectiveColors.botMessageText};
$bot-message-border: ${effectiveColors.botMessageBorder};

// User Message Colors
$user-message-bg: ${effectiveColors.userMessageBackground};
$user-message-text: ${effectiveColors.userMessageText};
$user-message-border: ${effectiveColors.userMessageBorder};

// Chat Interface Colors
$chat-bg: ${effectiveColors.chatBackground};
$chat-border: ${effectiveColors.chatBorder};
$chat-shadow: ${effectiveColors.chatShadow};

// Input Colors
$input-bg: ${effectiveColors.inputBackground};
$input-text: ${effectiveColors.inputText};
$input-border: ${effectiveColors.inputBorder};
$input-placeholder: ${effectiveColors.inputPlaceholder};

// Button Colors
$primary-btn-bg: ${effectiveColors.primaryButtonBackground};
$primary-btn-text: ${effectiveColors.primaryButtonText};
$primary-btn-border: ${effectiveColors.primaryButtonBorder};
$secondary-btn-bg: ${effectiveColors.secondaryButtonBackground};
$secondary-btn-text: ${effectiveColors.secondaryButtonText};
$secondary-btn-border: ${effectiveColors.secondaryButtonBorder};

// Accent Colors
$accent-color: ${effectiveColors.accentColor};
$link-color: ${effectiveColors.linkColor};
$error-color: ${effectiveColors.errorColor};
$success-color: ${effectiveColors.successColor};
$warning-color: ${effectiveColors.warningColor};`;

    default:
      return '';
  }
};

export const ExportPanel: React.FC<ExportPanelProps> = ({
  theme,
  customColors,
  onExport,
  isExporting,
}) => {
  const styles = useStyles();
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'css' | 'scss'>('json');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!theme) {
    return (
      <Card>
        <CardHeader
          header={
            <div>
              <Title3>Export Theme</Title3>
              <Caption1>Select a theme to enable export options</Caption1>
            </div>
          }
        />
      </Card>
    );
  }

  const exportCode = generateExportCode(theme, customColors, selectedFormat);

  const handleCopyToClipboard = async (format: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleFormatExport = async (format: 'json' | 'css' | 'scss') => {
    setSelectedFormat(format);
    await onExport(format);
  };

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader
          header={
            <div>
              <Title3>
                <DocumentArrowDown24Regular style={{ marginRight: '8px' }} />
                Export Theme
              </Title3>
              <Caption1>Save your customized theme in various formats</Caption1>
            </div>
          }
        />
        
        <CardPreview>
          <div className={styles.exportOptions}>
            <Field label="Export Format">
              <div className={styles.formatGrid}>
                {exportFormats.map((format) => (
                  <Button
                    key={format.id}
                    className={styles.formatButton}
                    appearance={selectedFormat === format.id ? 'primary' : 'secondary'}
                    onClick={() => setSelectedFormat(format.id)}
                    disabled={isExporting}
                  >
                    <Code24Regular />
                    <Text size={200} weight="semibold">{format.name}</Text>
                  </Button>
                ))}
              </div>
            </Field>
            
            <div className={styles.actions}>
              <Button
                appearance="primary"
                icon={isExporting ? <Spinner size="tiny" /> : <DocumentArrowDown24Regular />}
                onClick={() => handleFormatExport(selectedFormat)}
                disabled={isExporting}
              >
                {isExporting ? 'Exporting...' : `Export as ${selectedFormat.toUpperCase()}`}
              </Button>
              
              <Button
                appearance="secondary"
                icon={copiedFormat === selectedFormat ? <CheckmarkCircle24Regular /> : <Copy24Regular />}
                onClick={() => handleCopyToClipboard(selectedFormat, exportCode)}
                className={copiedFormat === selectedFormat ? styles.copySuccess : ''}
              >
                {copiedFormat === selectedFormat ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>
          </div>
        </CardPreview>
      </Card>

      <Card>
        <CardHeader
          header={
            <div>
              <Title3>Code Preview</Title3>
              <Caption1>Preview the generated code before exporting</Caption1>
            </div>
          }
        />
        
        <Accordion collapsible>
          <AccordionItem value="preview">
            <AccordionHeader>
              {selectedFormat.toUpperCase()} Code Preview
            </AccordionHeader>
            <AccordionPanel>
              <div className={styles.previewSection}>
                <div className={styles.codePreview}>
                  <pre>
                    <code>
                      {exportCode}
                    </code>
                  </pre>
                </div>
                
                <div className={styles.actions}>
                  <Button
                    size="small"
                    appearance="subtle"
                    icon={copiedFormat === 'preview' ? <CheckmarkCircle24Regular /> : <Copy24Regular />}
                    onClick={() => handleCopyToClipboard('preview', exportCode)}
                    className={copiedFormat === 'preview' ? styles.copySuccess : ''}
                  >
                    {copiedFormat === 'preview' ? 'Copied!' : 'Copy Preview'}
                  </Button>
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Card>

      <MessageBar>
        <MessageBarBody>
          <Body1>
            <strong>Theme:</strong> {theme.name} • 
            <strong> Format:</strong> {selectedFormat.toUpperCase()} • 
            <strong> Colors:</strong> {Object.keys(customColors).length} customized
          </Body1>
        </MessageBarBody>
      </MessageBar>
    </div>
  );
};
