import { render, screen, fireEvent } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import MemoizedCitiesList from './cities-list';
import { Cities, SortType } from '@const';
import { makeFakeState } from '@utils/mocks';

const initialState = makeFakeState({
  APP: {
    city: Cities[0],
    sortType: SortType.Popular
  }
});

describe('CitiesList Component', () => {
  it('should render cities list and handle city change', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MemoizedCitiesList />),
      initialState
    );

    render(withStoreComponent);

    Cities.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });

    const parisLink = screen.getByText('Paris').closest('a');
    if (parisLink) {
      fireEvent.click(parisLink);
      expect(parisLink).toHaveClass('tabs__item--active');
    }
  });

  it('should dispatch the correct action on city change', () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<MemoizedCitiesList />),
      initialState
    );

    render(withStoreComponent);

    const amsterdamLink = screen.getByText('Amsterdam').closest('a');
    if (amsterdamLink) {
      fireEvent.click(amsterdamLink);
      const actions = mockStore.getActions();
      expect(actions[0].type).toBe('APP/changeCity');
      expect(actions[0].payload).toEqual(Cities[3]);
    }
  });
});
