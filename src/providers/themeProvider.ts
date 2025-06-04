import * as vscode from 'vscode';
import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, EventEmitter, Event } from 'vscode';

export class ThemeItem extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly colorValue: string,
        public readonly colorType: string,
        public readonly collapsibleState: TreeItemCollapsibleState = TreeItemCollapsibleState.None
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}: ${this.colorValue}`;
        this.description = this.colorValue;
        this.contextValue = 'copilotThemeColor';
        this.command = {
            command: 'copilotAgentTools.editColor',
            title: 'Edit Color',
            arguments: [this.colorType, this.colorValue]
        };
        
        // Add colored circle icon
        this.iconPath = new vscode.ThemeIcon('circle-filled');
    }
}

export class ThemeProvider implements TreeDataProvider<ThemeItem> {
    // Copilot Studio-specific color scheme for chatbots
    private copilotThemeColors = {
        primary: '#0078D4',        // Microsoft Blue - main bot color
        secondary: '#106EBE',      // Darker Blue - secondary elements  
        accent: '#FFB900',         // Yellow - highlights and CTAs
        background: '#FFFFFF',     // White - chat background
        surface: '#F3F2F1',       // Light Gray - message bubbles
        text: '#323130',          // Dark Gray - text color
        userMessage: '#E1F5FE',   // Light Blue - user message background
        botMessage: '#F5F5F5',    // Light Gray - bot message background
        error: '#D13438',         // Red - error states
        success: '#107C10'        // Green - success states
    };

    private _onDidChangeTreeData: EventEmitter<ThemeItem | undefined> = new EventEmitter<ThemeItem | undefined>();
    readonly onDidChangeTreeData: Event<ThemeItem | undefined> = this._onDidChangeTreeData.event;

    getTreeItem(element: ThemeItem): TreeItem {
        return element;
    }

    getChildren(element?: ThemeItem): Thenable<ThemeItem[]> {
        // Tree view not used in current implementation - extension uses webview interface
        return Promise.resolve([]);
    }

    updateColor(colorType: string, newColor: string): void {
        if (colorType in this.copilotThemeColors) {
            (this.copilotThemeColors as any)[colorType] = newColor;
            this.refresh();
            vscode.window.showInformationMessage(`${colorType} color updated to ${newColor}`);
        }
    }

    getCopilotThemeColors() {
        return { ...this.copilotThemeColors };
    }

    getSelectedColors() {
        return this.copilotThemeColors;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    // Method to export current color scheme as Copilot Studio-compatible JSON
    exportToCopilotStudioJson() {
        return {
            theme: {
                name: "Custom Copilot Studio Theme",
                version: "1.0.0",
                platform: "Microsoft Copilot Studio",
                colors: {
                    branding: {
                        primary: this.copilotThemeColors.primary,
                        secondary: this.copilotThemeColors.secondary,
                        accent: this.copilotThemeColors.accent
                    },
                    interface: {
                        background: this.copilotThemeColors.background,
                        surface: this.copilotThemeColors.surface,
                        text: this.copilotThemeColors.text
                    },
                    conversation: {
                        userMessage: this.copilotThemeColors.userMessage,
                        botMessage: this.copilotThemeColors.botMessage
                    },
                    feedback: {
                        error: this.copilotThemeColors.error,
                        success: this.copilotThemeColors.success
                    }
                },
                metadata: {
                    createdAt: new Date().toISOString(),
                    createdBy: "VS Code Copilot Agent Toolkit Extension"
                }
            }
        };
    }
}