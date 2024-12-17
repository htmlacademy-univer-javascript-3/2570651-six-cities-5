import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import Logo from './logo';
import userEvent from '@testing-library/user-event';
import { Cities } from '@const';

describe('Logo component', () => {
  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<Logo />)
    );

    render(withStoreComponent);

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '81');
    expect(logoImage).toHaveAttribute('height', '41');
  });

  it('contains a link to the root route and changes city to Paris on click', async () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<Logo />)
    );

    render(withStoreComponent);

    const logoLink = screen.getByRole('link');
    await userEvent.click(logoLink);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe('APP/changeCity');
    expect(actions[0].payload).toEqual(Cities[0]);
  });
});
