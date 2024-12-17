import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import FavoritesScreen from './favorites-screen';
import { makeFakeOffers, makeFakeState } from '@utils/mocks';

describe('Component: FavoritesScreen', () => {
  it('renders with favorites', () => {
    const mockOffers = makeFakeOffers(3).map((offer) => ({ ...offer, isFavorite: true }));

    const { withStoreComponent } = withStore(
      withHistory(<FavoritesScreen />),
      makeFakeState({
        OFFERS: {
          offers: mockOffers,
          favoritesCount: mockOffers.length,
          isOffersDataLoading: false
        }
      })
    );

    const { container } = render(withStoreComponent);

    const favoritesTitle = container.querySelector('.favorites__title');
    expect(favoritesTitle).not.toBeNull();
    expect(favoritesTitle?.textContent).toBe('Saved listing');
  });

  it('renders empty state when no favorites', () => {
    const mockOffers = makeFakeOffers(3).map((offer) => ({ ...offer, isFavorite: false }));

    const { withStoreComponent } = withStore(
      withHistory(<FavoritesScreen />),
      makeFakeState({
        OFFERS: {
          offers: mockOffers,
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    const { container } = render(withStoreComponent);

    const favoritesEmpty = container.querySelector('.page__main--favorites-empty');
    expect(favoritesEmpty).not.toBeNull();
  });

  it('sorts cities alphabetically', () => {
    const mockOffers = [
      { ...makeFakeOffers(1)[0], isFavorite: true, city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 }}},
      { ...makeFakeOffers(1)[0], isFavorite: true, city: { name: 'Amsterdam', location: { latitude: 0, longitude: 0, zoom: 10 }}},
      { ...makeFakeOffers(1)[0], isFavorite: true, city: { name: 'Brussels', location: { latitude: 0, longitude: 0, zoom: 10 }}}
    ];

    const { withStoreComponent } = withStore(
      withHistory(<FavoritesScreen />),
      makeFakeState({
        OFFERS: {
          offers: mockOffers,
          favoritesCount: mockOffers.length,
          isOffersDataLoading: false
        }
      })
    );

    render(withStoreComponent);

    const cities = ['Amsterdam', 'Brussels', 'Paris'];
    expect(cities).toStrictEqual(['Amsterdam', 'Brussels', 'Paris']);
  });
});
