import * as vscode from 'vscode';
import { ColorProvider } from '../providers/colorProvider';
import { generateMcsKitJson } from '../utils/jsonGenerator';

export function generateColorJson(context: vscode.ExtensionContext) {
    const colorProvider = new ColorProvider();
    const selectedColors = colorProvider.getMcsColorScheme();

    const jsonOutput = generateMcsKitJson(selectedColors);
    const jsonString = JSON.stringify(jsonOutput, null, 2);

    vscode.workspace.openTextDocument({ content: jsonString, language: 'json' })
        .then(doc => vscode.window.showTextDocument(doc));
}