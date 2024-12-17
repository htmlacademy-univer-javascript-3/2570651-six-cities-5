import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '@utils/mock-component';
import MemoizedFavoritesList from './favorites-list';
import { makeFakeState, makeFakeOffers } from '@utils/mocks';
import { Cities } from '@const';

describe('FavoritesList Component', () => {
  const testCity = Cities[0];
  const fakeOffers = makeFakeOffers(1).map((offer) => ({
    ...offer,
    city: testCity,
    isFavorite: true
  }));

  const cities = [testCity.name];
  const initialState = makeFakeState();

  it('should render the correct number of cities', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={cities} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);
    expect(screen.getByText(testCity.name)).toBeInTheDocument();
  });

  it('should render the correct number of favorite offers for each city', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={cities} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);
    const cityFavorites = screen.getAllByRole('article', { name: '' });
    expect(cityFavorites.length).toBe(1);
  });

  it('should show no offers for a city with no favorites', () => {
    const emptyCity = Cities[1].name;
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={[emptyCity]} favorites={[]} />),
      initialState
    );

    render(withStoreComponent);
    const cityFavorites = screen.queryAllByRole('article');
    expect(cityFavorites.length).toBe(0);
  });
});
