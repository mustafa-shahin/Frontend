import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  description?: string;
  sections?: FooterSection[];
  showCopyright?: boolean;
  copyrightText?: string;
  showPoweredBy?: boolean;
  className?: string;
  socialLinks?: FooterLink[];
}

export function Footer({
  logo,
  logoAlt = 'Logo',
  title = 'CMS Designer',
  description = 'A powerful content management system for modern websites.',
  sections = [],
  showCopyright = true,
  copyrightText,
  showPoweredBy = true,
  className,
  socialLinks = [],
}: FooterProps) {
  const { t } = useTranslation('navigation');
  const currentYear = new Date().getFullYear();

  const defaultCopyright =
    copyrightText || t('copyright', { year: currentYear });

  return (
    <footer
      className={cn(
        'bg-gray-50 border-t border-gray-200',
        'dark:bg-gray-900 dark:border-gray-700',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                {logo ? (
                  <img src={logo} alt={logoAlt} className="h-8 w-auto" />
                ) : (
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-paint-brush text-white text-sm" />
                  </div>
                )}
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {title}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                {description}
              </p>

              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className="sr-only">{link.label}</span>
                      <i
                        className={`fab fa-${link.label.toLowerCase()} text-lg`}
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Footer sections */}
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                        {link.external && (
                          <i className="fas fa-external-link-alt ml-1 text-xs" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {showCopyright && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {defaultCopyright}
              </div>
            )}

            {showPoweredBy && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('poweredBy')}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
