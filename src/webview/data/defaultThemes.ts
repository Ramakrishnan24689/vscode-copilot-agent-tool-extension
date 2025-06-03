// filepath: src/webview/data/defaultThemes.ts
import { Theme } from '../types';

export const defaultThemes: Theme[] = [
  {
    id: 'microsoft-default',
    name: 'Microsoft Default',
    description: 'Classic Microsoft brand colors with professional styling',
    category: 'default',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjI1IiByeD0iNCIgZmlsbD0iIzAwNzhENCIvPjx0ZXh0IHg9IjIwIiB5PSIyOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIj5Cb3QgbWVzc2FnZSBwcmV2aWV3PC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2MDYwNjAiPk1pY3Jvc29mdCBCcmFuZCBDb2xvcnM8L3RleHQ+PC9zdmc+',
    colors: {
      botMessageBackground: '#0078D4',
      botMessageText: '#FFFFFF',
      botMessageBorder: '#005A9E',
      
      userMessageBackground: '#F3F2F1',
      userMessageText: '#323130',
      userMessageBorder: '#EDEBE9',
      
      chatBackground: '#FFFFFF',
      chatBorder: '#E1DFDD',
      chatShadow: 'rgba(0, 0, 0, 0.1)',
      
      inputBackground: '#FFFFFF',
      inputText: '#323130',
      inputBorder: '#8A8886',
      inputPlaceholder: '#605E5C',
      
      primaryButtonBackground: '#0078D4',
      primaryButtonText: '#FFFFFF',
      primaryButtonBorder: '#005A9E',
      
      secondaryButtonBackground: '#F3F2F1',
      secondaryButtonText: '#323130',
      secondaryButtonBorder: '#8A8886',
      
      accentColor: '#0078D4',
      linkColor: '#106EBE',
      errorColor: '#D13438',
      successColor: '#107C10',
      warningColor: '#FF8C00',
    },
    tags: ['microsoft', 'professional', 'blue', 'corporate'],
  },
  {
    id: 'modern-purple',
    name: 'Modern Purple',
    description: 'Contemporary purple theme with gradient accents',
    category: 'modern',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InB1cnBsZUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjI2NEE3Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOEU0RUM2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0ZBRkFGQSIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyNSIgcng9IjEyIiBmaWxsPSJ1cmwoI3B1cnBsZUdyYWRpZW50KSIvPjx0ZXh0IHg9IjIwIiB5PSIyOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIj5Nb2Rlcm4gUHVycGxlIFRoZW1lPC90ZXh0Pjx0ZXh0IHg9IjEwIiB5PSI2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2MjY0QTciPkdyYWRpZW50ICZhbXA7IE1vZGVybjwvdGV4dD48L3N2Zz4=',
    colors: {
      botMessageBackground: '#6264A7',
      botMessageText: '#FFFFFF',
      botMessageBorder: '#464775',
      
      userMessageBackground: '#F8F7FF',
      userMessageText: '#2D2D30',
      userMessageBorder: '#E8E6FF',
      
      chatBackground: '#FAFAFA',
      chatBorder: '#E5E5E5',
      chatShadow: 'rgba(98, 100, 167, 0.15)',
      
      inputBackground: '#FFFFFF',
      inputText: '#2D2D30',
      inputBorder: '#6264A7',
      inputPlaceholder: '#767676',
      
      primaryButtonBackground: '#6264A7',
      primaryButtonText: '#FFFFFF',
      primaryButtonBorder: '#464775',
      
      secondaryButtonBackground: '#F8F7FF',
      secondaryButtonText: '#6264A7',
      secondaryButtonBorder: '#6264A7',
      
      accentColor: '#8E4EC6',
      linkColor: '#6264A7',
      errorColor: '#E74856',
      successColor: '#10893E',
      warningColor: '#F7630C',
    },
    tags: ['modern', 'purple', 'gradient', 'contemporary'],
  },
  {
    id: 'dark-mode',
    name: 'Dark Professional',
    description: 'Sleek dark theme optimized for low-light environments',
    category: 'dark',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjAyMDIwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjI1IiByeD0iNCIgZmlsbD0iIzRBOTBFMiIvPjx0ZXh0IHg9IjIwIiB5PSIyOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIj5EYXJrIFByb2Zlc3Npb25hbDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjQjNCM0IzIj5EYXJrICZhbXA7IFNsZWVrPC90ZXh0Pjwvc3ZnPg==',
    colors: {
      botMessageBackground: '#4A90E2',
      botMessageText: '#FFFFFF',
      botMessageBorder: '#357ABD',
      
      userMessageBackground: '#333333',
      userMessageText: '#F5F5F5',
      userMessageBorder: '#4A4A4A',
      
      chatBackground: '#202020',
      chatBorder: '#404040',
      chatShadow: 'rgba(0, 0, 0, 0.3)',
      
      inputBackground: '#2A2A2A',
      inputText: '#F5F5F5',
      inputBorder: '#4A90E2',
      inputPlaceholder: '#B3B3B3',
      
      primaryButtonBackground: '#4A90E2',
      primaryButtonText: '#FFFFFF',
      primaryButtonBorder: '#357ABD',
      
      secondaryButtonBackground: '#333333',
      secondaryButtonText: '#F5F5F5',
      secondaryButtonBorder: '#666666',
      
      accentColor: '#4A90E2',
      linkColor: '#5BA0F2',
      errorColor: '#FF6B6B',
      successColor: '#4ECDC4',
      warningColor: '#FFE66D',
    },
    tags: ['dark', 'professional', 'blue', 'night-mode'],
  },
  {
    id: 'light-minimal',
    name: 'Light Minimal',
    description: 'Clean and minimal light theme with subtle accents',
    category: 'light',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkJGQkZCIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjI1IiByeD0iOCIgZmlsbD0iIzJFOEI1NyIgZmlsbC1vcGFjaXR5PSIwLjkiLz48dGV4dCB4PSIyMCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSI+TGlnaHQgTWluaW1hbDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2NjY2Ij5DbGVhbiAmYW1wOyBNaW5pbWFsPC90ZXh0Pjwvc3ZnPg==',
    colors: {
      botMessageBackground: '#2E8B57',
      botMessageText: '#FFFFFF',
      botMessageBorder: '#228B22',
      
      userMessageBackground: '#F8F9FA',
      userMessageText: '#212529',
      userMessageBorder: '#E9ECEF',
      
      chatBackground: '#FBFBFB',
      chatBorder: '#F0F0F0',
      chatShadow: 'rgba(0, 0, 0, 0.05)',
      
      inputBackground: '#FFFFFF',
      inputText: '#212529',
      inputBorder: '#CED4DA',
      inputPlaceholder: '#6C757D',
      
      primaryButtonBackground: '#2E8B57',
      primaryButtonText: '#FFFFFF',
      primaryButtonBorder: '#228B22',
      
      secondaryButtonBackground: '#F8F9FA',
      secondaryButtonText: '#495057',
      secondaryButtonBorder: '#CED4DA',
      
      accentColor: '#2E8B57',
      linkColor: '#20C997',
      errorColor: '#DC3545',
      successColor: '#28A745',
      warningColor: '#FFC107',
    },
    tags: ['light', 'minimal', 'clean', 'green', 'nature'],
  },
  {
    id: 'teams-inspired',
    name: 'Teams Inspired',
    description: 'Inspired by Microsoft Teams with familiar colors',
    category: 'default',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkFGOUY4Ii8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjI1IiByeD0iNCIgZmlsbD0iIzY0NjRBNyIvPjx0ZXh0IHg9IjIwIiB5PSIyOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIj5UZWFtcyBJbnNwaXJlZDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjQ2NEE3Ij5GYW1pbGlhciAmYW1wOyBGcmllbmRseTwvdGV4dD48L3N2Zz4=',
    colors: {
      botMessageBackground: '#6264A7',
      botMessageText: '#FFFFFF',
      botMessageBorder: '#464775',
      
      userMessageBackground: '#F3F2F1',
      userMessageText: '#323130',
      userMessageBorder: '#EDEBE9',
      
      chatBackground: '#FAF9F8',
      chatBorder: '#EDEBE9',
      chatShadow: 'rgba(0, 0, 0, 0.08)',
      
      inputBackground: '#FFFFFF',
      inputText: '#323130',
      inputBorder: '#8A8886',
      inputPlaceholder: '#605E5C',
      
      primaryButtonBackground: '#6264A7',
      primaryButtonText: '#FFFFFF',
      primaryButtonBorder: '#464775',
      
      secondaryButtonBackground: '#F3F2F1',
      secondaryButtonText: '#323130',
      secondaryButtonBorder: '#8A8886',
      
      accentColor: '#6264A7',
      linkColor: '#6264A7',
      errorColor: '#C4314B',
      successColor: '#0F7B0F',
      warningColor: '#F7630C',
    },
    tags: ['teams', 'microsoft', 'collaboration', 'purple', 'familiar'],
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Calming ocean-inspired blue theme with wave gradients',
    category: 'modern',
    preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im9jZWFuR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDc4RDQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDM5NkEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjVGOUZEIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjI1IiByeD0iMTIiIGZpbGw9InVybCgjb2NlYW5HcmFkaWVudCkiLz48dGV4dCB4PSIyMCIgeT0iMjgiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSI+T2NlYW4gQmx1ZSBUaGVtZTwvdGV4dD48dGV4dCB4PSIxMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMDA3OEQ0Ij5DYWxtaW5nICZhbXA7IFNlcmVuZTwvdGV4dD48L3N2Zz4=',
    colors: {
      botMessageBackground: '#0078D4',
      botMessageText: '#FFFFFF',
      botMessageBorder: '#00396A',
      
      userMessageBackground: '#F0F6FF',
      userMessageText: '#1B3A57',
      userMessageBorder: '#D6E8FF',
      
      chatBackground: '#F5F9FD',
      chatBorder: '#E3F2FD',
      chatShadow: 'rgba(0, 120, 212, 0.1)',
      
      inputBackground: '#FFFFFF',
      inputText: '#1B3A57',
      inputBorder: '#0078D4',
      inputPlaceholder: '#5A7C95',
      
      primaryButtonBackground: '#0078D4',
      primaryButtonText: '#FFFFFF',
      primaryButtonBorder: '#00396A',
      
      secondaryButtonBackground: '#F0F6FF',
      secondaryButtonText: '#0078D4',
      secondaryButtonBorder: '#0078D4',
      
      accentColor: '#0078D4',
      linkColor: '#106EBE',
      errorColor: '#E74856',
      successColor: '#0E7A0B',
      warningColor: '#F7630C',
    },
    tags: ['ocean', 'blue', 'calming', 'gradient', 'water'],
  },
];
