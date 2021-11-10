import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';

import MainCard from './main-card';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderComponent, testCard } from '../../utils/test-utils';
import { ScreenText, stateAuthAndFilled } from '../../utils/test-constants';


const offer = makeFakeOffer();

const card =  <MainCard offer={offer} onMouseEnter={jest.fn()} onMouseLeave={jest.fn()}/>;

testCard(card, 'MainCard');

describe('MainCard Component', () => {

  const history = createMemoryHistory();
  const mockStore = configureMockStore();
  it('should call onMouseEnter and onMouseLeave', () => {

    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const mainCard = <MainCard offer={offer} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>;

    renderComponent(mainCard, mockStore(stateAuthAndFilled), history );

    expect(screen.getByText(ScreenText.Card.Night)).toBeInTheDocument();

    const cardElement = screen.getByRole('article');
    expect(cardElement).toBeInTheDocument();
    expect(onMouseEnter).not.toBeCalled();
    expect(onMouseLeave).not.toBeCalled();

    userEvent.hover(cardElement);

    expect(onMouseLeave).not.toBeCalled();
    expect(onMouseEnter).toBeCalledTimes(1);

    userEvent.unhover(cardElement);

    expect(onMouseLeave).toBeCalledTimes(1);
    expect(onMouseEnter).toBeCalledTimes(1);
  });
});

