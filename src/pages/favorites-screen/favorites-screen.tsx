import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { Link } from 'react-router-dom';
import { AppRoute, CardType } from '@const';
import PlaceCard from '@components/place-card/place-card';
import { useAppSelector } from '@hooks/index';


export default function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offersList);

  const favorites = offers.filter((offer) => offer.isFavorite);
  const cities = Array.from(new Set(favorites.map((offer) => offer.city.name))).sort();

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav offers={offers} />
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.length > 0 ? (
                cities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favorites
                        .filter((favorite) => favorite.city.name === city)
                        .map((favorite) => (
                          <PlaceCard
                            key={favorite.id}
                            offer={favorite}
                            onMouseEnter={() => {}}
                            onMouseLeave={() => {}}
                            cardType={CardType.Favorites}
                          />
                        ))}
                    </div>
                  </li>
                ))
              ) : (
                <li style={{ textAlign: 'center', marginTop: '15%', fontSize: '32px' }}>
                  Nothing yet saved
                </li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
