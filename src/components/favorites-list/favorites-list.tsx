import { Link } from 'react-router-dom';
import PlaceCard from '@components/place-card/place-card';
import { AppRoute, CardType, Cities } from '@const';
import { Offers } from '@typings/offer';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@hooks/index';
import { changeCity } from '@store/app-data/app-data';

interface FavoritesListProps {
  cities: string[];
  favorites: Offers;
}

function FavoritesList({ cities, favorites }: FavoritesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = useCallback((cityName: string) => {
    const selectedCity = Cities.find((city) => city.name === cityName);
    if (selectedCity) {
      dispatch(changeCity(selectedCity));
    }
  }, [dispatch]);

  const renderCityFavorites = useCallback((city: string) => favorites
    .filter((favorite) => favorite.city.name === city)
    .map((favorite) => (
      <PlaceCard
        key={favorite.id}
        offer={favorite}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        cardType={CardType.Favorites}
      />
    )), [favorites]);

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root} onClick={() => handleCityClick(city)}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {renderCityFavorites(city)}
          </div>
        </li>
      ))}
    </ul>
  );
}

const MemoizedFavoritesList = memo(FavoritesList);
export default MemoizedFavoritesList;
