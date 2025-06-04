export interface Color {
    name: string;
    hex: string;
}

export interface ColorSelection {
    selectedColors: Color[];
}

export interface CopilotColorScheme {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    userMessage: string;
    botMessage: string;
    error?: string;
    success?: string;
}

export interface CopilotThemeColors {
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
    feedback?: {
        error: string;
        success: string;
    };
}

export interface CopilotTheme {
    theme: {
        name: string;
        version: string;
        platform: string;
        colors: CopilotThemeColors;
        metadata: {
            createdAt: string;
            createdBy: string;
        };
    };
}