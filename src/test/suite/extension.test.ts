import * as assert from 'assert';
import * as vscode from 'vscode';
import { ColorProvider } from '../../providers/colorProvider';
import { generateMcsKitJson } from '../../utils/jsonGenerator';

suite('MCS Color Extension Test Suite', () => {
    vscode.window.showInformationMessage('Running MCS Color Extension tests.');

    test('ColorProvider should initialize with default MCS colors', () => {
        const colorProvider = new ColorProvider();
        const colors = colorProvider.getMcsColorScheme();
        
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
    });

    test('ColorProvider should update colors correctly', () => {
        const colorProvider = new ColorProvider();
        const testColor = '#FF0000';
        
        colorProvider.updateColor('primary', testColor);
        const colors = colorProvider.getMcsColorScheme();
        
        assert.strictEqual(colors.primary, testColor);
    });

    test('JSON generation should create valid MCS structure', () => {
        const colorProvider = new ColorProvider();
        const colors = colorProvider.getMcsColorScheme();
        const mcsJson = generateMcsKitJson(colors);
        
        assert.ok(mcsJson.theme);
        assert.strictEqual(mcsJson.theme.name, 'Custom MCS Theme');
        assert.strictEqual(mcsJson.theme.platform, 'Microsoft Copilot Studio');
        assert.ok(mcsJson.theme.colors.branding);
        assert.ok(mcsJson.theme.colors.interface);
        assert.ok(mcsJson.theme.colors.conversation);
        assert.ok(mcsJson.theme.colors.feedback);
        assert.ok(mcsJson.theme.metadata);
        
        // Verify color mapping
        assert.strictEqual(mcsJson.theme.colors.branding.primary, colors.primary);
        assert.strictEqual(mcsJson.theme.colors.interface.background, colors.background);
        assert.strictEqual(mcsJson.theme.colors.conversation.userMessage, colors.userMessage);
        assert.strictEqual(mcsJson.theme.colors.feedback.error, colors.error);
    });

    test('Export should generate proper JSON structure', () => {
        const colorProvider = new ColorProvider();
        const exportedJson = colorProvider.exportToMcsJson();
        
        assert.ok(exportedJson.theme);
        assert.ok(exportedJson.theme.metadata.createdAt);
        assert.strictEqual(exportedJson.theme.metadata.createdBy, 'VS Code MCS Extension');
          // Ensure all required color sections exist
        const colorSections = ['branding', 'interface', 'conversation', 'feedback'] as const;
        colorSections.forEach(section => {
            assert.ok(exportedJson.theme.colors[section], `Missing color section: ${section}`);
        });
    });
});
