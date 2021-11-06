import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner', () => {
  it('render Loading', () => {
    render(<Spinner/>);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
