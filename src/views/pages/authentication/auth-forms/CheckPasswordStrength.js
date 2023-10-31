export const checkPasswordStrength = (password) => {
  console.log('password',password)
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
