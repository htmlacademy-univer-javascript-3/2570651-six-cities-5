import { useState } from 'react';
import { useAppDispatch } from '@hooks/index';
import { changeCity } from '@store/action';
import { City } from '@typings/city';
import { Cities } from '@const';

export default function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeCity, setActiveCity] = useState<City | null>(Cities[0]);

  const handleCityChange = (city: City) => {
    setActiveCity(city);
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li
          key={city.name}
          className="locations__item"
          onClick={() => handleCityChange(city)}
        >
          <a
            className={`locations__item-link tabs__item ${activeCity?.name === city.name ? 'tabs__item--active' : ''}`}
            href="#"
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
