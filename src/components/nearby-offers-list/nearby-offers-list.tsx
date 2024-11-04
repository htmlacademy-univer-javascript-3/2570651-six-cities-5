import { Offers } from '../../types/offer';
import PlaceCard from '@components/place-card/place-card';
import { CardType } from '@const';
import { useState, useEffect } from 'react';

type NearbyOffersListProps = {
  offers?: Offers;
  onActiveOfferChange: (offerId: string | null) => void;
};

export default function NearbyOffersList({ offers = [], onActiveOfferChange }: NearbyOffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  useEffect(() => {
    onActiveOfferChange(activeOfferId);
  }, [activeOfferId, onActiveOfferChange]);

  const handleMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            onMouseEnter={() => handleMouseEnter(offer.id)}
            onMouseLeave={handleMouseLeave}
            cardType={CardType.Nearest}
          />
        ))}
      </div>
    </section>
  );
}
