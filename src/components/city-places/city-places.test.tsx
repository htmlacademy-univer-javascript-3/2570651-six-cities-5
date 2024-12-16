import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import CityPlaces from './city-places';
import { makeFakeOffers, makeFakeState } from '@utils/mocks';

describe('Component: CityPlaces', () => {
  const mockCity = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  const mockOffers = makeFakeOffers(3);
  const mockSelectedOffer = mockOffers[0];
  const mockOnActiveOfferChange = () => undefined;

  const defaultProps = {
    city: mockCity,
    offers: mockOffers,
    selectedOffer: mockSelectedOffer,
    onActiveOfferChange: mockOnActiveOfferChange,
  };

  const initialState = makeFakeState();

  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<CityPlaces {...defaultProps} />),
      initialState
    );

    const { container } = render(withStoreComponent);
    const placesCount = container.querySelector('.places__found');

    expect(placesCount?.textContent).toBe(`${mockOffers.length} places to stay in ${mockCity.name}`);
  });

  it('renders with empty offers', () => {
    const { withStoreComponent } = withStore(
      withHistory(<CityPlaces {...defaultProps} offers={[]} />),
      initialState
    );

    const { container } = render(withStoreComponent);
    const placesCount = container.querySelector('.places__found');

    expect(placesCount?.textContent).toBe(`0 places to stay in ${mockCity.name}`);
  });

  it('renders with undefined selected offer', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <CityPlaces {...defaultProps} selectedOffer={undefined} />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);
    const placesCount = container.querySelector('.places__found');

    expect(placesCount?.textContent).toBe(`${mockOffers.length} places to stay in ${mockCity.name}`);
  });
});
