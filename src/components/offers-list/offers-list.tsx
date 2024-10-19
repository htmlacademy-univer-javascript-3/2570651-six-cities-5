import { Offers } from '../../types/offer';
import PlaceCard from '@components/place-card/place-card';

type OffersListProps = {
    offers: Offers;
};

export default function OffersList({offers}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<PlaceCard key={offer.id} offer={offer}/>))}
    </div>
  );
}
