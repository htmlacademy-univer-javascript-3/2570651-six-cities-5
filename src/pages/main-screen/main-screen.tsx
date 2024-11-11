import { Helmet } from 'react-helmet-async';
import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { Offers } from '../../types/offer';
import OffersList from '@components/offers-list/offers-list';
import Map from '@components/map/map';
import { useState, useEffect } from 'react';
import { MapClassName } from '@const';

import CitiesList from '@components/cities-list/cities-list';
import { Cities } from '@const';
import { useAppSelector } from '@hooks/index';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);
  const [currentCityOffers, setCurrentCityOffers] = useState<Offers>(offers);

  const city = useAppSelector((state) => state.city);
  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    setCurrentCityOffers(filteredOffers);
  }, [city, offers]);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const selectedOffer = offers.find((offer) => offer.id === activeOfferId);

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
            <CitiesList cities={Cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${currentCityOffers.length} places to stay in ${city}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                        Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList
                offers={currentCityOffers}
                onActiveOfferChange={setActiveOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={offers[0].city}
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
