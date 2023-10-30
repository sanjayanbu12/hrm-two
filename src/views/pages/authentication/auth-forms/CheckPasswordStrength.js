export const checkPasswordStrength = (password) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasMinLength = password.length >= 8;
    const hasSpecialChar = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password);
  
    return {
      hasLowercase,
      hasUppercase,
      hasNumeric,
      hasMinLength,
      hasSpecialChar,
    };
  };
  export const marg0 = { margin: 0, padding: 0 };
  export const marg1 = { margin: 0, padding: 0,listStyle: 'none' };