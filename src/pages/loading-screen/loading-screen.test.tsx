import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('renders loading text', () => {
    const { container } = render(<LoadingScreen />);

    const loadingText = container.querySelector('p');
    expect(loadingText).not.toBeNull();
    expect(loadingText?.textContent).toBe('Loading ...');
  });
});
