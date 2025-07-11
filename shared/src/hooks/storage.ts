import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
  /**
   * Get item from localStorage with error handling
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue || null;
    }
  }

  /**
   * Set item in localStorage with error handling
   */
  setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing from localStorage for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all items from localStorage
   */
  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Check if localStorage is available
   */
  isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Convenience methods for common storage operations
  getAccessToken(): string | null {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  setAccessToken(token: string): boolean {
    return this.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setRefreshToken(token: string): boolean {
    return this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  getUser(): any | null {
    return this.getItem(STORAGE_KEYS.USER);
  }

  setUser(user: any): boolean {
    return this.setItem(STORAGE_KEYS.USER, user);
  }

  clearAuth(): boolean {
    const results = [
      this.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      this.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
      this.removeItem(STORAGE_KEYS.USER),
    ];
    return results.every(Boolean);
  }
}

export const storageService = new StorageService();
