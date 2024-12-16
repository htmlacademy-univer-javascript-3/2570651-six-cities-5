import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import OfferScreen from './offer-screen';
import { makeFakeState } from '@utils/mocks';
import { createMemoryHistory } from 'history';

describe('Component: OfferScreen', () => {
  it('renders loading screen when data is loading', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push('/offer/1');

    const { withStoreComponent } = withStore(
      withHistory(<OfferScreen />, mockHistory),
      makeFakeState({
        CURRENT_OFFER: {
          offerInfo: null,
          nearbyOffers: [],
          reviews: [],
          isOfferInDetailsDataLoading: true
        }
      })
    );

    const { container } = render(withStoreComponent);
    const loadingText = container.querySelector('p');
    expect(loadingText?.textContent).toBe('Loading ...');
  });

  it('renders not found screen when no offer data', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push('/offer/1');

    const { withStoreComponent } = withStore(
      withHistory(<OfferScreen />, mockHistory),
      makeFakeState({
        CURRENT_OFFER: {
          offerInfo: null,
          nearbyOffers: [],
          reviews: [],
          isOfferInDetailsDataLoading: false
        }
      })
    );

    const { container } = render(withStoreComponent);
    const notFoundSection = container.querySelector('.six-cities');
    expect(notFoundSection).not.toBeNull();
  });
});
