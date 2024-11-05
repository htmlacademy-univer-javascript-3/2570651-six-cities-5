import { Offers } from '../../types/offer';
import PlaceCard from '@components/place-card/place-card';
import { CardType } from '@const';
import { useState } from 'react';

type NearbyOffersListProps = {
  offers?: Offers;
};

export default function NearbyOffersList({ offers = []}: NearbyOffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);

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
