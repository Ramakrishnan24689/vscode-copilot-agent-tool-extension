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
    minHeight: 0, // Allow flex item to shrink below content size
    position: 'relative',
    overflow: 'hidden',
  },  webChatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0, // Allow flex item to shrink below content size
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: '4px',
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: 'hidden',
    position: 'relative',
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
  const [isUpdatingStyles, setIsUpdatingStyles] = useState(false);  const [webChatComponent, setWebChatComponent] = useState<React.ComponentType<any> | null>(null);
  const [directLine, setDirectLine] = useState<any>(null);
  const webChatInstanceRef = useRef<any>(null);
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const styleOptionsRef = useRef<any>(styleOptions);const mountedRef = useRef<boolean>(false);

  // Log component props on mount and updates
  useEffect(() => {
    console.log('WebChatPreview rendered with props:', { 
      directLineTokenEndpoint, 
      useMockDirectLine, 
      styleOptionsKeys: Object.keys(styleOptions || {})
    });
    
    // Mark component as mounted
    mountedRef.current = true;
    
    return () => {
      console.log('WebChatPreview unmounting');
      mountedRef.current = false;
    };
  }, [directLineTokenEndpoint, useMockDirectLine, styleOptions]);

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
    };    loadWebChat();
  }, [useMockDirectLine, directLineTokenEndpoint]);  
    // Handle style updates for WebChat
  const updateWebChatStyles = useCallback(() => {
    if (!webChatInstanceRef.current) {
      console.log('No WebChat instance to update');
      return;
    }
    
    console.log('Updating WebChat styles:', styleOptionsRef.current);
    setIsUpdatingStyles(true);
    
    // Clear the updating indicator after a brief delay
    setTimeout(() => {
      setIsUpdatingStyles(false);
    }, 300);
  }, []);
    // Initial WebChat setup - only runs once when loaded
  useEffect(() => {
    console.log('Initial setup effect triggered:', { 
      hasWebChatComponent: !!webChatComponent, 
      hasDirectLine: !!directLine, 
      loadingState, 
      hasWebChatInstance: !!webChatInstanceRef.current,
      isMounted: mountedRef.current
    });
    
    if (!mountedRef.current) {
      console.log('Component not mounted, skipping initial setup');
      return;
    }
    
    if (webChatComponent && directLine && loadingState === 'loaded' && !webChatInstanceRef.current) {
      console.log('All conditions met, marking WebChat as ready');
      webChatInstanceRef.current = true;
    }
  }, [webChatComponent, directLine, loadingState]);    // Update style options with debouncing
  useEffect(() => {
    console.log('Style update effect triggered:', { 
      hasWebChatInstance: !!webChatInstanceRef.current, 
      loadingState, 
      styleOptionsKeys: Object.keys(styleOptions || {}),
      isMounted: mountedRef.current
    });
    
    if (!mountedRef.current) {
      console.log('Component not mounted, skipping style update');
      return;
    }
    
    if (webChatInstanceRef.current && loadingState === 'loaded') {
      // Clear existing timeout
      if (renderTimeoutRef.current) {
        console.log('Clearing existing render timeout');
        clearTimeout(renderTimeoutRef.current);
      }
      
      // Set new timeout for debounced update
      console.log('Setting new render timeout (150ms)');
      renderTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          console.log('Style timeout fired, updating WebChat styles');
          updateWebChatStyles();
        } else {
          console.log('Component unmounted before timeout fired, skipping style update');
        }
      }, 150); // 150ms debounce
      
      return () => {
        if (renderTimeoutRef.current) {
          console.log('Cleanup: clearing render timeout');
          clearTimeout(renderTimeoutRef.current);
          renderTimeoutRef.current = null;
        }
      };
    }
  }, [styleOptions, loadingState, updateWebChatStyles]);
  
  const retryLoading = () => {
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
  }  return (
    <div className={styles.container}>
      <div className={styles.webChatContainer}>
        {webChatComponent && directLine && React.createElement(webChatComponent, {
          directLine: directLine,
          styleOptions: {
            ...styleOptionsRef.current,
            // Ensure the WebChat takes full height of container
            height: '100%',
          }
        })}
        {isUpdatingStyles && (
          <div className={styles.updatingOverlay}>
            <Spinner size="medium" />
          </div>
        )}
      </div>
    </div>
  );
};
