export function initializeTheme(): void {
  // Always use light theme - no dark mode application
  document.documentElement.classList.remove('dark');

  // Keep the functions for potential future use but don't apply dark mode
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    // Always set to light regardless of saved preference
    localStorage.setItem('theme', 'light');
  }
}

export function setTheme(theme: 'light' | 'dark' | 'system'): void {
  // Always force light theme regardless of parameter
  localStorage.setItem('theme', 'light');
  document.documentElement.classList.remove('dark');
}

export function getCurrentTheme(): 'light' | 'dark' {
  // Always return light
  return 'light';
}

export function getStoredTheme(): 'light' | 'dark' | 'system' | null {
  // Always return light
  return 'light';
}
