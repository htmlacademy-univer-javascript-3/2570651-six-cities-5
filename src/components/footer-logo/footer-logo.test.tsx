import { render, screen } from '@testing-library/react';
import FooterLogo from './footer-logo';
import { AppRoute } from '@const';

describe('FooterLogo component', () => {
  it('renders the footer logo correctly', () => {
    render(<FooterLogo />);

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '64');
    expect(logoImage).toHaveAttribute('height', '33');
  });

  it('renders the footer logo link with the correct href', () => {
    render(<FooterLogo />);

    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', AppRoute.Root);
  });
});
