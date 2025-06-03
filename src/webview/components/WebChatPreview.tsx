// filepath: src/webview/components/WebChatPreview.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { MockDirectLine, defaultMockActivities } from '../utils/MockDirectLine';

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    maxHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
  },  webChatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '400px', // Minimum height to prevent collapse
    maxHeight: '100%',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '4px',
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: 'hidden',
    position: 'relative', // Ensure proper positioning
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
  updatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    borderRadius: '4px',
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
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isUpdatingStyles, setIsUpdatingStyles] = useState(false);
  const [webChatComponent, setWebChatComponent] = useState<React.ComponentType<any> | null>(null);  const [directLine, setDirectLine] = useState<any>(null);  const webChatRef = useRef<HTMLDivElement>(null);
  const webChatInstanceRef = useRef<any>(null);
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const styleOptionsRef = useRef<any>(styleOptions);

  // Update the ref whenever styleOptions changes
  useEffect(() => {
    styleOptionsRef.current = styleOptions;
  }, [styleOptions]);

  useEffect(() => {
    const loadWebChat = async () => {
      try {
        setLoadingState('loading');
        
        // Dynamically import botframework-webchat
        const WebChatModule = await import('botframework-webchat');
        const ReactWebChat = WebChatModule.default;
        
        let directLineInstance: any;
        
        if (useMockDirectLine) {
          // Use MockDirectLine for development/preview
          directLineInstance = new MockDirectLine(defaultMockActivities);
        } else {
          // Use real DirectLine connection
          if (!directLineTokenEndpoint) {
            throw new Error('DirectLine token endpoint is required for real connections');
          }
          
          // Fetch token from the provided endpoint
          const response = await fetch(directLineTokenEndpoint);
          if (!response.ok) {
            throw new Error('Failed to retrieve DirectLine token');
          }
          
          const { token } = await response.json();
          directLineInstance = WebChatModule.createDirectLine({ token });
        }
        
        setDirectLine(directLineInstance);
        setWebChatComponent(() => ReactWebChat);
        setLoadingState('loaded');
        
      } catch (error) {
        console.error('Failed to load WebChat:', error);
        setLoadingState('error');
      }
    };

    loadWebChat();
  }, [useMockDirectLine, directLineTokenEndpoint]);  // Debounced WebChat render function
  const debouncedRenderWebChat = useCallback(async (showUpdateIndicator = false) => {
    console.log('🔄 debouncedRenderWebChat called:', { 
      showUpdateIndicator, 
      hasWebChatRef: !!webChatRef.current, 
      hasDirectLine: !!directLine,
      styleOptionsKeys: Object.keys(styleOptionsRef.current || {})
    });
    
    if (!webChatRef.current || !directLine) {
      console.log('❌ Early return: missing webChatRef or directLine');
      return;
    }
    
    try {
      if (showUpdateIndicator) {
        console.log('🔄 Setting updating styles indicator');
        setIsUpdatingStyles(true);
      }
      
      const WebChatModule = await import('botframework-webchat');
      
      // Store current scroll position to restore later
      const scrollContainer = webChatRef.current.querySelector('[data-testid="transcript"]');
      const scrollTop = scrollContainer?.scrollTop || 0;
      
      // Clear and re-render with new styles
      console.log('🎨 Rendering WebChat with styles:', styleOptionsRef.current);
      webChatRef.current.innerHTML = '';
      
      WebChatModule.renderWebChat(
        {
          directLine,
          styleOptions: {
            ...styleOptionsRef.current,
            // Ensure proper container sizing
            rootHeight: '100%',
            rootWidth: '100%',
          },
        },
        webChatRef.current
      );
      
      console.log('✅ WebChat rendered successfully');
      
      // Restore scroll position after a brief delay
      setTimeout(() => {
        const newScrollContainer = webChatRef.current?.querySelector('[data-testid="transcript"]');
        if (newScrollContainer) {
          newScrollContainer.scrollTop = scrollTop;
        }
        setIsUpdatingStyles(false);
        console.log('📍 Scroll position restored and updating indicator cleared');
      }, 100);
      
    } catch (error) {
      console.error('❌ Failed to render WebChat:', error);
      setLoadingState('error');
      setIsUpdatingStyles(false);
    }
  }, [directLine]);  // Initial WebChat render - only runs once when loaded
  useEffect(() => {
    console.log('🚀 Initial render effect triggered:', { 
      hasWebChatComponent: !!webChatComponent, 
      hasDirectLine: !!directLine, 
      hasWebChatRef: !!webChatRef.current, 
      loadingState, 
      hasWebChatInstance: !!webChatInstanceRef.current 
    });
    
    if (webChatComponent && directLine && webChatRef.current && loadingState === 'loaded' && !webChatInstanceRef.current) {
      console.log('✅ All conditions met, calling initial render');
      debouncedRenderWebChat(false);
      webChatInstanceRef.current = true;
    }
  }, [webChatComponent, directLine, loadingState, debouncedRenderWebChat]);// Update style options with debouncing
  useEffect(() => {
    console.log('🎨 Style update effect triggered:', { 
      hasWebChatInstance: !!webChatInstanceRef.current, 
      loadingState, 
      styleOptionsKeys: Object.keys(styleOptions || {})
    });
    
    if (webChatInstanceRef.current && loadingState === 'loaded') {
      // Clear existing timeout
      if (renderTimeoutRef.current) {
        console.log('⏰ Clearing existing render timeout');
        clearTimeout(renderTimeoutRef.current);
      }
      
      // Set new timeout for debounced update
      console.log('⏰ Setting new render timeout (150ms)');
      renderTimeoutRef.current = setTimeout(() => {
        console.log('⏰ Render timeout fired, calling debouncedRenderWebChat');
        debouncedRenderWebChat(true); // Show update indicator
      }, 150); // 150ms debounce
      
      return () => {
        if (renderTimeoutRef.current) {
          console.log('🧹 Cleanup: clearing render timeout');
          clearTimeout(renderTimeoutRef.current);
        }
      };
    }
  }, [styleOptions, loadingState, debouncedRenderWebChat]);const retryLoading = () => {
    setLoadingState('loading');
    setWebChatComponent(null);
    setDirectLine(null);
    webChatInstanceRef.current = null;
    setIsUpdatingStyles(false);
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
      renderTimeoutRef.current = null;
    }
  };

  if (loadingState === 'loading') {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
        <Body1>
          {useMockDirectLine 
            ? 'Loading WebChat Preview (Mock Mode)...' 
            : 'Connecting to DirectLine...'}
        </Body1>
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
            {useMockDirectLine 
              ? 'Error loading WebChat component. Please check console for details.'
              : 'Failed to connect to DirectLine. Please verify your token endpoint.'}
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.webChatContainer} ref={webChatRef}>
        {/* WebChat will be rendered here by the botframework-webchat library */}
        {isUpdatingStyles && (
          <div className={styles.updatingOverlay}>
            <Spinner size="medium" />
          </div>
        )}
      </div>
    </div>
  );
};
