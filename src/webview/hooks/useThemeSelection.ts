import { useState, useEffect, useMemo } from 'react';
import { Theme, CustomColorOverrides } from '../types';
import { defaultThemes } from '../data/defaultThemes';

export const useThemeSelection = () => {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [customColors, setCustomColors] = useState<CustomColorOverrides>({});
  const [themes] = useState<Theme[]>(defaultThemes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with first theme
  useEffect(() => {
    if (themes.length > 0 && !selectedTheme) {
      setSelectedTheme(themes[0]);
    }
  }, [themes, selectedTheme]);

  const filteredThemes = useMemo(() => {
    if (!searchTerm.trim()) return themes;
    
    const term = searchTerm.toLowerCase();
    return themes.filter(theme => 
      theme.name.toLowerCase().includes(term) ||
      theme.description.toLowerCase().includes(term) ||
      theme.category.toLowerCase().includes(term)
    );
  }, [themes, searchTerm]);

  const selectTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    // Reset custom colors when switching themes
    setCustomColors({});
  };

  const updateCustomColor = (colorKey: string, color: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: color
    }));
  };

  const getEffectiveTheme = (): Theme | null => {
    if (!selectedTheme) return null;
    
    return {
      ...selectedTheme,
      colors: {
        ...selectedTheme.colors,
        ...customColors
      }
    };
  };

  return {
    selectedTheme,
    customColors,
    themes,
    selectTheme,
    updateCustomColor,
    searchTerm,
    setSearchTerm,
    filteredThemes,
    isLoading,
    getEffectiveTheme
  };
};
