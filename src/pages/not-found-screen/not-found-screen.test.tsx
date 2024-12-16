import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import NotFoundScreen from './not-found-screen';
import { makeFakeState } from '@utils/mocks';
import { AppRoute } from '@const';
import styles from './not-found-screen.module.css';

describe('Component: NotFoundScreen', () => {
  it('renders not found page', () => {
    const { withStoreComponent } = withStore(
      withHistory(<NotFoundScreen />),
      makeFakeState()
    );

    const { container } = render(withStoreComponent);

    const errorPage = container.querySelector(`.${styles.error__page}`);
    const heading = container.querySelector('h1');
    const link = container.querySelector('a');

    expect(errorPage).not.toBeNull();
    expect(heading?.textContent).toBe('Error 404: Page not found');
    expect(link?.getAttribute('href')).toBe(AppRoute.Root);
  });
});
