import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '@utils/mock-component';
import ReviewsList from './review-list';
import { makeFakeReviews, makeFakeState } from '@utils/mocks';
import { Reviews } from '@typings/review';


describe('Component: ReviewsList', () => {
  const initialState = makeFakeState();
  it('should display "No reviews available" message when there are no reviews', () => {
    const { withStoreComponent } = withStore(<ReviewsList reviews={[]} />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('No reviews available')).toBeInTheDocument();
  });

  it('should render up to 10 most recent reviews', () => {
    const reviewsWithDifferentDates: Reviews = [
      ...makeFakeReviews(15).map((review, index) => ({
        ...review,
        date: new Date(Date.now() - (index * 1000 * 60 * 60 * 24)).toISOString(),
      })),
    ];

    const { withStoreComponent } = withStore(<ReviewsList reviews={reviewsWithDifferentDates} />, initialState);
    render(withHistory(withStoreComponent));

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems).toHaveLength(10);
    expect(reviewItems[0]).toHaveTextContent(reviewsWithDifferentDates[0].comment);
    expect(reviewItems[9]).toHaveTextContent(reviewsWithDifferentDates[9].comment);
  });
});
