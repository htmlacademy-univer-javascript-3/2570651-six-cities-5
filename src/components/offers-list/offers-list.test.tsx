import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import OffersList from './offers-list';
import { makeFakeOffers, makeFakeState } from '@utils/mocks';

describe('Component: OffersList', () => {
  const mockOffers = makeFakeOffers(3);
  const mockOnActiveOfferChange = () => undefined;

  const initialState = makeFakeState();

  it('renders offers list correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <OffersList
          offers={mockOffers}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);
    const offersList = container.querySelector('.cities__places-list');
    const placeCards = container.querySelectorAll('.place-card');

    expect(offersList).not.toBeNull();
    expect(placeCards.length).toBe(mockOffers.length);
  });

  it('renders empty offers list', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <OffersList
          offers={[]}
          onActiveOfferChange={mockOnActiveOfferChange}
        />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);
    const placeCards = container.querySelectorAll('.place-card');

    expect(placeCards.length).toBe(0);
  });
});
