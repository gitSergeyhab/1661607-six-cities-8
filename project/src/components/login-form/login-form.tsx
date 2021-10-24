import { FormEvent, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { loginAction } from '../../store/api-actions';
import { State, ThunkAppDispatch } from '../../types/types';
import { checkEmail, checkPassword, disableSignInSubmit } from '../../utils/util';


const mapStateToProps = ({authorizationStatus} : State) => ({authorizationStatus});
const mapDispatchToProps = (dispatch:  ThunkAppDispatch) =>bindActionCreators({onLogin: loginAction}, dispatch);
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;


function LoginForm({onLogin, authorizationStatus} : PropsFromRedux): JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const changeInputValue = (checkFunction: (fieldValue: string) => boolean, setFunction: (fieldValue: string) => void, errorMessage: string, field: string) =>
    (evt: FormEvent<HTMLInputElement>) => {
      const value = evt.currentTarget.value;
      const errorValue = (checkFunction(value) || value === '') ? '' : errorMessage;
      setError({...error, [field]: errorValue});
      setFunction(value);
    };

  const onEmailChange = changeInputValue(checkEmail, setEmail, 'Wrong Email', 'email');
  const onPasswordChange = changeInputValue(checkPassword, setPassword, 'Wrong Password', 'password');

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    onLogin({email, password});
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={onSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <div style={{color: 'red'}}>{error.email}</div>
        <input className="login__input form__input" type="email" name="email" placeholder="Email" required value={email} onChange={onEmailChange}/>
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <div style={{color: 'red'}}>{error.password}</div>
        <input className="login__input form__input" type="password" name="password" placeholder="Password" required value={password} onChange={onPasswordChange}/>
      </div>
      <button className="login__submit form__submit button" type="submit" disabled={disableSignInSubmit(email, password)}>Sign in</button>
    </form>
  );
}

export default connector(LoginForm);
