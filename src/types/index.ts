export interface Color {
    name: string;
    hex: string;
}

export interface ColorSelection {
    selectedColors: Color[];
}

export interface McsColorScheme {
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

export interface McsThemeColors {
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

export interface McsTheme {
    theme: {
        name: string;
        version: string;
        platform: string;
        colors: McsThemeColors;
        metadata: {
            createdAt: string;
            createdBy: string;
        };
    };
}