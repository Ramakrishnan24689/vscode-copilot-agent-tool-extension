// filepath: src/webview/components/ThemeGallery.tsx
import React from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Text,
  Spinner,
  Body1,
  Caption1,
  Title3,
} from '@fluentui/react-components';
import { ThemeGalleryProps } from '../types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    marginBottom: '4px',
  },  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    ...shorthands.gap('10px'),
    maxHeight: '280px', /* Slightly reduced height */
    overflow: 'auto',
    ...shorthands.padding('4px'), /* Add padding inside gallery */
  },  themeCard: {
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    ...shorthands.border('2px', 'solid', 'transparent'),
    height: '120px', /* Increased for better content spacing */
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden', /* Ensure content doesn't overflow */
    borderRadius: '8px', /* Consistent border radius */
    boxShadow: tokens.shadow4, /* Add subtle shadow */
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow16,
    },
  },
  selectedCard: {
    ...shorthands.border('2px', 'solid', tokens.colorBrandBackground),
    boxShadow: tokens.shadow16,
    transform: 'translateY(-1px)',
  },  cardHeader: {
    height: '32px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  cardContent: {
    ...shorthands.padding('10px', '8px'),
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 0, /* Allow content to shrink */
    backgroundColor: tokens.colorNeutralBackground1,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '2px',
    fontSize: '12px',
    lineHeight: '1.2',
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: '10px', /* Even smaller text for better fit */
    lineHeight: '1.1',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    marginTop: 'auto', /* Push to bottom */
  },tags: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('4px'),
    marginTop: '6px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
    color: tokens.colorNeutralForeground2,
  },
});

export const ThemeGallery: React.FC<ThemeGalleryProps> = ({
  themes,
  selectedTheme,
  onSelectTheme,
  isLoading,
}) => {
  const styles = useStyles();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <Body1>Loading themes...</Body1>
      </div>
    );
  }

  if (themes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text size={600}>🎨</Text>
        <Body1>No themes found</Body1>
        <Caption1>Try adjusting your search criteria</Caption1>
      </div>
    );
  }
  return (
    <div className={styles.container}>      <div className={styles.header}>
        <Title3>🎨 Theme Gallery</Title3>
        <br />
        <Caption1>Choose a theme to get started</Caption1>
      </div><div className={styles.gallery}>
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`${styles.themeCard} ${
              selectedTheme?.id === theme.id ? styles.selectedCard : ''
            }`}
            onClick={() => onSelectTheme(theme)}          >
            {/* Beautiful gradient header with theme colors */}
            <div 
              className={styles.cardHeader}
              style={{
                background: `linear-gradient(135deg, ${theme.colors.botMessageBackground} 0%, ${theme.colors.accentColor} 100%)`,
                color: theme.colors.botMessageText,
                fontWeight: 600,
                fontSize: '11px',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                borderBottom: `1px solid ${theme.colors.accentColor}30`,
              }}
            >
              {theme.name}
            </div>
            
            {/* Content area with accent color square and theme info */}
            <div 
              className={styles.cardContent}
              style={{
                backgroundColor: theme.colors.chatBackground,
                background: `linear-gradient(180deg, ${theme.colors.chatBackground} 0%, ${theme.colors.inputBackground} 100%)`,
              }}
            >              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '6px'
              }}>
                {/* Four-square color palette - shows 4 key theme colors */}
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    flexShrink: 0,
                  }}
                  title="Theme color palette"
                >
                  {/* Accent Color - Top Left */}
                  <div 
                    style={{ 
                      backgroundColor: theme.colors.accentColor,
                      borderRight: '0.5px solid rgba(255,255,255,0.2)',
                      borderBottom: '0.5px solid rgba(255,255,255,0.2)',
                    }} 
                    title={`Accent: ${theme.colors.accentColor}`}
                  />
                  
                  {/* Send Button - Top Right */}
                  <div 
                    style={{ 
                      backgroundColor: theme.colors.primaryButtonBackground,
                      borderLeft: '0.5px solid rgba(255,255,255,0.2)',
                      borderBottom: '0.5px solid rgba(255,255,255,0.2)',
                    }} 
                    title={`Send Button: ${theme.colors.primaryButtonBackground}`}
                  />
                  
                  {/* Bot Message - Bottom Left */}
                  <div 
                    style={{ 
                      backgroundColor: theme.colors.botMessageBackground,
                      borderRight: '0.5px solid rgba(255,255,255,0.2)',
                      borderTop: '0.5px solid rgba(255,255,255,0.2)',
                    }} 
                    title={`Bot Message: ${theme.colors.botMessageBackground}`}
                  />
                  
                  {/* User Message - Bottom Right */}
                  <div 
                    style={{ 
                      backgroundColor: theme.colors.userMessageBackground,
                      borderLeft: '0.5px solid rgba(255,255,255,0.2)',
                      borderTop: '0.5px solid rgba(255,255,255,0.2)',
                    }} 
                    title={`User Message: ${theme.colors.userMessageBackground}`}
                  />
                </div>
                
                {/* Theme category */}
                <div 
                  style={{ 
                    color: theme.colors.inputText,
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {theme.category}
                </div>
              </div>
                {/* Theme description */}
              <div 
                className={styles.description}
                style={{ 
                  color: theme.colors.inputPlaceholder,
                  fontSize: '9px',
                  lineHeight: '1.2',
                  marginBottom: '6px',
                }}
              >
                <Caption1>{theme.description}</Caption1>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
