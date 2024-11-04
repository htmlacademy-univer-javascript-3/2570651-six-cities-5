import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import { Offers } from '../../types/offer';
import { Review } from '../../types/review';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import ReviewsList from '@components/review-list/review-list';
import Map from '@components/map/map';
import ReviewSendingForm from '@components/review-sending-form/review-sending-form';
import NearbyOffersList from '@components/nearby-offers-list/nearby-offers-list';
import { useState } from 'react';
import { MapClassName } from '@const';

type OfferScreenProps = {
  offers: Offers;
  reviews: Review[];
};

export default function OfferScreen({ offers, reviews }: OfferScreenProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const params = useParams();
  const mainOffer = offers.find((item) => item.id === params.id); // не забыть, что mainOffer должен быть оранжевым

  if (!mainOffer) {
    return <NotFoundScreen />;
  }

  const nearbyOffers = offers.filter(
    (offer) => offer.city.name === mainOffer.city.name && offer.id !== mainOffer.id
  ); //в будущем переделать, в данный момент "неподалеку" все с одного города

  const limitedNearbyOffers = nearbyOffers.slice(0, 3);

  const selectedOffer = nearbyOffers.find((offer) => offer.id === activeOfferId);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer {mainOffer.id}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav offers={offers}/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio"/>
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio"/>
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {mainOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {mainOffer.title}
                </h1>
                <button className={`offer__bookmark-button ${mainOffer.isFavorite && 'offer__bookmark-button--active'} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{mainOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `calc(100% / 5 * ${mainOffer.rating})`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{mainOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                      Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                      3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                      Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{mainOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">
                        Wi-Fi
                  </li>
                  <li className="offer__inside-item">
                        Washing machine
                  </li>
                  <li className="offer__inside-item">
                        Towels
                  </li>
                  <li className="offer__inside-item">
                        Heating
                  </li>
                  <li className="offer__inside-item">
                        Coffee machine
                  </li>
                  <li className="offer__inside-item">
                        Baby seat
                  </li>
                  <li className="offer__inside-item">
                        Kitchen
                  </li>
                  <li className="offer__inside-item">
                        Dishwasher
                  </li>
                  <li className="offer__inside-item">
                        Cabel TV
                  </li>
                  <li className="offer__inside-item">
                        Fridge
                  </li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                        Angelina
                  </span>
                  <span className="offer__user-status">
                        Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                        An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews ? reviews.length : 0}</span></h2>
                <ReviewsList reviews={reviews}/>
                <ReviewSendingForm />
              </section>
            </div>
          </div>
          <Map
            city={mainOffer.city}
            offers={[mainOffer, ...limitedNearbyOffers]}
            selectedOffer={selectedOffer}
            className={MapClassName.Offer}
          />
        </section>
        <div className="container">
          <NearbyOffersList offers={nearbyOffers} onActiveOfferChange={setActiveOfferId}/>
        </div>
      </main>
    </div>
  );
}
