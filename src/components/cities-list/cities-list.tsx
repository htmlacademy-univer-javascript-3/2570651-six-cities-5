import { useAppDispatch } from '@hooks/index';
import { changeCity } from '@store/action';
import { City } from '@typings/city';
import { Cities } from '@const';

export default function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityChange = (city: City) => {
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
          <a className="locations__item-link tabs__item" href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
