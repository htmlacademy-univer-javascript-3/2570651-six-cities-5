import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '@utils/mocks';

describe('Component: ReviewItem', () => {
  const fakeReview = makeFakeReview();

  it('should render review item correctly', () => {
    const { container } = render(<ReviewItem review={fakeReview} />);

    const avatar = screen.getByAltText('User avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', fakeReview.user.avatarUrl);

    const userName = screen.getByText(fakeReview.user.name);
    expect(userName).toBeInTheDocument();

    if (fakeReview.user.isPro) {
      expect(screen.getByText('Pro')).toBeInTheDocument();
    } else {
      expect(screen.queryByText('Pro')).not.toBeInTheDocument();
    }

    const reviewText = screen.getByText(fakeReview.comment);
    expect(reviewText).toBeInTheDocument();

    const ratingStars = container.querySelector('.reviews__stars');
    expect(ratingStars).toBeInTheDocument();

    const formattedDate = new Date(fakeReview.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
