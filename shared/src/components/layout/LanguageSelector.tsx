import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import { Icon } from '../ui/Icon';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation('navigation');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 text-sm rounded-lg',
          'text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'transition-all duration-200 font-medium'
        )}
        aria-label={t('languageSelector')}
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="hidden sm:block">{currentLanguage.name}</span>
        <Icon
          name="chevron-down"
          className={cn(
            'text-xs text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-40 rounded-xl shadow-lg z-50',
            'bg-white border border-gray-100',
            'py-2 animate-fade-in'
          )}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={cn(
                'w-full flex items-center space-x-3 px-4 py-2 text-sm text-left',
                'hover:bg-gray-50 transition-colors duration-150 rounded-lg mx-1',
                language.code === i18n.language
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700'
              )}
            >
              <span className="text-base">{language.flag}</span>
              <span className="font-medium flex-1">{language.name}</span>
              {language.code === i18n.language && (
                <Icon name="check" className="text-blue-600 text-xs" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
