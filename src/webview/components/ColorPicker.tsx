// filepath: src/webview/components/ColorPicker.tsx
import React, { useState, useRef } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Label,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Text,
} from '@fluentui/react-components';
import { ColorPickerProps } from '../types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('6px'),
  },
  colorDisplay: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  colorSwatch: {
    width: '32px',
    height: '32px',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: tokens.shadow4,
    },
  },
  colorInput: {
    flex: 1,
    fontFamily: 'monospace',
  },
  colorPicker: {
    ...shorthands.padding('16px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('12px'),
    minWidth: '200px',
  },
  presetColors: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    ...shorthands.gap('4px'),
  },
  presetSwatch: {
    width: '24px',
    height: '24px',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  nativeInput: {
    width: '100%',
    height: '40px',
    ...shorthands.border('none'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    cursor: 'pointer',
  },
});

const presetColors = [
  '#0078D4', '#005A9E', '#6264A7', '#464775',
  '#2E8B57', '#228B22', '#4A90E2', '#357ABD',
  '#DC3545', '#C4314B', '#28A745', '#10893E',
  '#FFC107', '#F7630C', '#6C757D', '#495057',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  const isValidHex = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    if (isValidHex(newValue)) {
      onChange(newValue);
    }
  };

  const handleInputBlur = () => {
    if (!isValidHex(inputValue)) {
      setInputValue(value); // Reset to valid value
    }
  };

  const handleColorSelect = (color: string) => {
    setInputValue(color);
    onChange(color);
    setIsOpen(false);
  };

  const handleNativeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setInputValue(newColor);
    onChange(newColor);
  };

  return (
    <div className={styles.container}>
      <Label size="small" weight="semibold" disabled={disabled}>
        {label}
      </Label>
      
      <div className={styles.colorDisplay}>
        <Popover
          open={isOpen}
          onOpenChange={(_, data) => setIsOpen(data.open)}
        >
          <PopoverTrigger disableButtonEnhancement>
            <div
              className={styles.colorSwatch}
              style={{ backgroundColor: value }}
              onClick={() => !disabled && setIsOpen(true)}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`Select color for ${label}`}
            />
          </PopoverTrigger>
          
          <PopoverSurface>
            <div className={styles.colorPicker}>
              <Text size={300} weight="semibold">Choose Color</Text>
              
              {/* Native color picker */}
              <input
                ref={nativeInputRef}
                type="color"
                value={value}
                onChange={handleNativeColorChange}
                className={styles.nativeInput}
                disabled={disabled}
              />
              
              {/* Preset colors */}
              <div>
                <Text size={200} weight="medium">Preset Colors</Text>
                <div className={styles.presetColors}>
                  {presetColors.map((color) => (
                    <div
                      key={color}
                      className={styles.presetSwatch}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PopoverSurface>
        </Popover>
        
        <Input
          className={styles.colorInput}
          value={inputValue}
          onChange={(_, data) => handleInputChange(data.value)}
          onBlur={handleInputBlur}
          placeholder="#000000"
          disabled={disabled}
          size="small"
        />
      </div>
    </div>
  );
};
