import { Helmet } from 'react-helmet-async';
import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { Offers } from '@typings/offer';
import OffersList from '@components/offers-list/offers-list';
import Map from '@components/map/map';
import { useState, useEffect } from 'react';
import { MapClassName } from '@const';
import CitiesList from '@components/cities-list/cities-list';
import { useAppSelector } from '@hooks/index';
import { SortType } from '@const';
import SortingOptions from '@components/sorting-options/sorting-options';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);
  const sortType = useAppSelector((state) => state.sortType);

  const [currentCityOffers, setCurrentCityOffers] = useState<Offers>(offers);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeOfferId);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city.name);

    const sortedOffers = [...filteredOffers].sort((a, b) => {
      switch (sortType) {
        case SortType.PriceLowToHigh:
          return a.price - b.price;
        case SortType.PriceHighToLow:
          return b.price - a.price;
        case SortType.TopRated:
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setCurrentCityOffers(sortedOffers);
  }, [city, offers, sortType]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav offers={offers}/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${currentCityOffers.length} places to stay in ${city.name}`}</b>
              <SortingOptions />
              <OffersList
                offers={currentCityOffers}
                onActiveOfferChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={city}
                offers={currentCityOffers}
                selectedOffer={selectedOffer}
                className={MapClassName.Main}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
