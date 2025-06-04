export interface CopilotColorScheme {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    userMessage: string;
    botMessage: string;
    error: string;
    success: string;
}

export interface CopilotTheme {
    theme: {
        name: string;
        version: string;
        platform: string;
        colors: {
            branding: {
                primary: string;
                secondary: string;
                accent: string;
            };
            interface: {
                background: string;
                surface: string;
                text: string;
            };
            conversation: {
                userMessage: string;
                botMessage: string;
            };
            feedback: {
                error: string;
                success: string;
            };
        };
        metadata: {
            createdAt: string;
            createdBy: string;
        };
    };
}

export function generateCopilotKitJson(colorScheme: CopilotColorScheme): CopilotTheme {
    return {
        theme: {
            name: "Custom Copilot Theme",
            version: "1.0.0",
            platform: "Microsoft Copilot Studio",
            colors: {
                branding: {
                    primary: colorScheme.primary,
                    secondary: colorScheme.secondary,
                    accent: colorScheme.accent
                },
                interface: {
                    background: colorScheme.background,
                    surface: colorScheme.surface,
                    text: colorScheme.text
                },
                conversation: {
                    userMessage: colorScheme.userMessage,
                    botMessage: colorScheme.botMessage
                },
                feedback: {
                    error: colorScheme.error,
                    success: colorScheme.success
                }
            },
            metadata: {
                createdAt: new Date().toISOString(),
                createdBy: "VS Code Copilot Agent Toolkit Extension"
            }
        }
    };
}

export function validateHexColor(color: string): boolean {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
}

// Legacy function for backward compatibility
export function createJsonFromColors(selectedColors: string[]): string {
    const colorJson = {
        colors: selectedColors.map((color, index) => ({
            name: `color-${index + 1}`,
            hex: color
        }))
    };

    return JSON.stringify(colorJson, null, 2);
}