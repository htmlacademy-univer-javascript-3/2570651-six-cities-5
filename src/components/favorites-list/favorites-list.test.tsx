import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '@utils/mock-component';
import MemoizedFavoritesList from './favorites-list';
import { makeFakeOffers, makeFakeState } from '@utils/mocks';

const fakeOffers = makeFakeOffers(5);
const cities = Array.from(new Set(fakeOffers.map((offer) => offer.city.name)));
const initialState = makeFakeState();

describe('FavoritesList Component', () => {
  it('should render the correct number of cities', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={cities} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);

    cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should render the correct number of favorite offers for each city', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={cities} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);

    cities.forEach(() => {
      const cityFavorites = screen.queryAllByText(/Tile House/);
      expect(cityFavorites.length).toBeGreaterThan(0);
    });
  });

  it('should show no offers for a city with no favorites', () => {
    const emptyCity = 'Berlin';
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedFavoritesList cities={[emptyCity]} favorites={fakeOffers} />),
      initialState
    );

    render(withStoreComponent);

    const cityFavorites = screen.queryAllByText(/Tile House/);
    expect(cityFavorites.length).toBe(0);
  });
});
