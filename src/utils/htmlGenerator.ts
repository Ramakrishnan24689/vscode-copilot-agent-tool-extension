import * as vscode from 'vscode';

export interface CopilotThemeConfig {
    primary: string;
    accent: string;
    botMessage: string;
    userMessage: string;
    background: string;
    sendBox: string;
    botAvatarInitials: string;
}

export class HTMLGenerator {
      /**
     * Generates a complete HTML file for Microsoft Copilot Studio WebChat
     * that can be used as a custom canvas
     */
    static generateCopilotStudioHTML(config: CopilotThemeConfig, tokenEndpoint?: string): string {
        return `<!doctype html>
<html lang="en">
<head>
    <title>Copilot Studio Custom Canvas</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Custom styling for your Copilot Studio agent -->
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        body {
            background: ${config.background};
        }

        h1 {
            color: white;
            font-family: 'Segoe UI', system-ui, sans-serif;
            font-size: 18px;
            line-height: 24px;
            margin: 0;
            padding: 0 20px;
            font-weight: 600;
        }

        #banner {
            align-items: center;
            background: linear-gradient(135deg, ${config.primary} 0%, ${config.accent} 100%);
            display: flex;
            height: 60px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        #webchat {
            height: calc(100% - 60px);
            overflow: hidden;
            position: fixed;
            top: 60px;
            width: 100%;
            background: ${config.background};
        }

        .agent-logo {
            width: 32px;
            height: 32px;
            background: ${config.accent};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            margin-right: 12px;
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        /* Loading indicator */
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            flex-direction: column;
            color: ${config.primary};
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid ${config.primary};
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Error state */
        .error {
            padding: 20px;
            text-align: center;
            color: #d13438;
            background: #fef7f7;
            border: 1px solid #fecaca;
            border-radius: 8px;
            margin: 20px;
        }
    </style>
</head>

<body>
    <div>
        <div id="banner">
            <div class="agent-logo">${config.botAvatarInitials}</div>
            <h1>Copilot Studio Agent</h1>
        </div>
        <div id="webchat" role="main">
            <div class="loading">
                <div class="spinner"></div>
                <p>Connecting to your Copilot Studio agent...</p>
            </div>
        </div>
    </div>

    <!-- Bot Framework WebChat Latest Version -->
    <script crossorigin="anonymous" src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>

    <script>
        (async function () {
            try {
                // Custom style options for your Copilot Studio agent
                const styleOptions = {
                    // Primary brand colors
                    primaryColor: '${config.primary}',
                    accentColor: '${config.accent}',
                    
                    // Message styling  
                    bubbleBackground: '${config.botMessage}',
                    bubbleFromUserBackground: '${config.userMessage}',
                    bubbleFromUserTextColor: '#FFFFFF',
                    bubbleTextColor: '#323130',
                    
                    // Avatar customization
                    botAvatarBackgroundColor: '${config.primary}',
                    botAvatarInitials: '${config.botAvatarInitials}',
                    userAvatarBackgroundColor: '${config.accent}',
                    
                    // Interface styling
                    backgroundColor: '${config.background}',
                    sendBoxBackground: '${config.background}',
                    sendBoxButtonColor: '${config.sendBox}',
                    sendBoxButtonColorOnFocus: '${config.accent}',
                    sendBoxButtonColorOnHover: '${config.accent}',
                    sendBoxTextColor: '#323130',
                    
                    // Typography
                    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
                    fontSize: 14,
                    
                    // Clean interface
                    hideUploadButton: true,
                    hideSendBox: false
                };                // Replace with your actual token endpoint from Copilot Studio
                // Go to Settings -> Channels -> Email to get your token endpoint
                const tokenEndpointString = '${tokenEndpoint || 'YOUR_TOKEN_ENDPOINT_HERE'}';
                
                if (tokenEndpointString === 'YOUR_TOKEN_ENDPOINT_HERE') {
                    throw new Error('Please replace YOUR_TOKEN_ENDPOINT_HERE with your actual Copilot Studio token endpoint.');
                }
                
                const tokenEndpointURL = new URL(tokenEndpointString);

                // Set locale (recommended to match page language)
                const locale = document.documentElement.lang || 'en';
                const apiVersion = tokenEndpointURL.searchParams.get('api-version');

                // Fetch DirectLine configuration and token
                const [directLineURL, token] = await Promise.all([
                    fetch(new URL(\`/powervirtualagents/regionalchannelsettings?api-version=\${apiVersion}\`, tokenEndpointURL))
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to retrieve regional channel settings.');
                            }
                            return response.json();
                        })
                        .then(({ channelUrlsById: { directline } }) => directline),
                    fetch(tokenEndpointURL)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to retrieve Direct Line token.');
                            }
                            return response.json();
                        })
                        .then(({ token }) => token)
                ]);

                // Create DirectLine connection
                const directLine = WebChat.createDirectLine({ 
                    domain: new URL('v3/directline', directLineURL), 
                    token 
                });

                // Send start conversation event when connected
                const subscription = directLine.connectionStatus$.subscribe({
                    next(value) {
                        if (value === 2) { // Connected
                            directLine
                                .postActivity({
                                    localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                    locale,
                                    name: 'startConversation',
                                    type: 'event'
                                })
                                .subscribe();

                            // Unsubscribe after sending the event
                            subscription.unsubscribe();
                        }
                    }
                });

                // Render WebChat with custom styling
                WebChat.renderWebChat(
                    { 
                        directLine, 
                        locale, 
                        styleOptions 
                    }, 
                    document.getElementById('webchat')
                );

                // Hide loading indicator
                document.querySelector('.loading').style.display = 'none';

            } catch (error) {
                console.error('Failed to initialize WebChat:', error);
                
                // Show error message
                document.getElementById('webchat').innerHTML = \`
                    <div class="error">
                        <h3>⚠️ Configuration Required</h3>
                        <p><strong>Error:</strong> \${error.message}</p>
                        <p>Please update the token endpoint in this HTML file with your actual Copilot Studio token endpoint.</p>
                        <p><strong>To get your token endpoint:</strong></p>
                        <ol style="text-align: left; display: inline-block;">
                            <li>Go to your Copilot Studio environment</li>
                            <li>Navigate to Settings → Channels</li>
                            <li>Select Email channel</li>
                            <li>Copy the Token Endpoint</li>
                            <li>Replace YOUR_TOKEN_ENDPOINT_HERE in this HTML file</li>
                        </ol>
                    </div>
                \`;
            }
        })();
    </script>
</body>
</html>`;
    }

    /**
     * Generates a standalone demo HTML file with mock data
     * Useful for testing themes without requiring a Copilot Studio connection
     */
    static generateDemoHTML(config: CopilotThemeConfig): string {
        return `<!doctype html>
<html lang="en">
<head>
    <title>Copilot Studio Theme Demo</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <style>
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        body {
            background: ${config.background};
        }

        #banner {
            align-items: center;
            background: linear-gradient(135deg, ${config.primary} 0%, ${config.accent} 100%);
            display: flex;
            height: 60px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            color: white;
            padding: 0 20px;
        }

        .agent-logo {
            width: 32px;
            height: 32px;
            background: ${config.accent};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            margin-right: 12px;
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        #webchat {
            height: calc(100% - 60px);
            width: 100%;
        }
    </style>
</head>

<body>
    <div>
        <div id="banner">
            <div class="agent-logo">${config.botAvatarInitials}</div>
            <h1>Copilot Studio Theme Demo</h1>
        </div>
        <div id="webchat" role="main"></div>
    </div>

    <!-- React and ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Bot Framework WebChat -->
    <script crossorigin src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>

    <script>
        // Demo mode with mock data
        const mockActivities = [
            {
                type: 'message',
                from: { id: 'bot', name: 'Copilot Studio Bot' },
                text: 'Hello! I\\'m your Copilot Studio assistant. This is a demo of your custom theme.',
                timestamp: new Date().toISOString()
            },
            {
                type: 'message',
                from: { id: 'user', name: 'User' },
                text: 'The colors look great! Can you tell me more about the theme?',
                timestamp: new Date().toISOString()
            },
            {
                type: 'message',
                from: { id: 'bot', name: 'Copilot Studio Bot' },
                text: 'This theme uses your custom color palette: Primary (${config.primary}), Accent (${config.accent}), and coordinated message colors. The design follows Microsoft Copilot Studio guidelines for optimal user experience.',
                timestamp: new Date().toISOString()
            }
        ];

        // Mock DirectLine for demo
        const mockDirectLine = {
            activity$: {
                subscribe: () => {},
                next: () => {}
            },
            postActivity: () => ({ subscribe: () => {} }),
            end: () => {}
        };

        // Theme style options
        const styleOptions = {
            primaryColor: '${config.primary}',
            accentColor: '${config.accent}',
            bubbleBackground: '${config.botMessage}',
            bubbleFromUserBackground: '${config.userMessage}',
            bubbleFromUserTextColor: '#FFFFFF',
            bubbleTextColor: '#323130',
            botAvatarBackgroundColor: '${config.primary}',
            botAvatarInitials: '${config.botAvatarInitials}',
            userAvatarBackgroundColor: '${config.accent}',
            backgroundColor: '${config.background}',
            sendBoxBackground: '${config.background}',
            sendBoxButtonColor: '${config.sendBox}',
            sendBoxButtonColorOnFocus: '${config.accent}',
            sendBoxButtonColorOnHover: '${config.accent}',
            sendBoxTextColor: '#323130',
            fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
            fontSize: 14,
            hideUploadButton: true
        };

        // Render demo WebChat
        WebChat.renderWebChat(
            {
                directLine: mockDirectLine,
                styleOptions: styleOptions,
                activities: mockActivities
            },
            document.getElementById('webchat')
        );
    </script>
</body>
</html>`;
    }
}
