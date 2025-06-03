import * as vscode from 'vscode';
import { ColorSelectorCommand } from './commands/colorSelector';

export function activate(context: vscode.ExtensionContext) {
    const colorSelector = new ColorSelectorCommand(context.extensionUri);

    // Create status bar item for quick access
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(robot) Copilot Agent Tools";
    statusBarItem.tooltip = "Open Copilot Agent Tools (Ctrl+Shift+A)";
    statusBarItem.command = 'copilotAgentTools.openThemeGallery';
    statusBarItem.show();

    // Register commands
    const openThemeGalleryCommand = vscode.commands.registerCommand('copilotAgentTools.openThemeGallery',
        () => colorSelector.openThemeGallery());

    const applyColorFromWebviewCommand = vscode.commands.registerCommand('copilotAgentTools.applyColorFromWebview',
        (message: any) => colorSelector.handleWebviewMessage(message));

    const exportHtmlFromWebviewCommand = vscode.commands.registerCommand('copilotAgentTools.exportHtmlFromWebview',
        (message: any) => colorSelector.exportHtmlFromWebview(message));

    const previewHtmlFromWebviewCommand = vscode.commands.registerCommand('copilotAgentTools.previewHtmlFromWebview',
        (message: any) => colorSelector.previewHtmlFromWebview(message));

    context.subscriptions.push(
        openThemeGalleryCommand, 
        applyColorFromWebviewCommand, 
        exportHtmlFromWebviewCommand, 
        previewHtmlFromWebviewCommand, 
        statusBarItem
    );
}

export function deactivate() {}