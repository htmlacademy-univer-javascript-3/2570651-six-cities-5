import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import Map from './map';
import { makeFakeOffers } from '@utils/mocks';
import { Cities } from '@const';

const mockMarker = {
  setIcon: vi.fn().mockReturnThis(),
  addTo: vi.fn().mockReturnThis(),
  remove: vi.fn().mockReturnThis()
};

const mockLayerGroup = {
  addTo: vi.fn().mockReturnThis(),
  clearLayers: vi.fn().mockReturnThis()
};

const mockMapInstance = {
  setView: vi.fn().mockReturnThis(),
  removeLayer: vi.fn().mockReturnThis(),
  addLayer: vi.fn().mockReturnThis()
};

vi.mock('leaflet', () => ({
  Icon: vi.fn(),
  Marker: vi.fn(() => mockMarker),
  layerGroup: vi.fn(() => mockLayerGroup),
  Map: vi.fn(() => mockMapInstance),
  TileLayer: vi.fn()
}));

vi.mock('@hooks/use-map', () => ({
  default: () => mockMapInstance
}));

describe('Component: Map', () => {
  const mockOffers = makeFakeOffers(3);
  const mockCity = Cities[0];
  const mockClassName = 'cities__map';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const { container } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        selectedOffer={undefined}
        className={mockClassName}
      />
    );

    expect(container.querySelector(`.${mockClassName}`)).not.toBeNull();
    expect(mockLayerGroup.addTo).toHaveBeenCalledWith(mockMapInstance);
  });

  it('creates markers for all offers', () => {
    render(
      <Map
        city={mockCity}
        offers={mockOffers}
        selectedOffer={undefined}
        className={mockClassName}
      />
    );

    expect(mockMarker.addTo).toHaveBeenCalledTimes(mockOffers.length);
  });

  it('uses current custom icon for selected offer', () => {
    const selectedOffer = mockOffers[0];

    render(
      <Map
        city={mockCity}
        offers={mockOffers}
        selectedOffer={selectedOffer}
        className={mockClassName}
      />
    );

    expect(mockMarker.setIcon).toHaveBeenCalled();
  });

  it('updates markers when offers change', () => {
    const { rerender } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        selectedOffer={undefined}
        className={mockClassName}
      />
    );

    const newOffers = makeFakeOffers(2);
    rerender(
      <Map
        city={mockCity}
        offers={newOffers}
        selectedOffer={undefined}
        className={mockClassName}
      />
    );

    expect(mockLayerGroup.clearLayers).toHaveBeenCalledTimes(2);
  });
});
