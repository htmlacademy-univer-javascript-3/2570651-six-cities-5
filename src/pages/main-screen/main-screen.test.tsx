import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import MainScreen from './main-screen';
import { makeFakeState, makeFakeOffers } from '@utils/mocks';
import { Cities, SortType } from '@const';

describe('Component: MainScreen', () => {
  it('renders main page with offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainScreen />),
      makeFakeState()
    );

    const { container } = render(withStoreComponent);

    const header = container.querySelector('.header');
    const main = container.querySelector('.page__main--index');

    expect(header).not.toBeNull();
    expect(main).not.toBeNull();
  });

  it('renders empty state when no offers for city', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainScreen />),
      makeFakeState({
        APP: {
          city: Cities[0],
          sortType: SortType.Popular
        },
        OFFERS: {
          offers: [],
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    const { container } = render(withStoreComponent);
    const emptyState = container.querySelector('.cities__places-container--empty');

    expect(emptyState).not.toBeNull();
  });

  it('filters offers by selected city', () => {
    const mockOffers = makeFakeOffers().map((offer) => ({
      ...offer,
      city: { ...offer.city, name: Cities[0].name }
    }));

    const { withStoreComponent } = withStore(
      withHistory(<MainScreen />),
      makeFakeState({
        APP: {
          city: Cities[0],
          sortType: SortType.Popular
        },
        OFFERS: {
          offers: mockOffers,
          favoritesCount: 0,
          isOffersDataLoading: false
        }
      })
    );

    const { container } = render(withStoreComponent);
    const placesList = container.querySelector('.cities__places-list');

    expect(placesList).not.toBeNull();
  });
});
