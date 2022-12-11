import { render } from '@testing-library/react';

import AuthContextProvider from './AuthContextProvider';

describe('AuthContextProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthContextProvider />);
    expect(baseElement).toBeTruthy();
  });
});
