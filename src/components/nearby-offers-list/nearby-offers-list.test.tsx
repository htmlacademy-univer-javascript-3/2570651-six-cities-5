import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import NearbyOffersList from './nearby-offers-list';
import { makeFakeOffers, makeFakeState } from '@utils/mocks';
import styles from './nearby-offers-list.module.css';

describe('Component: NearbyOffersList', () => {
  const mockOffers = makeFakeOffers(3);
  const initialState = makeFakeState();

  it('renders with offers correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <NearbyOffersList offers={mockOffers} />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);

    const nearPlacesSection = container.querySelector('.near-places');
    const placeCards = container.querySelectorAll('.place-card');

    expect(nearPlacesSection).not.toBeNull();
    expect(placeCards.length).toBe(mockOffers.length);
  });

  it('renders with undefined offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <NearbyOffersList offers={undefined} />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);

    const emptyMessage = container.querySelector(`.${styles.places__empty}`);
    expect(emptyMessage).not.toBeNull();
  });

  it('renders with empty offers array', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <NearbyOffersList offers={[]} />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);

    const emptyMessage = container.querySelector(`.${styles.places__empty}`);
    expect(emptyMessage).not.toBeNull();
    expect(emptyMessage?.textContent).toBe('No places in the neighbourhood available');
  });
});
