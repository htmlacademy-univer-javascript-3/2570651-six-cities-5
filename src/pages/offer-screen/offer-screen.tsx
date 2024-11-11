import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import ReviewsList from '@components/review-list/review-list';
import Map from '@components/map/map';
import ReviewSendingForm from '@components/review-sending-form/review-sending-form';
import NearbyOffersList from '@components/nearby-offers-list/nearby-offers-list';
import { MapClassName } from '@const';
import { useAppSelector } from '@hooks/index';

export default function OfferScreen(): JSX.Element {
  const params = useParams();
  const offers = useAppSelector((state) => state.offersList);
  const reviews = useAppSelector((state) => state.reviews);
  const offersInDetails = useAppSelector((state) => state.offersInDetails);

  const mainOffer = offers.find((item) => item.id === params.id);
  const detailedOffer = offersInDetails.find((item) => item.id === params.id);

  if (!mainOffer || !detailedOffer) {
    return <NotFoundScreen />;
  }

  const nearbyOffers = offers.filter(
    (offer) => offer.city.name === mainOffer.city.name && offer.id !== mainOffer.id
  ).slice(0, 3); //в будущем переделать, в данный момент "неподалеку" все с одного города

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
              {detailedOffer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
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
                <li className="offer__feature offer__feature--entire">{detailedOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{detailedOffer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {detailedOffer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{mainOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {detailedOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${detailedOffer.host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={detailedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{detailedOffer.host.name}</span>
                  {detailedOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{detailedOffer.description}</p>
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
            offers={[mainOffer, ...nearbyOffers]}
            selectedOffer={mainOffer}
            className={MapClassName.Offer}
          />
        </section>
        <div className="container">
          <NearbyOffersList offers={nearbyOffers}/>
        </div>
      </main>
    </div>
  );
}