// filepath: src/webview/hooks/useVSCodeAPI.ts
import { useState, useCallback, useEffect } from 'react';
import { VSCodeMessage, Notification } from '../types';

declare global {
  interface Window {
    acquireVsCodeApi(): {
      postMessage: (message: any) => void;
      setState: (state: any) => void;
      getState: () => any;
    };
  }
}

export const useVSCodeAPI = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [vscode] = useState(() => {
    try {
      return window.acquireVsCodeApi();
    } catch (error) {
      console.warn('VS Code API not available, running in development mode');
      return {
        postMessage: (message: any) => {
          console.log('Mock VS Code message:', message);
        },
        setState: (state: any) => {
          console.log('Mock VS Code setState:', state);
        },
        getState: () => {
          console.log('Mock VS Code getState');
          return {};
        },
      };
    }
  });

  const sendMessage = useCallback(
    (message: VSCodeMessage): Promise<void> => {
      return new Promise((resolve, reject) => {
        try {
          vscode.postMessage(message);
          // In a real implementation, we'd wait for a response
          // For now, we'll just resolve immediately
          setTimeout(resolve, 100);
        } catch (error) {
          reject(error);
        }
      });
    },
    [vscode]
  );

  const showNotification = useCallback(
    (message: string, type: Notification['type']) => {
      if (!message) {
        setNotification(null);
        return;
      }
      
      setNotification({ message, type });
      
      // Auto-dismiss notifications after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    },
    []
  );

  const saveState = useCallback(
    (state: any) => {
      try {
        vscode.setState(state);
      } catch (error) {
        console.warn('Failed to save state:', error);
      }
    },
    [vscode]
  );

  const getState = useCallback(() => {
    try {
      return vscode.getState() || {};
    } catch (error) {
      console.warn('Failed to get state:', error);
      return {};
    }
  }, [vscode]);

  // Listen for messages from the extension
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      
      switch (message.command) {
        case 'showNotification':
          showNotification(message.text, message.type);
          break;
        case 'setState':
          // Handle state updates from the extension
          break;
        default:
          console.log('Received unknown message:', message);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [showNotification]);

  return {
    sendMessage,
    showNotification,
    notification,
    saveState,
    getState,
    vscode,
  };
};
