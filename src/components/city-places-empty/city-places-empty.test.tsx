import { render, screen } from '@testing-library/react';
import CityPlacesEmpty from './city-places-empty';
import { Cities } from '@const';

describe('CityPlacesEmpty', () => {
  Cities.forEach((city) => {
    it(`renders the correct message for ${city.name}`, () => {
      render(<CityPlacesEmpty city={city.name} />);

      expect(screen.getByText(`We could not find any property available at the moment in ${city.name}`)).toBeInTheDocument();
      expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    });
  });
});
