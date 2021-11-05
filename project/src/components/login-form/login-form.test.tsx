import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { ScreenText, stateNoAuthAndEmpty } from '../../utils/test-constants';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderComponent } from '../../utils/test-utils';
import LoginForm from './login-form';
import { AppRoute } from '../../constants';


const TestId = {
  Email: 'email',
  Password: 'password',
};

const Value = {
  Email: 'email@mail.com',
  Password: 'password123',
};

const DisplayValue = {
  Email: new RegExp(Value.Email, 'i'),
  Password: new RegExp(Value.Password, 'i'),
};

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(stateNoAuthAndEmpty);

describe('LoginForm Component', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Login);
    const loginForm = <LoginForm/>;
    renderComponent(loginForm, store, history);

    expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
    expect(screen.getByTestId(TestId.Email)).toBeInTheDocument();


    expect(screen.queryByDisplayValue(DisplayValue.Email)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(DisplayValue.Password)).not.toBeInTheDocument();

    userEvent.type(screen.getByTestId(TestId.Email), Value.Email);
    userEvent.type(screen.getByTestId(TestId.Password), Value.Password);

    expect(screen.queryByDisplayValue(DisplayValue.Email)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(DisplayValue.Password)).toBeInTheDocument();
  });
});
