import { cn } from '../../utils/cn';
import { Icon } from '../ui/Icon';

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
  className?: string;
  companyName?: string;
  companyUrl?: string;
  copyright?: string;
  sections?: FooterSection[];
  socialLinks?: {
    platform: string;
    url: string;
    icon: string;
  }[];
  showCopyright?: boolean;
  showPoweredBy?: boolean;
  poweredByText?: string;
  poweredByUrl?: string;
  variant?: 'default' | 'minimal' | 'rich';
  backgroundColor?: string;
}

export function Footer({
  className,
  companyName = 'Your Company',
  companyUrl,
  copyright,
  sections = [],
  socialLinks = [],
  showCopyright = true,
  showPoweredBy = true,
  poweredByText = 'CMS Designer',
  poweredByUrl = '#',
  variant = 'default',
  backgroundColor,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText =
    copyright || `© ${currentYear} ${companyName}. All rights reserved.`;

  const variantStyles = {
    default: 'bg-gray-50 border-t border-gray-200',
    minimal: 'bg-white',
    rich: 'bg-gray-900 text-white',
  };

  const textStyles = {
    default: 'text-gray-600',
    minimal: 'text-gray-500',
    rich: 'text-gray-300',
  };

  const linkStyles = {
    default: 'text-gray-500 hover:text-gray-900',
    minimal: 'text-gray-400 hover:text-gray-600',
    rich: 'text-gray-400 hover:text-white',
  };

  if (variant === 'minimal') {
    return (
      <footer
        className={cn('py-4', variantStyles[variant], className)}
        style={backgroundColor ? { backgroundColor } : undefined}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {showCopyright && (
              <p className={cn('text-sm', textStyles[variant])}>
                {copyrightText}
              </p>
            )}

            {showPoweredBy && (
              <div className="flex items-center gap-2">
                <span className={cn('text-sm', textStyles[variant])}>
                  Powered by
                </span>
                <a
                  href={poweredByUrl}
                  className={cn('text-sm font-medium', linkStyles[variant])}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {poweredByText}
                </a>
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className={cn(variantStyles[variant], className)}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Rich footer with sections */}
        {variant === 'rich' && sections.length > 0 && (
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className={cn('text-sm', linkStyles[variant])}
                          target={link.external ? '_blank' : undefined}
                          rel={
                            link.external ? 'noopener noreferrer' : undefined
                          }
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom section */}
        <div
          className={cn(
            'py-6',
            variant === 'rich' && sections.length > 0
              ? 'border-t border-gray-800'
              : ''
          )}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left side - Copyright */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {showCopyright && (
                <p className={cn('text-sm', textStyles[variant])}>
                  {companyUrl ? (
                    <a
                      href={companyUrl}
                      className={cn('hover:underline', linkStyles[variant])}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {copyrightText}
                    </a>
                  ) : (
                    copyrightText
                  )}
                </p>
              )}
            </div>

            {/* Right side - Social links and powered by */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={cn(
                        'transition-colors',
                        variant === 'rich'
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-400 hover:text-gray-600'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.platform}
                    >
                      <Icon name={social.icon as any} size="sm" />
                    </a>
                  ))}
                </div>
              )}

              {/* Powered by */}
              {showPoweredBy && (
                <div className="flex items-center gap-2">
                  <span className={cn('text-sm', textStyles[variant])}>
                    Powered by
                  </span>
                  <a
                    href={poweredByUrl}
                    className={cn(
                      'text-sm font-medium flex items-center gap-1',
                      linkStyles[variant]
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="paint-brush" size="xs" />
                    {poweredByText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
