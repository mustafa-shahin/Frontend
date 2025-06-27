import { render } from '@testing-library/react';

import FrontendShared from './shared';

describe('FrontendShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendShared />);
    expect(baseElement).toBeTruthy();
  });
});
