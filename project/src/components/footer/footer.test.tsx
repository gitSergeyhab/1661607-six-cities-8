import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import Footer from './footer';


const history = createMemoryHistory();

const TextAlt = /6 cities logo/i;


describe('Component Footer', () => {

  it('should render with altText', () => {

    const { getByAltText} = render(
      <Router history={history}>
        <Footer/>
      </Router>,
    );

    const altText = getByAltText(TextAlt);
    expect(altText).toBeInTheDocument();
  });
});
