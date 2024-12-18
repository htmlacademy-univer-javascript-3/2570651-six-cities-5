import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { City } from '@typings/city';
import { AppRoute, Cities } from '@const';
import { changeCity } from '@store/app-data/app-data';
import { getCity } from '@store/app-data/selectors';
import { Link } from 'react-router-dom';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);

  const handleCityChange = useCallback((evt: React.MouseEvent, city: City) => {
    evt.preventDefault();
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li
          key={city.name}
          className="locations__item"
        >
          <Link
            className={`locations__item-link tabs__item ${currentCity?.name === city.name ? 'tabs__item--active' : ''}`}
            to={AppRoute.Root}
            onClick={(evt) => handleCityChange(evt, city)}
          >
            <span>{city.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;
