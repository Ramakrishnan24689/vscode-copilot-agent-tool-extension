// filepath: src/webview/components/WebChatPreview.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Body1,
  Spinner,
  Button,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import { Warning24Regular, Chat24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    position: 'relative',
  },
  webChatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '4px',
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '4px',
  },
  errorContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
    backgroundColor: tokens.colorPaletteRedBackground2,
    border: `1px solid ${tokens.colorPaletteRedBorder2}`,
    borderRadius: '4px',
    ...shorthands.padding('24px'),
  },
  mockPreviewContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '4px',
    overflow: 'hidden',
  },
  mockHeader: {
    ...shorthands.padding('12px'),
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  mockChatArea: {
    flex: 1,
    ...shorthands.padding('16px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('12px'),
    overflow: 'auto',
  },
  mockMessage: {
    maxWidth: '80%',
    ...shorthands.padding('8px', '12px'),
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  botMessage: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    alignSelf: 'flex-end',
  },
  inputArea: {
    ...shorthands.padding('12px'),
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  mockInput: {
    flex: 1,
    ...shorthands.padding('8px', '12px'),
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '4px',
    fontSize: '14px',
  },
});

export interface WebChatPreviewProps {
  directLineTokenEndpoint?: string;
  useMockDirectLine: boolean;
  styleOptions: any;
}

export const WebChatPreview: React.FC<WebChatPreviewProps> = ({
  directLineTokenEndpoint,
  useMockDirectLine,
  styleOptions,
}) => {
  const styles = useStyles();
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error' | 'mock'>('loading');
  const [webChatComponent, setWebChatComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const loadWebChat = async () => {
      try {
        // Always show mock for now to avoid crashes
        if (useMockDirectLine) {
          setLoadingState('mock');
          return;
        }

        // Try to dynamically load botframework-webchat
        setLoadingState('loading');
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, fall back to mock if not using mock DirectLine
        // This prevents the extension from crashing
        setLoadingState('mock');
        
        // TODO: Implement actual WebChat loading with proper error handling
        // const ReactWebChat = await import('botframework-webchat');
        // setWebChatComponent(() => ReactWebChat.default);
        // setLoadingState('loaded');
        
      } catch (error) {
        console.error('Failed to load WebChat:', error);
        setLoadingState('error');
      }
    };

    loadWebChat();
  }, [useMockDirectLine, directLineTokenEndpoint]);

  const retryLoading = () => {
    setLoadingState('loading');
    // Try again with mock
    setTimeout(() => {
      setLoadingState('mock');
    }, 1000);
  };

  if (loadingState === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <Body1>Loading WebChat Preview...</Body1>
      </div>
    );
  }

  if (loadingState === 'error') {
    return (
      <div className={styles.errorContainer}>
        <Warning24Regular />
        <Body1>Failed to load WebChat preview</Body1>
        <Button onClick={retryLoading}>Retry</Button>
        <MessageBar>
          <MessageBarBody>
            WebChat preview is temporarily unavailable. You can still customize themes and export configurations.
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }

  // Show mock preview
  return (
    <div className={styles.container}>
      <div className={styles.mockPreviewContainer}>
        <div className={styles.mockHeader}>
          <Chat24Regular />
          <Body1>WebChat Preview (Mock)</Body1>
        </div>
        
        <div className={styles.mockChatArea} style={{
          backgroundColor: styleOptions.backgroundColor || tokens.colorNeutralBackground1,
        }}>
          <div 
            className={`${styles.mockMessage} ${styles.botMessage}`}
            style={{
              backgroundColor: styleOptions.bubbleBackground || styleOptions.botMessageBackground || tokens.colorBrandBackground2,
              color: styleOptions.bubbleTextColor || styleOptions.botMessageTextColor || tokens.colorBrandForeground2,
            }}
          >
            👋 Hello! I'm your Copilot assistant. How can I help you today?
          </div>
          
          <div 
            className={`${styles.mockMessage} ${styles.userMessage}`}
            style={{
              backgroundColor: styleOptions.bubbleFromUserBackground || styleOptions.userMessageBackground || tokens.colorNeutralBackground3,
              color: styleOptions.bubbleFromUserTextColor || styleOptions.userMessageTextColor || tokens.colorNeutralForeground1,
            }}
          >
            Can you help me with my project?
          </div>
          
          <div 
            className={`${styles.mockMessage} ${styles.botMessage}`}
            style={{
              backgroundColor: styleOptions.bubbleBackground || styleOptions.botMessageBackground || tokens.colorBrandBackground2,
              color: styleOptions.bubbleTextColor || styleOptions.botMessageTextColor || tokens.colorBrandForeground2,
            }}
          >
            Absolutely! I'd be happy to help with your project. What specific area would you like assistance with?
          </div>
        </div>
        
        <div 
          className={styles.inputArea}
          style={{
            backgroundColor: styleOptions.sendBoxBackground || tokens.colorNeutralBackground2,
          }}
        >
          <input 
            className={styles.mockInput}
            placeholder="Type a message..."
            style={{
              backgroundColor: styleOptions.sendBoxBackground || tokens.colorNeutralBackground1,
              color: styleOptions.sendBoxTextColor || tokens.colorNeutralForeground1,
              borderColor: styleOptions.sendBoxBorderColor || tokens.colorNeutralStroke2,
            }}
            disabled
          />
          <Button 
            appearance="primary"
            style={{
              backgroundColor: styleOptions.sendBoxButtonColor || styleOptions.accent || tokens.colorBrandBackground,
              color: tokens.colorNeutralForegroundOnBrand,
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
