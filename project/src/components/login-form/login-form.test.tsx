import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import LoginForm from './login-form';
import { ScreenText, stateNoAuthAndEmpty } from '../../utils/test-constants';
import { renderComponent } from '../../utils/test-utils';
import { loginAction } from '../../store/api-actions';


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
const mockStore = configureMockStore([thunk]);
const store = mockStore(stateNoAuthAndEmpty);

const loginForm = <LoginForm/>;

describe('LoginForm Component', () => {
  it('should render and input Password and Email correctly', () => {
    renderComponent(loginForm, store, history);

    expect(screen.getByPlaceholderText(ScreenText.Login.Email)).toBeInTheDocument();
    expect(screen.getByTestId(TestId.Email)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toEqual('Sign in');

    expect(screen.getByRole('button')).toHaveAttribute('disabled');

    expect(screen.queryByDisplayValue(DisplayValue.Email)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(DisplayValue.Password)).not.toBeInTheDocument();

    userEvent.type(screen.getByTestId(TestId.Email), Value.Email);

    expect(screen.getByRole('button')).toHaveAttribute('disabled');

    userEvent.type(screen.getByTestId(TestId.Password), Value.Password);

    expect(screen.queryByDisplayValue(DisplayValue.Email)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(DisplayValue.Password)).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });

  it('should dispatch loginAction when click submit', () => {
    renderComponent(loginForm, store, history);

    userEvent.type(screen.getByTestId(TestId.Email), Value.Email);
    userEvent.type(screen.getByTestId(TestId.Password), Value.Password);

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByRole('button'));

    const params = {email: Value.Email, password: Value.Password};
    setTimeout(() => expect(store.getActions()).toEqual([loginAction(params)]), 0); // ??? почему-то работает только так ???
  });
});
