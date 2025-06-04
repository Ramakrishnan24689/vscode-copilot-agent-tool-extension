import * as vscode from 'vscode';
import { CopilotAgentToolsPanel } from '../providers/copilotAgentToolsPanel';
import { HTMLGenerator } from '../utils/htmlGenerator';

export class CopilotAgentToolsCommand {
    constructor(
        private extensionUri: vscode.Uri
    ) {}

    /**
     * Opens the main theme gallery interface
     */    async openThemeGallery(): Promise<void> {
        try {
            CopilotAgentToolsPanel.createOrShow(this.extensionUri);
            vscode.window.showInformationMessage('🤖 Copilot Agent Toolkit opened! Select a theme and see the live preview.');
        } catch (error) {
            vscode.window.showErrorMessage(`Error opening theme gallery: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Handle messages from the webview
     */
    handleWebviewMessage(message: any): void {
        try {
            if (message.command === 'applyColor') {
                if (message.colorType && message.color) {
                    vscode.window.showInformationMessage(`Applied ${message.colorType}: ${message.color}`);
                } else {
                    vscode.window.showWarningMessage('Invalid color data received from theme gallery');
                }
            } else if (message.command === 'exportJson') {
                this.exportJsonFromWebview(message.data);
            } else if (message.command === 'exportHtml') {
                this.exportHtmlFromWebview(message);
            } else if (message.command === 'previewHtml') {
                this.previewHtmlFromWebview(message);
            } else if (message.command === 'showInfo') {
                vscode.window.showInformationMessage(message.text);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error handling webview message: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Export JSON configuration from webview
     */
    private async exportJsonFromWebview(jsonData: string): Promise<void> {
        try {
            const saveUri = await vscode.window.showSaveDialog({
                defaultUri: vscode.Uri.file('copilot-studio-theme.json'),
                filters: {
                    'JSON files': ['json']
                }
            });

            if (saveUri) {
                await vscode.workspace.fs.writeFile(saveUri, Buffer.from(jsonData, 'utf8'));
                vscode.window.showInformationMessage(`Theme configuration saved to ${saveUri.fsPath}`);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error saving JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Export HTML canvas from webview
     */
    public async exportHtmlFromWebview(message: any): Promise<void> {
        try {
            const { config, exportType } = message;
            const htmlContent = exportType === 'demo' 
                ? HTMLGenerator.generateDemoHTML(config)
                : HTMLGenerator.generateCopilotStudioHTML(config);

            const defaultName = exportType === 'demo' 
                ? 'copilot-studio-theme-demo.html'
                : 'copilot-studio-canvas.html';

            const saveUri = await vscode.window.showSaveDialog({
                defaultUri: vscode.Uri.file(defaultName),
                filters: {
                    'HTML files': ['html'],
                    'All files': ['*']
                }
            });

            if (saveUri) {
                await vscode.workspace.fs.writeFile(saveUri, Buffer.from(htmlContent, 'utf8'));
                
                const successMessage = exportType === 'demo' 
                    ? `Demo HTML saved to ${saveUri.fsPath}. You can open this file directly in a browser.`
                    : `Production canvas saved to ${saveUri.fsPath}. Remember to replace YOUR_TOKEN_ENDPOINT_HERE with your actual Copilot Studio token endpoint.`;
                    
                vscode.window.showInformationMessage(successMessage);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error exporting HTML: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Preview HTML canvas in VS Code
     */
    public async previewHtmlFromWebview(message: any): Promise<void> {
        try {
            const { config, exportType } = message;
            const htmlContent = exportType === 'demo' 
                ? HTMLGenerator.generateDemoHTML(config)
                : HTMLGenerator.generateCopilotStudioHTML(config);

            const title = exportType === 'demo' 
                ? 'Copilot Studio Theme Demo'
                : 'Copilot Studio Canvas Preview';

            // Create new document with generated HTML
            const document = await vscode.workspace.openTextDocument({
                content: htmlContent,
                language: 'html'
            });
            
            await vscode.window.showTextDocument(document);
            vscode.window.showInformationMessage(`${title} opened for preview. You can save this file and open it in a browser.`);
        } catch (error) {
            vscode.window.showErrorMessage(`Error previewing HTML: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
