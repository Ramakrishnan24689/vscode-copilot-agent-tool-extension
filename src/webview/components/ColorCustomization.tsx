// filepath: src/webview/components/ColorCustomization.tsx
import React from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  CardHeader,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Title3,
  Caption1,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import { Settings24Regular } from '@fluentui/react-icons';
import { ColorPicker } from './ColorPicker';
import { Theme, CustomColorOverrides } from '../types';

interface ColorCustomizationProps {
  theme: Theme | null;
  customColors: CustomColorOverrides;
  onColorChange: (colorKey: string, color: string) => void;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8px',
  },
  colorSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('6px'), // Reduce gap
    ...shorthands.padding('6px', '10px', '10px'), // Reduce padding
  },
  previewNote: {
    ...shorthands.margin('4px', '10px', '8px'),
  },
});

export const ColorCustomization: React.FC<ColorCustomizationProps> = ({
  theme,
  customColors,
  onColorChange,
}) => {
  const styles = useStyles();

  if (!theme) {
    return null;
  }

  // Merge theme colors with custom overrides
  const effectiveColors = { ...theme.colors, ...customColors };

  return (
    <Card className={styles.container}>      <CardHeader
        header={
          <div>
            <Title3>
              <Settings24Regular style={{ marginRight: '8px' }} />
              Customize Colors
            </Title3>
            <Caption1>Fine-tune the colors to match your brand</Caption1>
          </div>
        }
      />
      <div style={{ maxHeight: 'calc(100vh - 300px)', overflow: 'auto' }}>
        <Accordion collapsible multiple defaultOpenItems={[]}>
          <AccordionItem value="messages">
            <AccordionHeader>Message Colors</AccordionHeader>
            <AccordionPanel>
              <div className={styles.colorSection}>
              <ColorPicker
                label="Bot Message Background"
                value={effectiveColors.botMessageBackground}
                onChange={(color) => onColorChange('botMessageBackground', color)}
              />
              <ColorPicker
                label="Bot Message Text"
                value={effectiveColors.botMessageText}
                onChange={(color) => onColorChange('botMessageText', color)}
              />
              <ColorPicker
                label="User Message Background"
                value={effectiveColors.userMessageBackground}
                onChange={(color) => onColorChange('userMessageBackground', color)}
              />
              <ColorPicker
                label="User Message Text"
                value={effectiveColors.userMessageText}
                onChange={(color) => onColorChange('userMessageText', color)}
              />
            </div>
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem value="interface">
          <AccordionHeader>Interface Colors</AccordionHeader>
          <AccordionPanel>
            <div className={styles.colorSection}>
              <ColorPicker
                label="Chat Background"
                value={effectiveColors.chatBackground}
                onChange={(color) => onColorChange('chatBackground', color)}
              />
              <ColorPicker
                label="Chat Border"
                value={effectiveColors.chatBorder}
                onChange={(color) => onColorChange('chatBorder', color)}
              />
              <ColorPicker
                label="Input Background"
                value={effectiveColors.inputBackground}
                onChange={(color) => onColorChange('inputBackground', color)}
              />
              <ColorPicker
                label="Input Text"
                value={effectiveColors.inputText}
                onChange={(color) => onColorChange('inputText', color)}
              />
            </div>
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem value="buttons">
          <AccordionHeader>Button Colors</AccordionHeader>
          <AccordionPanel>
            <div className={styles.colorSection}>
              <ColorPicker
                label="Primary Button Background"
                value={effectiveColors.primaryButtonBackground}
                onChange={(color) => onColorChange('primaryButtonBackground', color)}
              />
              <ColorPicker
                label="Primary Button Text"
                value={effectiveColors.primaryButtonText}
                onChange={(color) => onColorChange('primaryButtonText', color)}
              />
              <ColorPicker
                label="Secondary Button Background"
                value={effectiveColors.secondaryButtonBackground}
                onChange={(color) => onColorChange('secondaryButtonBackground', color)}
              />
              <ColorPicker
                label="Secondary Button Text"
                value={effectiveColors.secondaryButtonText}
                onChange={(color) => onColorChange('secondaryButtonText', color)}
              />
            </div>
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem value="accents">
          <AccordionHeader>Accent Colors</AccordionHeader>
          <AccordionPanel>
            <div className={styles.colorSection}>
              <ColorPicker
                label="Accent Color"
                value={effectiveColors.accentColor}
                onChange={(color) => onColorChange('accentColor', color)}
              />
              <ColorPicker
                label="Link Color"
                value={effectiveColors.linkColor}
                onChange={(color) => onColorChange('linkColor', color)}
              />
              <ColorPicker
                label="Error Color"
                value={effectiveColors.errorColor}
                onChange={(color) => onColorChange('errorColor', color)}
              />
              <ColorPicker
                label="Success Color"
                value={effectiveColors.successColor}
                onChange={(color) => onColorChange('successColor', color)}
              />
            </div>
          </AccordionPanel>        </AccordionItem>
      </Accordion>
      </div>
      
      <MessageBar className={styles.previewNote}>
        <MessageBarBody>
          <Caption1>Changes are applied in real-time to the preview</Caption1>
        </MessageBarBody>
      </MessageBar>
    </Card>
  );
};