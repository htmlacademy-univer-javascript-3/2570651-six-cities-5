import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import PlaceCard from './place-card';
import { makeFakeOffer, makeFakeState } from '@utils/mocks';
import { CardType } from '@const';

describe('Component: PlaceCard', () => {
  const mockOffer = makeFakeOffer();
  const mockOnMouseEnter = () => undefined;
  const mockOnMouseLeave = () => undefined;

  const defaultProps = {
    offer: mockOffer,
    onMouseEnter: mockOnMouseEnter,
    onMouseLeave: mockOnMouseLeave,
    cardType: CardType.Regular,
  };

  const initialState = makeFakeState();

  it('renders correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} />),
      initialState
    );

    const { container } = render(withStoreComponent);

    const article = container.querySelector('.place-card');
    const title = container.querySelector('.place-card__name');
    const price = container.querySelector('.place-card__price-value');

    expect(article).not.toBeNull();
    expect(title?.textContent).toBe(mockOffer.title);
    expect(price?.textContent).toContain(mockOffer.price);
  });

  it('renders premium badge when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };

    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} offer={premiumOffer} />),
      initialState
    );

    const { container } = render(withStoreComponent);
    const premiumBadge = container.querySelector('.place-card__mark');

    expect(premiumBadge).not.toBeNull();
  });

  it('renders correct image size for favorites', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard {...defaultProps} cardType={CardType.Favorites} />
      ),
      initialState
    );

    const { container } = render(withStoreComponent);
    const image = container.querySelector('.place-card__image') as HTMLImageElement;

    expect(image.width).toBe(150);
    expect(image.height).toBe(110);
  });

  it('renders offer type with capitalized first letter', () => {
    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} />),
      initialState
    );

    const { container } = render(withStoreComponent);
    const type = container.querySelector('.place-card__type');

    expect(type?.textContent).toBe(mockOffer.type[0].toUpperCase() + mockOffer.type.slice(1));
  });

  it('shows active bookmark button when offer is favorite', () => {
    const favoriteOffer = { ...mockOffer, isFavorite: true };

    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard {...defaultProps} offer={favoriteOffer} />),
      initialState
    );

    const { container } = render(withStoreComponent);
    const bookmarkButton = container.querySelector('.place-card__bookmark-button');

    expect(bookmarkButton?.classList.contains('place-card__bookmark-button--active')).toBe(true);
  });
});
