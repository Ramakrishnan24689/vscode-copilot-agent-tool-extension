import * as vscode from 'vscode';
import { CopilotAgentToolsCommand } from './commands/copilotAgentToolsCommand';

export function activate(context: vscode.ExtensionContext) {
    const copilotAgentTools = new CopilotAgentToolsCommand(context.extensionUri);

    // Create status bar item for quick access
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.text = "$(robot) Copilot Agent Toolkit";
    statusBarItem.tooltip = "Open Copilot Agent Toolkit (Ctrl+Shift+A)";
    statusBarItem.command = 'copilotAgentTools.openThemeGallery';
    statusBarItem.show();

    // Register commands
    const openThemeGalleryCommand = vscode.commands.registerCommand('copilotAgentTools.openThemeGallery',
        () => copilotAgentTools.openThemeGallery());

    const applyColorFromWebviewCommand = vscode.commands.registerCommand('copilotAgentTools.applyColorFromWebview',
        (message: any) => copilotAgentTools.handleWebviewMessage(message));

    const exportHtmlFromWebviewCommand = vscode.commands.registerCommand('copilotAgentTools.exportHtmlFromWebview',
        (message: any) => copilotAgentTools.exportHtmlFromWebview(message));

    const previewHtmlFromWebviewCommand = vscode.commands.registerCommand('copilotAgentTools.previewHtmlFromWebview',
        (message: any) => copilotAgentTools.previewHtmlFromWebview(message));

    context.subscriptions.push(
        openThemeGalleryCommand, 
        applyColorFromWebviewCommand, 
        exportHtmlFromWebviewCommand, 
        previewHtmlFromWebviewCommand, 
        statusBarItem
    );
}

export function deactivate() {}