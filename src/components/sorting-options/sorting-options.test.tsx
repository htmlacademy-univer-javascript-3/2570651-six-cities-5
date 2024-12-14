import { render, screen, fireEvent } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import SortingOptions from './sorting-options';
import { SortType } from '@const';
import { makeFakeState } from '@utils/mocks';

describe('Component: SortingOptions', () => {
  const initialState = makeFakeState();

  it('should render sorting options correctly and handle interactions', () => {
    const { withStoreComponent, mockStore } = withStore(<SortingOptions />, initialState);
    render(withHistory(withStoreComponent));

    const currentSortType = screen.getByText((_content, element) => element?.textContent === SortType.Popular);
    expect(currentSortType).toBeInTheDocument();

    fireEvent.click(currentSortType);
    const sortOptionsList = screen.getByRole('list');

    expect(sortOptionsList).toHaveClass('places__options--custom');

    const sortOptions = screen.getAllByRole('listitem');
    expect(sortOptions).toHaveLength(Object.values(SortType).length);

    const priceLowToHighOption = screen.getByText(SortType.PriceLowToHigh, { selector: '.places__option' });
    fireEvent.click(priceLowToHighOption);

    const actions = mockStore.getActions();
    expect(actions).toEqual([
      {
        type: 'APP/setSortType',
        payload: SortType.Popular,
      },
      {
        type: 'APP/setSortType',
        payload: SortType.PriceLowToHigh,
      },
    ]);

    expect(screen.queryByRole('list')).not.toHaveClass('places__options--opened');
  });
});
