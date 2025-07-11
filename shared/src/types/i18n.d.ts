declare module '*.json' {
  const value: any;
  export default value;
}

export interface TranslationResources {
  common: {
    loading: string;
    error: string;
    search: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
    create: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    confirm: string;
    yes: string;
    no: string;
  };
  header: {
    title: string;
    signOut: string;
    profile: string;
    settings: string;
  };
  footer: {
    poweredBy: string;
    allRightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
    contactSupport: string;
  };
  pages: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    noPages: string;
    noPagesDescription: string;
    noSearchResults: string;
    createFirstPage: string;
    openInDesigner: string;
    lastUpdated: string;
    version: string;
    versions: string;
    total: string;
    status: {
      published: string;
      draft: string;
      archived: string;
    };
    pagination: {
      showing: string;
      to: string;
      of: string;
      results: string;
      perPage: string;
    };
    errors: {
      loadingFailed: string;
      loadingDescription: string;
    };
  };
  auth: {
    signIn: string;
    signOut: string;
    email: string;
    password: string;
    rememberMe: string;
    forgotPassword: string;
    loginFailed: string;
    sessionExpired: string;
  };
}
