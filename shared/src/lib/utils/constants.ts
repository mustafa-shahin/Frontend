export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const GRID_COLUMNS = 12;

export const COMPONENT_LIBRARY = [
  {
    type: 'Button',
    name: 'Button',
    description: 'Interactive button component',
    icon: 'fas fa-hand-pointer',
    category: 'Basic',
  },
  {
    type: 'Text',
    name: 'Text',
    description: 'Text content block',
    icon: 'fas fa-font',
    category: 'Basic',
  },
  {
    type: 'Image',
    name: 'Image',
    description: 'Image display component',
    icon: 'fas fa-image',
    category: 'Media',
  },
  {
    type: 'Container',
    name: 'Container',
    description: 'Layout container',
    icon: 'fas fa-square',
    category: 'Layout',
  },
] as const;

export const DEFAULT_COMPONENT_PROPS = {
  Button: {
    text: 'Click me',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
    icon: '',
    href: '',
  },
  Text: {
    content: 'Your text here',
    tag: 'p',
    alignment: 'left',
  },
  Image: {
    src: 'https://via.placeholder.com/400x300?text=Image',
    alt: 'Image description',
    width: '100%',
    height: 'auto',
    objectFit: true,
  },
  Container: {
    padding: 'md',
    background: 'transparent',
    border: false,
    shadow: false,
  },
} as const;
