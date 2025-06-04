import * as assert from 'assert';
import * as vscode from 'vscode';
import { ThemeProvider } from '../../providers/themeProvider';
import { generateCopilotKitJson } from '../../utils/jsonGenerator';

suite('Copilot Agent Toolkit Extension Test Suite', () => {
    vscode.window.showInformationMessage('Running Copilot Agent Toolkit Extension tests.');

    test('ThemeProvider should initialize with default Copilot Studio colors', () => {
        const themeProvider = new ThemeProvider();
        const colors = themeProvider.getCopilotThemeColors();
        
        assert.strictEqual(colors.primary, '#0078D4');
        assert.strictEqual(colors.secondary, '#106EBE');
        assert.strictEqual(colors.accent, '#FFB900');
        assert.strictEqual(colors.background, '#FFFFFF');
        assert.strictEqual(colors.surface, '#F3F2F1');
        assert.strictEqual(colors.text, '#323130');
        assert.strictEqual(colors.userMessage, '#E1F5FE');
        assert.strictEqual(colors.botMessage, '#F5F5F5');
        assert.strictEqual(colors.error, '#D13438');
        assert.strictEqual(colors.success, '#107C10');
    });    test('ThemeProvider should update colors correctly', () => {
        const themeProvider = new ThemeProvider();
        const testColor = '#FF0000';
        
        themeProvider.updateColor('primary', testColor);
        const colors = themeProvider.getCopilotThemeColors();
        
        assert.strictEqual(colors.primary, testColor);
    });    test('JSON generation should create valid Copilot Studio structure', () => {
        const themeProvider = new ThemeProvider();
        const colors = themeProvider.getCopilotThemeColors();        const copilotJson = generateCopilotKitJson(colors);

        assert.ok(copilotJson.theme);
        assert.strictEqual(copilotJson.theme.name, 'Custom Copilot Theme');        assert.strictEqual(copilotJson.theme.platform, 'Microsoft Copilot Studio');
        assert.ok(copilotJson.theme.colors.branding);
        assert.ok(copilotJson.theme.colors.interface);
        assert.ok(copilotJson.theme.colors.conversation);
        assert.ok(copilotJson.theme.colors.feedback);
        assert.ok(copilotJson.theme.metadata);
        
        // Verify color mapping
        assert.strictEqual(copilotJson.theme.colors.branding.primary, colors.primary);
        assert.strictEqual(copilotJson.theme.colors.interface.background, colors.background);
        assert.strictEqual(copilotJson.theme.colors.conversation.userMessage, colors.userMessage);
        assert.strictEqual(copilotJson.theme.colors.feedback.error, colors.error);
    });    test('Export should generate proper JSON structure', () => {
        const themeProvider = new ThemeProvider();
        const exportedJson = themeProvider.exportToCopilotStudioJson();
          assert.ok(exportedJson.theme);
        assert.ok(exportedJson.theme.metadata.createdAt);
        assert.strictEqual(exportedJson.theme.metadata.createdBy, 'VS Code Copilot Agent Toolkit Extension');
          // Ensure all required color sections exist
        const colorSections = ['branding', 'interface', 'conversation', 'feedback'] as const;
        colorSections.forEach(section => {
            assert.ok(exportedJson.theme.colors[section], `Missing color section: ${section}`);
        });
    });
});
