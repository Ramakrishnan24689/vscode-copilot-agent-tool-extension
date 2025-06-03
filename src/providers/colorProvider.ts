import * as vscode from 'vscode';
import { TreeDataProvider, TreeItem, TreeItemCollapsibleState, EventEmitter, Event } from 'vscode';

export class ColorItem extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly colorValue: string,
        public readonly colorType: string,
        public readonly collapsibleState: TreeItemCollapsibleState = TreeItemCollapsibleState.None
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}: ${this.colorValue}`;
        this.description = this.colorValue;
        this.contextValue = 'mcsColor';
        this.command = {
            command: 'copilotAgentTools.editColor',
            title: 'Edit Color',
            arguments: [this.colorType, this.colorValue]
        };
        
        // Add colored circle icon
        this.iconPath = new vscode.ThemeIcon('circle-filled');
    }
}

export class ColorProvider implements TreeDataProvider<ColorItem> {
    // MCS-specific color scheme for Microsoft Copilot Studio chatbots
    private mcsColorScheme = {
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

    private _onDidChangeTreeData: EventEmitter<ColorItem | undefined> = new EventEmitter<ColorItem | undefined>();
    readonly onDidChangeTreeData: Event<ColorItem | undefined> = this._onDidChangeTreeData.event;

    getTreeItem(element: ColorItem): TreeItem {
        return element;
    }

    getChildren(element?: ColorItem): Thenable<ColorItem[]> {
        if (!element) {
            // Root level - show MCS color categories
            return Promise.resolve([
                new ColorItem('🎨 Primary Color', this.mcsColorScheme.primary, 'primary'),
                new ColorItem('🔷 Secondary Color', this.mcsColorScheme.secondary, 'secondary'),
                new ColorItem('⭐ Accent Color', this.mcsColorScheme.accent, 'accent'),
                new ColorItem('📄 Background Color', this.mcsColorScheme.background, 'background'),
                new ColorItem('💬 Surface Color', this.mcsColorScheme.surface, 'surface'),
                new ColorItem('📝 Text Color', this.mcsColorScheme.text, 'text'),
                new ColorItem('👤 User Message', this.mcsColorScheme.userMessage, 'userMessage'),
                new ColorItem('🤖 Bot Message', this.mcsColorScheme.botMessage, 'botMessage'),
                new ColorItem('❌ Error Color', this.mcsColorScheme.error, 'error'),
                new ColorItem('✅ Success Color', this.mcsColorScheme.success, 'success')
            ]);
        }
        return Promise.resolve([]);
    }

    updateColor(colorType: string, newColor: string): void {
        if (colorType in this.mcsColorScheme) {
            (this.mcsColorScheme as any)[colorType] = newColor;
            this.refresh();
            vscode.window.showInformationMessage(`${colorType} color updated to ${newColor}`);
        }
    }

    getMcsColorScheme() {
        return { ...this.mcsColorScheme };
    }

    getSelectedColors() {
        return this.mcsColorScheme;
    }

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    // Method to export current color scheme as MCS-compatible JSON
    exportToMcsJson() {
        return {
            theme: {
                name: "Custom MCS Theme",
                version: "1.0.0",
                platform: "Microsoft Copilot Studio",
                colors: {
                    branding: {
                        primary: this.mcsColorScheme.primary,
                        secondary: this.mcsColorScheme.secondary,
                        accent: this.mcsColorScheme.accent
                    },
                    interface: {
                        background: this.mcsColorScheme.background,
                        surface: this.mcsColorScheme.surface,
                        text: this.mcsColorScheme.text
                    },
                    conversation: {
                        userMessage: this.mcsColorScheme.userMessage,
                        botMessage: this.mcsColorScheme.botMessage
                    },
                    feedback: {
                        error: this.mcsColorScheme.error,
                        success: this.mcsColorScheme.success
                    }
                },
                metadata: {
                    createdAt: new Date().toISOString(),
                    createdBy: "VS Code MCS Extension"
                }
            }
        };
    }
}