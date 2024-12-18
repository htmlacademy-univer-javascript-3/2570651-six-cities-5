import { describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import OfferScreen from './offer-screen';
import { makeFakeOffer, makeFakeOfferDetails, makeFakeOffers, makeFakeReviews, makeFakeState } from '@utils/mocks';
import { createMemoryHistory } from 'history';
import * as RouterDOM from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof RouterDOM>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      id: 'test-id-1'
    })
  };
});


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

  it('renders offer details when offer exists', async () => {
    const mockHistory = createMemoryHistory();
    const mockOfferId = 'test-id-1';
    mockHistory.push(`/offer/${mockOfferId}`);

    const baseOffer = makeFakeOffer();
    const mockOffer = {
      ...makeFakeOfferDetails(),
      ...baseOffer,
      id: mockOfferId,
    };
    const mockNearbyOffers = makeFakeOffers(3);
    const offers = [mockOffer, ...mockNearbyOffers];

    const favoritesCount = offers.filter((offer) => offer.isFavorite).length;

  
    const { withStoreComponent } = withStore(
      withHistory(<OfferScreen />, mockHistory),
      makeFakeState({
        OFFERS: {
          offers: offers,
          favoritesCount: favoritesCount,
          isOffersDataLoading: false
        },
        CURRENT_OFFER: {
          offerInfo: mockOffer,
          nearbyOffers: mockNearbyOffers,
          reviews: makeFakeReviews(5),
          isOfferInDetailsDataLoading: false
        }
      })
    );

    const { container } = render(withStoreComponent);

    await waitFor(() => {
      expect(container.querySelector('.offer__name')?.textContent).toBe(mockOffer.title);
      expect(container.querySelector('.offer__price-value')?.textContent).toBe(`€${mockOffer.price}`);
      expect(container.querySelectorAll('.offer__image').length).toBe(mockOffer.images.length);
      expect(container.querySelector('.offer__rating-value')?.textContent).toBe(mockOffer.rating.toString());

      expect(container.querySelector('.offer__inside-list')).toBeInTheDocument();
      expect(container.querySelectorAll('.offer__inside-item')).toHaveLength(mockOffer.goods.length);
      expect(container.querySelector('.offer__inside')).toHaveTextContent(mockOffer.goods[0]);

      if (mockOffer.isPremium) {
        const premiumBadge = container.querySelector('.offer__mark');
        expect(premiumBadge).toBeInTheDocument();
        expect(premiumBadge).toHaveTextContent('Premium');
      }

      expect(container.querySelector('.offer__user-name')?.textContent).toBe(mockOffer.host.name);
      expect(container.querySelector('.offer__text')?.textContent).toBe(mockOffer.description);

      expect(container.querySelector('.reviews__amount')).toHaveTextContent('5');
      expect(container.querySelectorAll('.near-places__card')).toHaveLength(3);
    });
  });
});
