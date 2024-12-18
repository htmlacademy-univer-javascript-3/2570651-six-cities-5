import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import FooterLogo from './footer-logo';
import { AppRoute, Cities } from '@const';
import userEvent from '@testing-library/user-event';

describe('FooterLogo component', () => {
  it('renders the footer logo correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FooterLogo />)
    );

    render(withStoreComponent);

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '64');
    expect(logoImage).toHaveAttribute('height', '33');
  });

  it('renders the footer logo link with the correct href', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FooterLogo />)
    );

    render(withStoreComponent);

    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', AppRoute.Root);
  });

  it('changes city to Paris on click', async () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<FooterLogo />)
    );

    render(withStoreComponent);

    const logoLink = screen.getByRole('link');
    await userEvent.click(logoLink);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe('APP/changeCity');
    expect(actions[0].payload).toEqual(Cities[0]);
  });
});
