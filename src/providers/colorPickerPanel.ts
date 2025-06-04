import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class ColorPickerPanel {
    public static currentPanel: ColorPickerPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (ColorPickerPanel.currentPanel) {
            ColorPickerPanel.currentPanel._panel.reveal(column);
            return;        }        const panel = vscode.window.createWebviewPanel(
            'copilotAgentToolsThemeGallery',
            'Copilot Agent Toolkit',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, 'out'),
                    vscode.Uri.joinPath(extensionUri, 'media')
                ]
            }
        );

        ColorPickerPanel.currentPanel = new ColorPickerPanel(panel, extensionUri);
    }

    private constructor(
        panel: vscode.WebviewPanel,
        private _extensionUri: vscode.Uri
    ) {
        this._panel = panel;
        this._update();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {                    case 'getLogo':
                        // Send the logo URI back to the webview
                        const logoUri = this._panel.webview.asWebviewUri(
                            vscode.Uri.joinPath(this._extensionUri, 'media', 'icon.png')
                        );
                        this._panel.webview.postMessage({
                            command: 'logoUri',
                            uri: logoUri.toString()
                        });
                        return;
                    case 'applyColor':
                    case 'applyTheme':
                        // Send the message to the command handler via VS Code command
                        vscode.commands.executeCommand('copilotAgentTools.applyColorFromWebview', message);
                        return;
                    case 'exportTheme':
                        // Handle theme export (JSON, CSS, SCSS)
                        this._handleThemeExport(message);
                        return;
                    case 'saveTheme':
                        // Handle saving custom theme
                        this._handleSaveTheme(message);
                        return;
                    case 'loadThemes':
                        // Handle loading themes (if needed from external source)
                        this._handleLoadThemes(message);
                        return;
                    case 'exportJson':
                        // Legacy JSON export support
                        this._handleJsonExport(message.json, message.formattedJson);
                        return;
                    case 'exportHtml':
                        // Handle HTML export
                        vscode.commands.executeCommand('copilotAgentTools.exportHtmlFromWebview', message);
                        return;
                    case 'previewHtml':
                        // Handle HTML preview
                        vscode.commands.executeCommand('copilotAgentTools.previewHtmlFromWebview', message);
                        return;
                    case 'showInfo':
                        vscode.window.showInformationMessage(message.message);
                        return;
                    case 'showError':
                        vscode.window.showErrorMessage(message.message);
                        return;
                }
            },
            null,
            this._disposables
        );
    }

    public dispose() {
        ColorPickerPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }    }

    private async _handleThemeExport(message: any) {
        try {
            const { theme, customColors, format } = message;
            const effectiveColors = { ...theme.colors, ...customColors };
            
            let content = '';
            let defaultFileName = '';
            let fileExtension = '';
            
            switch (format) {
                case 'json':
                    content = JSON.stringify({
                        name: theme.name,
                        description: theme.description,
                        category: theme.category,
                        colors: effectiveColors,
                        metadata: {
                            exportedAt: new Date().toISOString(),
                            extensionVersion: '1.0.0',
                        },
                    }, null, 2);
                    defaultFileName = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
                    fileExtension = 'json';
                    break;
                    
                case 'css':
                    content = `:root {
  /* ${theme.name} - ${theme.description} */
  
  /* Bot Message Colors */
  --mcs-bot-message-bg: ${effectiveColors.botMessageBackground};
  --mcs-bot-message-text: ${effectiveColors.botMessageText};
  --mcs-bot-message-border: ${effectiveColors.botMessageBorder};
  
  /* User Message Colors */
  --mcs-user-message-bg: ${effectiveColors.userMessageBackground};
  --mcs-user-message-text: ${effectiveColors.userMessageText};
  --mcs-user-message-border: ${effectiveColors.userMessageBorder};
  
  /* Chat Interface Colors */
  --mcs-chat-bg: ${effectiveColors.chatBackground};
  --mcs-chat-border: ${effectiveColors.chatBorder};
  --mcs-chat-shadow: ${effectiveColors.chatShadow};
  
  /* Input Area Colors */
  --mcs-input-bg: ${effectiveColors.inputBackground};
  --mcs-input-text: ${effectiveColors.inputText};
  --mcs-input-border: ${effectiveColors.inputBorder};
  --mcs-input-placeholder: ${effectiveColors.inputPlaceholder};
  
  /* Button Colors */
  --mcs-primary-btn-bg: ${effectiveColors.primaryButtonBackground};
  --mcs-primary-btn-text: ${effectiveColors.primaryButtonText};
  --mcs-primary-btn-border: ${effectiveColors.primaryButtonBorder};
  --mcs-secondary-btn-bg: ${effectiveColors.secondaryButtonBackground};
  --mcs-secondary-btn-text: ${effectiveColors.secondaryButtonText};
  --mcs-secondary-btn-border: ${effectiveColors.secondaryButtonBorder};
  
  /* Accent Colors */
  --mcs-accent-color: ${effectiveColors.accentColor};
  --mcs-link-color: ${effectiveColors.linkColor};
  --mcs-error-color: ${effectiveColors.errorColor};
  --mcs-success-color: ${effectiveColors.successColor};
  --mcs-warning-color: ${effectiveColors.warningColor};
}`;
                    defaultFileName = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.css`;
                    fileExtension = 'css';
                    break;
                    
                case 'scss':
                    content = `// ${theme.name} - ${theme.description}

// Bot Message Colors
$mcs-bot-message-bg: ${effectiveColors.botMessageBackground};
$mcs-bot-message-text: ${effectiveColors.botMessageText};
$mcs-bot-message-border: ${effectiveColors.botMessageBorder};

// User Message Colors
$mcs-user-message-bg: ${effectiveColors.userMessageBackground};
$mcs-user-message-text: ${effectiveColors.userMessageText};
$mcs-user-message-border: ${effectiveColors.userMessageBorder};

// Chat Interface Colors
$mcs-chat-bg: ${effectiveColors.chatBackground};
$mcs-chat-border: ${effectiveColors.chatBorder};
$mcs-chat-shadow: ${effectiveColors.chatShadow};

// Input Area Colors
$mcs-input-bg: ${effectiveColors.inputBackground};
$mcs-input-text: ${effectiveColors.inputText};
$mcs-input-border: ${effectiveColors.inputBorder};
$mcs-input-placeholder: ${effectiveColors.inputPlaceholder};

// Button Colors
$mcs-primary-btn-bg: ${effectiveColors.primaryButtonBackground};
$mcs-primary-btn-text: ${effectiveColors.primaryButtonText};
$mcs-primary-btn-border: ${effectiveColors.primaryButtonBorder};
$mcs-secondary-btn-bg: ${effectiveColors.secondaryButtonBackground};
$mcs-secondary-btn-text: ${effectiveColors.secondaryButtonText};
$mcs-secondary-btn-border: ${effectiveColors.secondaryButtonBorder};

// Accent Colors
$mcs-accent-color: ${effectiveColors.accentColor};
$mcs-link-color: ${effectiveColors.linkColor};
$mcs-error-color: ${effectiveColors.errorColor};
$mcs-success-color: ${effectiveColors.successColor};
$mcs-warning-color: ${effectiveColors.warningColor};`;
                    defaultFileName = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.scss`;
                    fileExtension = 'scss';
                    break;
                    
                default:
                    throw new Error(`Unsupported export format: ${format}`);
            }

            // Show save dialog
            const uri = await vscode.window.showSaveDialog({
                defaultUri: vscode.Uri.file(defaultFileName),
                filters: {
                    [`${format.toUpperCase()} Files`]: [fileExtension],
                    'All Files': ['*']
                }
            });

            if (uri) {
                // Write the content to the selected file
                await vscode.workspace.fs.writeFile(uri, Buffer.from(content, 'utf8'));
                
                // Show success message with option to open the file
                const action = await vscode.window.showInformationMessage(
                    `Theme exported as ${format.toUpperCase()} to ${uri.fsPath}`,
                    'Open File'
                );

                if (action === 'Open File') {
                    await vscode.window.showTextDocument(uri);
                }
                
                // Send success message back to webview
                this._panel.webview.postMessage({
                    command: 'showNotification',
                    text: `Theme exported successfully as ${format.toUpperCase()}!`,
                    type: 'success'
                });
            }
        } catch (error) {
            const errorMessage = `Failed to export theme: ${error}`;
            vscode.window.showErrorMessage(errorMessage);
            
            // Send error message back to webview
            this._panel.webview.postMessage({
                command: 'showNotification',
                text: errorMessage,
                type: 'error'
            });
        }
    }

    private async _handleSaveTheme(message: any) {
        // Handle saving custom themes (future feature)
        vscode.window.showInformationMessage('Save custom theme feature coming soon!');
    }

    private async _handleLoadThemes(message: any) {
        // Handle loading themes from external sources (future feature)
        vscode.window.showInformationMessage('Load external themes feature coming soon!');
    }

    private async _handleJsonExport(json: any, formattedJson: string) {
        try {
            // Show save dialog
            const uri = await vscode.window.showSaveDialog({
                defaultUri: vscode.Uri.file('copilot-agent-tools-config.json'),
                filters: {
                    'JSON Files': ['json'],
                    'All Files': ['*']
                }
            });

            if (uri) {
                // Write the JSON to the selected file
                await vscode.workspace.fs.writeFile(uri, Buffer.from(formattedJson, 'utf8'));
                
                // Show success message with option to open the file
                const action = await vscode.window.showInformationMessage(
                    `JSON configuration exported to ${uri.fsPath}`,
                    'Open File'
                );

                if (action === 'Open File') {
                    await vscode.window.showTextDocument(uri);
                }
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to export JSON: ${error}`);
        }
    }    private _update() {
        const webview = this._panel.webview;
        this._panel.title = 'Copilot Agent Toolkit';
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }private _getHtmlForWebview(webview: vscode.Webview) {
        // Get CSP source for security
        const cspSource = webview.cspSource;

        // Read the built HTML file from webpack output
        try {
            const htmlPath = path.join(this._extensionUri.fsPath, 'out', 'webview', 'index.html');
            let htmlContent = fs.readFileSync(htmlPath, 'utf8');
            
            // Replace CSP placeholder with actual values
            htmlContent = htmlContent.replace(/{{cspSource}}/g, cspSource);
            
            // Get the React app bundle URI
            const scriptUri = webview.asWebviewUri(
                vscode.Uri.joinPath(this._extensionUri, 'out', 'webview', 'index.js')
            );
            
            console.log('Script URI:', scriptUri.toString());
            
            // Replace the defer script tag with the correct URI
            htmlContent = htmlContent.replace(
                '<script defer src="index.js"></script>',
                `<script defer src="${scriptUri}"></script>`
            );
            
            console.log('HTML script replacement completed');
            console.log('HTML contains script URI:', htmlContent.includes(scriptUri.toString()));
                
            return htmlContent;
        } catch (error) {
            console.error('Failed to read built React HTML file:', error);
            
            // Get the React app bundle for fallback
            const scriptUri = webview.asWebviewUri(
                vscode.Uri.joinPath(this._extensionUri, 'out', 'webview', 'index.js')
            );
            
            // Fallback with inline React app loading
            return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; script-src ${cspSource} 'unsafe-inline' 'unsafe-eval'; font-src ${cspSource}; img-src ${cspSource} data: https:; connect-src ${cspSource} https: wss: ws:; media-src ${cspSource} https:; frame-src 'none'; object-src 'none'; base-uri 'none';">
                <title>Copilot Agent Toolkit</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        background-color: var(--vscode-editor-background);
                        color: var(--vscode-editor-foreground);
                    }
                    #root {
                        width: 100vw;
                        height: 100vh;
                    }
                    .loading {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        flex-direction: column;
                        gap: 16px;
                    }
                </style>
            </head>
            <body>                <div id="root">
                    <div class="loading">
                        <div>Loading Copilot Agent Toolkit...</div>
                    </div>
                </div>
                <script>
                    console.log('Fallback HTML: Initializing VS Code API...');
                    window.vscode = acquireVsCodeApi();
                </script>
                <script defer src="${scriptUri}"></script>
            </body>
            </html>`;
        }
    }
}
