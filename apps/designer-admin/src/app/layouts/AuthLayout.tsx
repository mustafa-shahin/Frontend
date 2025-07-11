import React from 'react';
import { Card, Icon } from '@frontend/shared';
import { useTranslation } from '@frontend/shared';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full space-y-8">
        {/* App branding */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="paint-brush" className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-text-primary">
            {t('header.title')}
          </h1>
          <p className="mt-2 text-base text-text-secondary leading-relaxed">
            {t('header.subtitle')}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-sm font-medium rounded-full border border-brand-200">
            <Icon name="shield-check" className="h-4 w-4" />
            {t('auth.adminAccess')}
          </div>
        </div>

        {/* Auth form card */}
        <Card
          variant="elevated"
          className="shadow-xl border border-border-light"
        >
          <div className="p-8">{children}</div>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-text-tertiary space-y-2">
          <p>
            © 2024 {t('header.title')}. {t('footer.allRightsReserved')}
          </p>
          <p>
            {t('footer.contactSupport')}?{' '}
            <a
              href="mailto:support@cmsdesigner.com"
              className="text-brand-600 hover:text-brand-700 transition-colors"
            >
              support@cmsdesigner.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
