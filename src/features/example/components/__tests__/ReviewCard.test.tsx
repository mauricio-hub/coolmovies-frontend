import { render, screen } from '@testing-library/react';
import ReviewCard from '../ReviewCard';

describe('ReviewCard', () => {
  it('renders review title and body', () => {
    render(
      <ReviewCard
        title="Great Movie!"
        body="I loved it"
        rating={5}
        userName="John"
        movieTitle="Star Wars"
      />
    );

    expect(screen.getByText('Great Movie!')).toBeInTheDocument();
    expect(screen.getByText('I loved it')).toBeInTheDocument();
  });

});