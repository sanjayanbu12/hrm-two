/**
 * Color intention that you want to use in your theme
 * @param {JsonObject} theme Theme customization object
 */
export default function themePalette(theme) {
  // Default palette values in case 'theme' or its properties are undefined
  const defaultPalette = {
    mode: 'light', // Default mode
    common: {
      black: '#000',
    },
    primary: {
      light: '#90caf9',
      main: '#2196f3',
      dark: '#1565c0',
      200: '#9fa8da',
      800: '#0d47a1',
    },
    // ... Define other palette colors here
  };

  // Check if 'theme' is defined and has the expected structure
  if (!theme || !theme.customization || !theme.colors) {
    console.error('Invalid theme object. Using default palette.');
    return defaultPalette;
  }

  // Access properties from the 'theme' object
  const { customization, colors } = theme;

  const palette = {
    mode: customization.navType || 'light',
    common: {
      black: colors.darkPaper || '#000',
    },
    primary: {
      light: colors.primaryLight || '#90caf9',
      main: colors.grey500 || '#2196f3',
      dark: colors.primary200 || '#1565c0',
      200: colors.primary200 || '#9fa8da',
      800: colors.primary800 || '#0d47a1',
    },
    secondary: {
      light: colors.primaryLight || '#90caf9',
      main: colors.grey500 || '#2196f3',
      dark: colors.grey500 || '#2196f3',
      200: colors.secondary200 || '#9fa8da',
      800: colors.secondary800 || '#0d47a1',
    },
    error: {
      light: colors.errorLight || '#e57373',
      main: colors.errorMain || '#f44336',
      dark: colors.errorDark || '#d32f2f',
    },
    orange: {
      light: colors.orangeLight || '#ffb74d',
      main: colors.orangeMain || '#ff9800',
      dark: colors.orangeDark || '#f57c00',
    },
    warning: {
      light: colors.warningLight || '#ffb74d',
      main: colors.warningMain || '#ff9800',
      dark: colors.warningDark || '#f57c00',
    },
    success: {
      light: colors.successLight || '#81c784',
      200: colors.success200 || '#66bb6a',
      main: colors.successMain || '#4caf50',
      dark: colors.successDark || '#388e3c',
    },
    grey: {
      50: colors.grey50 || '#fafafa',
      100: colors.grey100 || '#f5f5f5',
      500: colors.darkTextSecondary || '#616161',
      600: colors.heading || '#424242',
      700: colors.darkTextPrimary || '#212121',
      900: colors.textDark || '#000',
    },
    dark: {
      light: colors.darkTextPrimary || '#212121',
      main: colors.darkLevel1 || '#121212',
      dark: colors.darkLevel2 || '#000',
      800: colors.darkBackground || '#000',
      900: colors.darkPaper || '#121212',
    },
    text: {
      primary: colors.darkTextPrimary || '#212121',
      secondary: colors.darkTextSecondary || '#616161',
      dark: colors.textDark || '#000',
      hint: colors.grey100 || '#f5f5f5',
    },
    background: {
      paper: colors.paper || '#fff',
      default: colors.backgroundDefault || '#f7f7f7',
    },
  };

  return palette;
}
