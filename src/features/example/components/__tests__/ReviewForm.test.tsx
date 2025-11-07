import { render, screen } from '@testing-library/react';
import ReviewForm from '../ReviewForm';

describe('ReviewForm', () => {
  it('renders the form title', () => {
    render(
      <ReviewForm 
        onSubmit={() => {}} 
        movies={[]} 
        loading={false}
      />
    );

    expect(screen.getByText('Add a Review')).toBeInTheDocument();
  });
});